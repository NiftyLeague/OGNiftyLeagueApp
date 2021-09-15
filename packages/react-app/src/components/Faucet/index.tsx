import React, { useCallback, useContext, useState } from 'react';
import { Input, Button } from 'antd';
import Blockies from 'react-blockies';
import { SendOutlined } from '@ant-design/icons';
import { utils } from 'ethers';
import { NetworkContext } from 'NetworkProvider';
import Tooltip from 'components/Tooltip';
import Notifier from 'helpers/Notifier';

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

  - Provide localProvider={localProvider} to be able to send ETH to given address
  - Provide placeholder="Send local faucet" value for the input
*/

export default function Faucet(): JSX.Element {
  const { localProvider, targetNetwork } = useContext(NetworkContext);
  const tx = Notifier(localProvider, targetNetwork);
  const [address, setAddress] = useState('');

  let blockie: JSX.Element;
  if (address && typeof address.toLowerCase === 'function') {
    blockie = <Blockies seed={address.toLowerCase()} size={8} scale={4} />;
  } else {
    blockie = <div />;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 65,
        right: 0,
        padding: 10,
      }}
    >
      <Input
        size="large"
        key={address}
        placeholder="local faucet"
        prefix={blockie}
        value={address}
        onChange={e => setAddress(e.target.value)}
        suffix={
          <Tooltip text="Faucet: Send local ether to an address.">
            <>
              <Button
                onClick={async () => {
                  await tx({ to: address, value: utils.parseEther('5.00') });
                  setAddress('');
                }}
                shape="circle"
                icon={<SendOutlined />}
              />
            </>
          </Tooltip>
        }
      />
    </div>
  );
}
