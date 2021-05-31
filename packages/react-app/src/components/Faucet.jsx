import React, { useState, useCallback } from "react";
import { Input, Button, Tooltip } from "antd";
import Blockies from "react-blockies";
import { SendOutlined } from "@ant-design/icons";
import { parseEther } from "@ethersproject/units";
import { useLookupAddress } from "eth-hooks";
import { Notifier } from "../helpers";
import Wallet from "./Wallet";

// improved a bit by converting address to ens if it exists
// added option to directly input ens name
// added placeholder option

/*
  ~ What it does? ~

  Displays a local faucet to send ETH to given address, also wallet is provided

  ~ How can I use? ~

  <Faucet 
    price={price}
    localProvider={localProvider}  
    ensProvider={mainnetProvider}
    placeholder={"Send local faucet"}
  />

  ~ Features ~

  - Provide price={price} of ether and convert between USD and ETH in a wallet
  - Provide localProvider={localProvider} to be able to send ETH to given address
  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth") or you can enter directly ENS name instead of address
              works both in input field & wallet
  - Provide placeholder="Send local faucet" value for the input
*/

export default function Faucet({ ensProvider, localProvider, placeholder, price }) {
  const [address, setAddress] = useState();

  let blockie;
  if (address && typeof address.toLowerCase === "function") {
    blockie = <Blockies seed={address.toLowerCase()} size={8} scale={4} />;
  } else {
    blockie = <div />;
  }

  const ens = useLookupAddress(ensProvider, address);

  const updateAddress = useCallback(
    async newValue => {
      if (typeof newValue !== "undefined") {
        let thisAddress = newValue;
        if (thisAddress.indexOf(".eth") > 0 || thisAddress.indexOf(".xyz") > 0) {
          try {
            const possibleAddress = await ensProvider.resolveName(thisAddress);
            if (possibleAddress) {
              thisAddress = possibleAddress;
            }
            // eslint-disable-next-line no-empty
          } catch (e) {}
        }
        setAddress(thisAddress);
      }
    },
    [ensProvider],
  );

  const tx = Notifier(localProvider);

  return (
    <span>
      <Input
        size="large"
        placeholder={placeholder || "local faucet"}
        prefix={blockie}
        // value={address}
        value={ens || address}
        onChange={e => updateAddress(e.target.value)}
        suffix={
          <Tooltip title="Faucet: Send local ether to an address.">
            <Button
              onClick={() => {
                tx({
                  to: address,
                  value: parseEther("0.01"),
                });
                setAddress("");
              }}
              shape="circle"
              icon={<SendOutlined />}
            />
            <Wallet color="#888888" provider={localProvider} ensProvider={ensProvider} price={price} />
          </Tooltip>
        }
      />
    </span>
  );
}
