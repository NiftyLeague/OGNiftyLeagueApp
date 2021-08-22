import { useState, useEffect } from 'react';
import { Contracts } from 'types/web3';
import { DEBUG } from '../constants';

export default function useSingleCallResult(
  contracts: Contracts,
  contractName: string,
  functionName: string,
  args: unknown[],
  formatter: (unknown) => void,
  skip: boolean,
): unknown {
  const [value, setValue] = useState<unknown>();

  useEffect(() => {
    const callContract = async contract => {
      try {
        let newValue: unknown;
        if (DEBUG) console.log('CALLING ', contractName, functionName, 'with args', args);
        if (args && args.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          newValue = await contract[functionName](...args);
          if (DEBUG)
            console.log('contractName', contractName, 'functionName', functionName, 'args', args, 'RESULT:', newValue);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          newValue = await contract[functionName]();
        }
        if (formatter && typeof formatter === 'function') {
          newValue = formatter(newValue);
        }
        setValue(newValue);
      } catch (e) {
        console.log(e);
      }
    };
    if (contracts && contracts[contractName] && !skip) void callContract(contracts[contractName]);
  }, [args, contractName, contracts, formatter, functionName, skip, value]);

  return value;
}
