import React, { useContext } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { WalletConnectPrompt } from 'components';

export default function Staking() {
  const { validAccount } = useContext(NetworkContext);
  return validAccount ? <div>Staking</div> : <WalletConnectPrompt />;
}
