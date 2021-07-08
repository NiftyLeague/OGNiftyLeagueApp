import React from "react";
import { WalletConnectPrompt } from "components";

export default function Staking({ validAccount }) {
  return validAccount ? <div>Staking</div> : <WalletConnectPrompt />;
}
