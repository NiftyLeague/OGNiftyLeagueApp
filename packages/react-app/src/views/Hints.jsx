/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useContext } from "react";
import { NetworkContext } from "NetworkProvider";
import { Address, AddressInput } from "../components";

export default function Hints() {
  const { address, mainnetProvider } = useContext(NetworkContext);
  return (
    <div>
      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>👷</span>
        Edit your <b>contract</b> in
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          packages/hardhat/contracts/network
        </span>
      </div>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🛰</span>
        <b>compile/deploy</b> with
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn deploy
        </span>
      </div>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🚀</span>
        Your <b>contract artifacts</b> are automatically injected into your frontend at
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          packages/react-app/src/contracts/network
        </span>
      </div>

      <div style={{ margin: 32 }}>
        <span style={{ marginRight: 8 }}>🎛</span>
        Edit your <b>frontend</b> in
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          packages/reactapp/src/App.js
        </span>
      </div>

      <div style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>🔭</span>
        explore the
        <span
          className="highlight"
          style={{
            marginLeft: 4,
            marginRight: 4,

            padding: 4,
            borderRadius: 4,
            fontWeight: "bolder",
          }}
        >
          🖇 hooks
        </span>
        and
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          📦 components
        </span>
      </div>

      <div style={{ marginTop: 32 }}>
        for example, the
        <span className="highlight" style={{ margin: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          useBalance()
        </span>{" "}
        hook keeps track of your balance
      </div>

      <div style={{ marginTop: 32 }}>
        as you build your app you'll need web3 specific components like an
        <span className="highlight" style={{ margin: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          {"<AddressInput/>"}
        </span>
        component:
        <div style={{ width: 350, padding: 16, margin: "auto" }}>
          <AddressInput ensProvider={mainnetProvider} />
        </div>
        <div>(try putting in your address, an ens address, or scanning a QR code)</div>
      </div>

      <div style={{ marginTop: 32 }}>
        this balance could be multiplied by
        <span className="highlight" style={{ margin: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          price
        </span>{" "}
        that is loaded with the
        <span className="highlight" style={{ margin: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          usePrice
        </span>{" "}
        hook with the current value
      </div>

      <div style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>💧</span>
        use the <b>faucet</b> to send funds to
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          <Address address={address} minimized /> {address}
        </span>
      </div>

      <div style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>📡</span>
        deploy to a testnet or mainnet by editing
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          packages/hardhat/hardhat.config.js
        </span>
        and running
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn deploy
        </span>
      </div>

      <div style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>🔑</span>
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn generate
        </span>
        will create a deployer account in
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          packages/hardhat
        </span>
        <div className="highlight" style={{ marginTop: 8 }}>
          (use <span style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>yarn account</span> to
          display deployer address and balance)
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>⚙️</span>
        build your app with
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn build
        </span>
      </div>

      <div style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>🚢</span>
        ship it!
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn surge
        </span>
        or
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn s3
        </span>
        or
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn ipfs
        </span>
      </div>

      <div style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>💬</span>
        for support, join this
        <span className="highlight" style={{ marginLeft: 4, padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          <a target="_blank" rel="noopener noreferrer" href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA">
            Telegram Chat
          </a>
        </span>
      </div>
      <div style={{ padding: 128 }}>
        🛠 Check out your browser's developer console for more... (inpect -&gt; console) 🚀
      </div>
    </div>
  );
}
