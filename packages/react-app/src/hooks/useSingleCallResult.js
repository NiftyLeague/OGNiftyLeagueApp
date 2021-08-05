import { useState, useEffect } from 'react';
import { DEBUG } from '../constants';

export default function useSingleCallResult(contracts, contractName, functionName, args, formatter, skip) {
  const [value, setValue] = useState();

  useEffect(() => {
    const callContract = async contract => {
      try {
        let newValue;
        if (DEBUG) console.log('CALLING ', contractName, functionName, 'with args', args);
        if (args && args.length > 0) {
          newValue = await contract[functionName](...args);
          if (DEBUG)
            console.log('contractName', contractName, 'functionName', functionName, 'args', args, 'RESULT:', newValue);
        } else {
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
    if (contracts && contracts[contractName] && !skip) callContract(contracts[contractName]);
  }, [args, contractName, contracts, formatter, functionName, skip, value]);

  return value;
}
