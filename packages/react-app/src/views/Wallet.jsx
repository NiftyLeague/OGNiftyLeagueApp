import React from "react";
import { WalletConnectPrompt } from "components";

export default function Wallet({ validAccount }) {
  return validAccount ? <div>Wallet</div> : <WalletConnectPrompt />;
}
