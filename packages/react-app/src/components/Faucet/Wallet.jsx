import React, { useState } from 'react';
import { WalletOutlined, QrcodeOutlined, SendOutlined, KeyOutlined } from '@ant-design/icons';
import { Tooltip, Spin, Modal, Button, Typography } from 'antd';
import QR from 'qrcode.react';
import { useUserAddress } from 'eth-hooks';
import { ethers, utils } from 'ethers';
import Address from '../Address';
import Balance from '../Balance';
import AddressInput from '../AddressInput';
import EtherInput from './EtherInput';

const { Text, Paragraph } = Typography;

/*
  ~ What it does? ~

  Displays a wallet where you can specify address and send USD/ETH, with options to
  scan address, to convert between USD and ETH, to see and generate private keys,
  to send, receive and extract the burner wallet

  ~ How can I use? ~

  <Wallet
    provider={userProvider}
    address={address}
    ensProvider={mainnetProvider}
    price={price}
    color='red'
  />

  ~ Features ~

  - Provide provider={userProvider} to display a wallet
  - Provide address={address} if you want to specify address, otherwise
                                                    your default address will be used
  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth") or you can enter directly ENS name instead of address
  - Provide price={price} of ether and easily convert between USD and ETH
  - Provide color to specify the color of wallet icon
*/

export default function Wallet({ address, color, ensProvider, price, provider, tx }) {
  const signerAddress = useUserAddress(provider);
  const selectedAddress = address || signerAddress;

  const [open, setOpen] = useState();
  const [qr, setQr] = useState();
  const [amount, setAmount] = useState();
  const [toAddress, setToAddress] = useState();
  const [pk, setPK] = useState();

  const providerSend = provider ? (
    <Tooltip title="Wallet">
      <WalletOutlined
        onClick={() => {
          setOpen(!open);
        }}
        rotate={-90}
        style={{
          padding: 7,
          color: color || '',
          cursor: 'pointer',
          fontSize: 28,
          verticalAlign: 'middle',
        }}
      />
    </Tooltip>
  ) : (
    ''
  );

  let display;
  let receiveButton;
  let privateKeyButton;
  if (qr) {
    display = (
      <div>
        <div>
          <Text copyable>{selectedAddress}</Text>
        </div>
        <QR
          value={selectedAddress}
          size="450"
          level="H"
          includeMargin
          renderAs="svg"
          imageSettings={{ excavate: false }}
        />
      </div>
    );
    receiveButton = (
      <Button
        key="hide"
        onClick={() => {
          setQr('');
        }}
      >
        <QrcodeOutlined /> Hide
      </Button>
    );
    privateKeyButton = (
      <Button
        key="hide"
        onClick={() => {
          setPK(selectedAddress);
          setQr('');
        }}
      >
        <KeyOutlined /> Private Key
      </Button>
    );
  } else if (pk) {
    const wallet = new ethers.Wallet(pk);

    if (wallet.address !== selectedAddress) {
      display = (
        <div>
          <b>*injected account*, private key unknown</b>
        </div>
      );
    } else {
      const extraPkDisplayAdded = {};
      const extraPkDisplay = [];
      extraPkDisplayAdded[wallet.address] = true;
      extraPkDisplay.push(
        <div style={{ fontSize: 16, padding: 2, backgroundStyle: '#89e789' }}>
          <a href={'/pk#' + pk}>
            <Address minimized address={wallet.address} ensProvider={ensProvider} /> {wallet.address.substr(0, 6)}
          </a>
        </div>,
      );
      // eslint-disable-next-line no-restricted-syntax
      for (const key in localStorage) {
        if (key.indexOf('metaPrivateKey_backup') >= 0) {
          const pastpk = localStorage.getItem(key);
          const pastwallet = new ethers.Wallet(pastpk);
          if (!extraPkDisplayAdded[pastwallet.address] /* && selectedAddress!=pastwallet.address */) {
            extraPkDisplayAdded[pastwallet.address] = true;
            extraPkDisplay.push(
              <div style={{ fontSize: 16 }}>
                <a href={'/pk#' + pastpk}>
                  <Address minimized address={pastwallet.address} ensProvider={ensProvider} />{' '}
                  {pastwallet.address.substr(0, 6)}
                </a>
              </div>,
            );
          }
        }
      }

      display = (
        <div>
          <b>Private Key:</b>

          <div>
            <Text copyable>{pk}</Text>
          </div>

          <hr />

          <i>
            Point your camera phone at qr code to open in
            <a target="_blank" href={'https://xdai.io/' + pk} rel="noopener noreferrer">
              burner wallet
            </a>
            :
          </i>
          <QR
            value={'https://xdai.io/' + pk}
            size="450"
            level="H"
            includeMargin
            renderAs="svg"
            imageSettings={{ excavate: false }}
          />

          <Paragraph style={{ fontSize: '16' }} copyable>
            {'https://xdai.io/' + pk}
          </Paragraph>

          {extraPkDisplay ? (
            <div>
              <h3>Known Private Keys:</h3>
              {extraPkDisplay}
              <Button
                onClick={() => {
                  const currentPrivateKey = window.localStorage.getItem('metaPrivateKey');
                  if (currentPrivateKey) {
                    window.localStorage.setItem('metaPrivateKey_backup' + Date.now(), currentPrivateKey);
                  }
                  const randomWallet = ethers.Wallet.createRandom();
                  const { privateKey } = randomWallet._signingKey();
                  window.localStorage.setItem('metaPrivateKey', privateKey);
                  window.location.reload();
                }}
              >
                Generate
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
      );
    }

    receiveButton = (
      <Button
        key="receive"
        onClick={() => {
          setQr(selectedAddress);
          setPK('');
        }}
      >
        <QrcodeOutlined /> Receive
      </Button>
    );
    privateKeyButton = (
      <Button
        key="hide"
        onClick={() => {
          setPK('');
          setQr('');
        }}
      >
        <KeyOutlined /> Hide
      </Button>
    );
  } else {
    const inputStyle = {
      padding: 10,
    };

    display = (
      <div>
        <div style={inputStyle}>
          <AddressInput
            autoFocus
            ensProvider={ensProvider}
            placeholder="to address"
            address={toAddress}
            onChange={setToAddress}
          />
        </div>
        <div style={inputStyle}>
          <EtherInput
            price={price}
            value={amount}
            onChange={value => {
              setAmount(value);
            }}
          />
        </div>
      </div>
    );
    receiveButton = (
      <Button
        key="receive"
        onClick={() => {
          setQr(selectedAddress);
          setPK('');
        }}
      >
        <QrcodeOutlined /> Receive
      </Button>
    );
    privateKeyButton = (
      <Button
        key="hide"
        style={{ fontSize: 16 }}
        onClick={() => {
          setPK(localStorage.getItem('metaPrivateKey'));
          setQr('');
        }}
      >
        <KeyOutlined /> Private Key
      </Button>
    );
  }

  return (
    <span>
      {providerSend}
      <Modal
        visible={open}
        title={
          <div>
            {selectedAddress ? <Address address={selectedAddress} ensProvider={ensProvider} /> : <Spin />}
            <div style={{ float: 'right', paddingRight: 25 }}>
              <Balance address={selectedAddress} provider={provider} dollarMultiplier={price} />
            </div>
          </div>
        }
        onOk={() => {
          setQr();
          setPK();
          setOpen(!open);
        }}
        onCancel={() => {
          setQr();
          setPK();
          setOpen(!open);
        }}
        footer={[
          privateKeyButton,
          receiveButton,
          <Button
            key="submit"
            type="primary"
            disabled={!amount || !toAddress || qr}
            loading={false}
            onClick={() => {
              let value;
              try {
                value = utils.parseEther('' + amount);
              } catch (e) {
                // failed to parseEther, try something else
                value = utils.parseEther('' + parseFloat(amount).toFixed(8));
              }
              tx({ to: toAddress, value });
              setOpen(!open);
              setQr();
            }}
          >
            <SendOutlined /> Send
          </Button>,
        ]}
      >
        {display}
      </Modal>
    </span>
  );
}
