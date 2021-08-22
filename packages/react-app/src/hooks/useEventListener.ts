import { useState, useEffect } from 'react';
import { Contracts, Provider } from 'types/web3';
import { providers } from 'ethers';

/*
  ~ What it does? ~

  Enables you to keep track of events 

  ~ How can I use? ~

  const setPurposeEvents = useEventListener(readContracts, "YourContract", "SetPurpose", localProvider, 1);

  ~ Features ~

  - Provide readContracts by loading contracts (see more on ContractLoader.js)
  - Specify the name of the contract, in this case it is "YourContract"
  - Specify the name of the event in the contract, in this case we keep track of "SetPurpose" event
  - Specify the provider 
*/

export default function useEventListener(
  contracts: Contracts,
  contractName: string,
  eventName: string,
  provider: Provider,
  startBlock: number,
): unknown[] {
  const [updates, setUpdates] = useState([]);

  // @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (typeof provider !== 'undefined' && typeof startBlock !== 'undefined' && 'resetEventsBlock' in provider) {
      // if you want to read _all_ events from your contracts, set this to the block number it is deployed
      provider.resetEventsBlock(startBlock);
    }
    if (contracts && contractName && contracts[contractName]) {
      try {
        const listener: providers.Listener = (...args) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { blockNumber } = args[args.length - 1];
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(messages: never[]) => any[]' is... Remove this comment to see the full error message
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return,  @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          setUpdates(messages => [{ blockNumber, ...args.pop().args }, ...messages]);
        };
        contracts[contractName].on(eventName, listener);
        return () => {
          contracts[contractName].removeListener(eventName, listener);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [provider, startBlock, contracts, contractName, eventName]);

  return updates;
}
