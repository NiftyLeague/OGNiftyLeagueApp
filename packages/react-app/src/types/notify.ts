import { providers, utils } from 'ethers';
import { TransactionData } from 'bnc-notify';
import { SDKError } from 'bnc-sdk/dist/types/src/interfaces';
import { EthereumRpcError, EthereumProviderError } from 'eth-rpc-errors';

type Transaction = Promise<providers.TransactionResponse> | utils.Deferrable<providers.TransactionRequest>;

type NotifyTransactionResult = TransactionData | providers.TransactionReceipt;

export type NotifyCallback = (res: NotifyTransactionResult) => void;

export type Tx = (tx: Transaction, callback?: NotifyCallback) => Promise<providers.TransactionResponse | null>;

export type MetamaskError = EthereumRpcError<any> | EthereumProviderError<any>;

export type NotifyError = SDKError | MetamaskError | Error | ErrorEvent;
