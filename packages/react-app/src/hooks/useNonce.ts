import { useState } from 'react';
import { Provider } from 'types/web3';

export default function useNonce(provider: Provider, address: string): number {
  const [nonce, setNonce] = useState(0);

  const Nonce = () => {
    async function getNonce() {
      setNonce(await provider.getTransactionCount(address));
    }
    if (address) void getNonce();
  };
  Nonce();
  return nonce;
}
