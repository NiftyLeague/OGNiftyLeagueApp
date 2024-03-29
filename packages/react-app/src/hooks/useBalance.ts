import { useCallback, useState } from 'react';
import { utils } from 'ethers';
import { Provider } from 'types/web3';
import useAsyncInterval from './useAsyncInterval';
import useNetworkInfo from './useNetworkInfo';
import { BALANCE_INTERVAL } from '../constants';

/*
  ~ What it does? ~

  Gets your balance in ETH from given address and provider

  ~ How can I use? ~

  const yourLocalBalance = useBalance(localProvider, address);

  ~ Features ~

  - Provide address and get balance corresponding to given address
  - Change provider to access balance on different chains (ex. mainnetProvider)
*/

export default function useBalance(provider: Provider, address: string, pollTime = BALANCE_INTERVAL): string {
  const { name } = useNetworkInfo(provider);
  const [balance, setBalance] = useState('0.00');
  const getBalance = useCallback(async () => {
    if (provider && address) {
      try {
        const newBalanceBN = await provider.getBalance(address);
        const newBalance = utils.formatEther(newBalanceBN);
        if (newBalance !== balance) setBalance(newBalance);
      } catch (e) {
        console.log(e);
      }
    }
  }, [address, provider, balance]);
  const manualUpdate = `${name}-${address}`;
  useAsyncInterval(getBalance, pollTime, false, manualUpdate);
  return balance;
}
