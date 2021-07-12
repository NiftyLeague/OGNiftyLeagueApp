import { useCallback, useState } from "react";
import { formatEther } from "@ethersproject/units";
import usePoller from "./Poller";

/*
  ~ What it does? ~

  Gets your balance in ETH from given address and provider

  ~ How can I use? ~

  const yourLocalBalance = useBalance(localProvider, address);

  ~ Features ~

  - Provide address and get balance corresponding to given address
  - Change provider to access balance on different chains (ex. mainnetProvider)
*/

export default function useBalance(provider, address, pollTime = 0) {
  const [balance, setBalance] = useState("0.0");
  const pollBalance = useCallback(async () => {
    if (address && provider) {
      const newBalanceBN = await provider.getBalance(address);
      const newBalance = formatEther(newBalanceBN);
      if (newBalance !== balance) setBalance(newBalance);
    }
  }, [address, provider, balance]);
  usePoller(pollBalance, pollTime || 27777, [address && provider]);

  return balance;
}
