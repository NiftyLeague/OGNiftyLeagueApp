/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import { BigNumber, utils } from 'ethers';
import { Row, Col, Input, Divider, Button } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import Blockies from 'react-blockies';
import Notifier from 'helpers/Notifier';
import Tooltip from 'components/Tooltip';
import { Provider, Network } from 'types/web3';
import tryToDisplay from './utils';

interface FunctionFormProps {
  contractFunction: (...values: any) => Promise<any>;
  functionInfo: {
    inputs: { baseType: string; type: string; name: string }[];
    name: string;
    payable: boolean;
    type: string;
    stateMutability: string;
  };
  provider: Provider;
  targetNetwork: Network;
  triggerRefresh: (boolean) => void;
}

export default function FunctionForm({
  contractFunction,
  functionInfo,
  provider,
  targetNetwork,
  triggerRefresh,
}: FunctionFormProps): JSX.Element {
  const [form, setForm] = useState<{ [key: string]: utils.BytesLike | BigNumber }>({});
  const [txValue, setTxValue] = useState<string>('0.00');
  const [returnValue, setReturnValue] = useState<string>();
  const { currentTheme } = useThemeSwitcher();

  const tx = Notifier(provider, targetNetwork, currentTheme === 'dark');

  let inputIndex = 0;
  let inputs: JSX.Element[] = [];
  inputs = functionInfo.inputs.map(input => {
    const key = `${functionInfo.name}_${input.name}_${input.type}_${inputIndex++}`;

    let buttons: JSX.Element | null = null;
    if (input.type === 'bytes32') {
      buttons = (
        <Tooltip text="to bytes32">
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (utils.isHexString(form[key])) {
                setForm(prevState => ({ ...prevState, [key]: utils.parseBytes32String(form[key] as string) }));
              } else {
                setForm(prevState => ({ ...prevState, [key]: utils.formatBytes32String(form[key] as string) }));
              }
            }}
          >
            #️⃣
          </div>
        </Tooltip>
      );
    } else if (input.type === 'bytes') {
      buttons = (
        <Tooltip text="to hex">
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (utils.isHexString(form[key])) {
                const formUpdate = { ...form };
                setForm(prevState => ({ ...prevState, [key]: utils.toUtf8String(form[key] as utils.BytesLike) }));
              } else {
                setForm(prevState => ({ ...prevState, [key]: utils.hexlify(utils.toUtf8Bytes(form[key] as string)) }));
              }
            }}
          >
            #️⃣
          </div>
        </Tooltip>
      );
    } else if (input.type === 'uint256') {
      buttons = (
        <Tooltip text="* 10 ** 18">
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setForm(prevState => ({ ...prevState, [key]: utils.parseEther(form[key] as string) }));
            }}
          >
            ✴️
          </div>
        </Tooltip>
      );
    } else if (input.type === 'address') {
      const value = form[key] as string;
      const possibleAddress = value && value.toLowerCase && value.toLowerCase().trim();
      if (possibleAddress && possibleAddress.length === 42) {
        buttons = (
          <Tooltip text="blockie">
            <Blockies seed={possibleAddress} scale={3} />
          </Tooltip>
        );
      }
    }

    return (
      <div style={{ margin: 2 }} key={key}>
        <Input
          size="large"
          placeholder={input.name ? `${input.type} ${input.name}` : input.type}
          autoComplete="off"
          value={form[key] as string}
          name={key}
          onChange={event => {
            const formUpdate = { ...form };
            formUpdate[event.target.name] = event.target.value;
            setForm(formUpdate);
          }}
          suffix={buttons}
        />
      </div>
    );
  });

  const txValueInput = (
    <div style={{ margin: 2 }} key="txValueInput">
      <Input
        placeholder="transaction value"
        onChange={e => setTxValue(e.target.value)}
        value={txValue}
        addonAfter={
          <div>
            <Row>
              <Col span={16}>
                <Tooltip text=" * 10^18 ">
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      const value = utils.parseEther(txValue).toString();
                      if (value) setTxValue(value);
                    }}
                  >
                    ✳️
                  </div>
                </Tooltip>
              </Col>
              <Col span={16}>
                <Tooltip text="number to hex">
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setTxValue(BigNumber.from(txValue).toHexString());
                    }}
                  >
                    #️⃣
                  </div>
                </Tooltip>
              </Col>
            </Row>
          </div>
        }
      />
    </div>
  );

  if (functionInfo.payable) inputs.push(txValueInput);

  const buttonIcon =
    functionInfo.type === 'call' ? (
      <Button style={{ marginLeft: -32 }}>Read📡</Button>
    ) : (
      <Button style={{ marginLeft: -32 }}>Send💸</Button>
    );

  inputs.push(
    <div style={{ cursor: 'pointer', margin: 2 }} key="goButton">
      <Input
        onChange={e => setReturnValue(e.target.value)}
        defaultValue=""
        bordered={false}
        disabled
        value={returnValue}
        suffix={
          <div
            style={{ width: 50, height: 30, margin: 0 }}
            onClick={async () => {
              let innerIndex = 0;
              const args: (number | string)[] = functionInfo.inputs.map(input => {
                const key = `${functionInfo.name}_${input.name}_${input.type}_${innerIndex++}`;
                let value: string | number = form[key] as string;
                if (input.baseType === 'array') {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  value = JSON.parse(value);
                } else if (input.type === 'bool') {
                  if (value === 'true' || value === '1' || value === '0x1' || value === '0x01' || value === '0x0001') {
                    value = 1;
                  } else {
                    value = 0;
                  }
                }
                return value;
              });

              let result;
              if (functionInfo.stateMutability === 'view' || functionInfo.stateMutability === 'pure') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const returned = await contractFunction(...args);
                result = tryToDisplay(returned);
              } else {
                const overrides: { [key: string]: number | string } = {};
                if (txValue) {
                  overrides.value = txValue; // ethers.utils.parseEther()
                }
                const returned = (await tx(contractFunction(...args, overrides))) as unknown;
                result = tryToDisplay(returned as BigNumber | string);
              }

              console.log('SETTING RESULT:', result);
              setReturnValue(result);
              triggerRefresh(true);
            }}
          >
            {buttonIcon}
          </div>
        }
      />
    </div>,
  );

  return (
    <div>
      <Row>
        <Col
          span={8}
          style={{
            textAlign: 'right',
            opacity: 0.333,
            paddingRight: 6,
            fontSize: 24,
          }}
        >
          {functionInfo.name}
        </Col>
        <Col span={16}>{inputs}</Col>
      </Row>
      <Divider />
    </div>
  );
}
