import { useCallback, useState } from 'react';
import { utils } from 'ethers';
import usePoller from './usePoller';
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

export default function useBalance(provider, address, pollTime = BALANCE_INTERVAL) {
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
  usePoller(getBalance, pollTime);

  return balance;
}
