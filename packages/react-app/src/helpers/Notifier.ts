import { useCallback } from 'react';
import { notification } from 'antd';
import axios, { AxiosResponse } from 'axios';
import Notify, { API, InitOptions } from 'bnc-notify';
import { BigNumber, Contract, ContractFunction, Signer, utils, providers } from 'ethers';
// import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/dynamic';
import { serializeError } from 'eth-rpc-errors';
import { GasStationResponse, Network, Provider } from 'types/web3';
import { NotifyCallback, NotifyError, Tx } from 'types/notify';
import { calculateGasMargin, getProviderAndSigner } from 'helpers';
import { BLOCKNATIVE_DAPPID, DEBUG, VALID_NOTIFY_NETWORKS } from '../constants';

// Wrapper around BlockNative's wonderful Notify.js
// https://docs.blocknative.com/notify

const callbacks: { [hash: string]: NotifyCallback } = {};

const loadGasPrice = async (targetNetwork: Network, speed = 'fast'): Promise<BigNumber> => {
  let gasPrice = utils.parseUnits('20', 'gwei');
  if (targetNetwork.gasPrice) {
    gasPrice = targetNetwork.gasPrice;
  } else if (navigator.onLine) {
    await axios
      .get('https://ethgasstation.info/json/ethgasAPI.json')
      .then((response: AxiosResponse<GasStationResponse>) => {
        gasPrice = BigNumber.from(response.data[speed] * 100000000);
      })
      .catch(error => console.log(error));
  }
  return gasPrice;
};

const handleError = (e: NotifyError): void => {
  if (DEBUG) console.log('Transaction Error', e);
  // Accounts for Metamask and default signer on all networks
  let message: string;
  if (e.message) {
    message = e.message;
  } else {
    const serialized = serializeError(e);
    message = serialized.message;
  }

  notification.error({
    message: 'Transaction Error',
    description: message,
  });
};

export const submitTxWithGasEstimate = (
  tx: Tx,
  contract: Contract,
  fn: string,
  args: unknown[],
  config = {},
  extraGasNeeded = false,
): Promise<BigNumber | any> => {
  return contract.estimateGas[fn](...args, config)
    .then(async estimatedGasLimit => {
      if (DEBUG) console.log('estimatedGasLimit:', estimatedGasLimit);
      await tx(
        (contract[fn] as ContractFunction)(...args, {
          ...config,
          gasLimit: calculateGasMargin(estimatedGasLimit, extraGasNeeded),
        }),
      );
    })
    .catch(error => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      handleError(error.error ?? error);
    });
};

export default function Notifier(providerOrSigner: Provider | Signer, targetNetwork: Network, darkMode = false): Tx {
  return useCallback(
    async (tx, callback) => {
      if (typeof providerOrSigner !== 'undefined') {
        const { signer, provider } = getProviderAndSigner(providerOrSigner);
        // auto select mainnet in case anything goes wrong finding provider
        let network: providers.Network = { chainId: 1, name: 'mainnet' };
        if (provider) network = await provider.getNetwork();

        let options: InitOptions = {};
        let notify: API | null = null;
        if (navigator.onLine) {
          options = {
            dappId: BLOCKNATIVE_DAPPID, // GET YOUR OWN KEY AT https://account.blocknative.com
            system: 'ethereum',
            networkId: network.chainId,
            darkMode,
            transactionHandler: txInformation => {
              if (DEBUG)
                console.log(`HANDLE TX ${txInformation.transaction.status?.toUpperCase() as string}`, txInformation);
              const possibleFunction = txInformation.transaction.hash && callbacks[txInformation.transaction.hash];
              if (typeof possibleFunction === 'function') possibleFunction(txInformation.transaction);
            },
            onerror: e => {
              handleError(e);
            },
          };
          notify = Notify(options);
        }

        let etherscanNetwork = '';
        if (network.name && network.chainId > 1) etherscanNetwork = `${network.name}.`;
        const etherscanTxUrl = `https://${etherscanNetwork}etherscan.io/tx/`;

        try {
          let result: providers.TransactionResponse;
          if (tx instanceof Promise) {
            if (DEBUG) console.log('AWAITING TX', tx);
            result = await tx;
          } else {
            const safeTx = { ...tx };
            if (!tx.gasPrice) safeTx.gasPrice = await loadGasPrice(targetNetwork);
            if (!tx.gasLimit) safeTx.gasLimit = utils.hexlify(120000);
            if (DEBUG) console.log('RUNNING TX', safeTx);
            result = await (signer as Signer).sendTransaction(safeTx);
          }
          if (DEBUG) console.log('RESULT:', result);
          if (callback) callbacks[result.hash] = callback;

          // if it is a valid Notify.js network, use that, if not, just send a default notification
          if (notify && VALID_NOTIFY_NETWORKS.includes(network.chainId)) {
            const { emitter } = notify.hash(result.hash);
            emitter.on('all', transaction => {
              return {
                onclick: () => transaction.hash && window.open(etherscanTxUrl + transaction.hash),
              };
            });
          } else {
            const networkName = network.name === 'unknown' ? targetNetwork.label : network.name;
            notification.info({
              message: `${networkName} Transaction Sent`,
              description: result.hash,
              placement: 'topRight',
            });
            await result.wait();
            notification.success({
              message: `${networkName} Transaction Successful`,
              description: result.hash,
              placement: 'topRight',
            });
            // on most networks BlockNative will update a transaction handler,
            // but locally we will set an interval to listen...
            if (callback) {
              // const txResult = await tx;
              // res = result || txResult?
              // const listeningInterval = setIntervalAsync(async () => {
              //   console.log('CHECK IN ON THE TX', result, provider);
              //   const currentTransactionReceipt = await (provider as Provider).getTransactionReceipt(result.hash);
              //   if (currentTransactionReceipt && currentTransactionReceipt.confirmations) {
              //     callback({ ...result, ...currentTransactionReceipt });
              //     void (async () => {
              //       await clearIntervalAsync(listeningInterval);
              //     })();
              //   }
              // }, 1000);
              const currentTransactionReceipt = await (provider as Provider).getTransactionReceipt(result.hash);
              callback(currentTransactionReceipt);
            }
          }

          if (typeof result.wait === 'function') await result.wait();

          return result;
        } catch (e) {
          handleError(e as NotifyError);
          return null;
        }
      } else {
        return null;
      }
    },
    [providerOrSigner, targetNetwork, darkMode],
  );
}
