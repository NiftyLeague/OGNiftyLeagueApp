import { useCallback, useState, useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import useAsyncInterval from './useAsyncInterval';
import { DEBUG, READ_CONTRACT_DEFAULT_INTERVAL } from '../constants';

/*
  Enables you to read values from contracts and keep track of them in the local React states

  ~ How can I use? ~

  const purpose = useContractReader(readContracts,"YourContract", "purpose")

  ~ Features ~

  - Provide readContracts by loading contracts from useContractLoader
  - Specify the name of the target contract
  - Specify the name of the function name to call from the contract
  - Pass in any args necessary
  - Set a custom poll time or default to READ_CONTRACT_DEFAULT_INTERVAL if null
  - Provide a formatter to format the result
  - Provide a refreshKey if you wish to manually trigger a refetch
*/

export default function useContractReader(
  contracts,
  contractName,
  functionName,
  args,
  pollTime,
  formatter,
  refreshKey,
) {
  const [value, setValue] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const argsMemoized = useMemo(() => args, [JSON.stringify(args)]);

  const readContract = useCallback(async () => {
    if (contracts && contracts[contractName]) {
      try {
        let newValue;
        if (DEBUG) console.log('CALLING ', contractName, functionName, 'with args', args);
        if (args && args.length > 0) {
          newValue = await contracts[contractName][functionName](...args);
          if (DEBUG)
            console.log('contractName', contractName, 'functionName', functionName, 'args', args, 'RESULT:', newValue);
        } else {
          newValue = await contracts[contractName][functionName]();
        }
        if (formatter && typeof formatter === 'function') newValue = formatter(newValue);
        if (!isEqual(newValue, value)) setValue(newValue);
      } catch (e) {
        console.log('Read Contract Error:', e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contracts, contractName, functionName, formatter, value, argsMemoized, refreshKey]);

  useAsyncInterval(readContract, pollTime || READ_CONTRACT_DEFAULT_INTERVAL, true, argsMemoized);

  return value;
}
