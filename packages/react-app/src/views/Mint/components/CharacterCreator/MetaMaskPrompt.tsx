import React from 'react';
import { Alert } from 'antd';

const MetaMaskPrompt = ({ open }: { open: boolean }): JSX.Element | null => {
  return open ? (
    <div
      style={{
        zIndex: 2,
        position: 'absolute',
        right: 0,
        top: 60,
        padding: 16,
      }}
    >
      <Alert closable message="Please check MetaMask for your transaction" showIcon type="success" />
    </div>
  ) : null;
};

export default MetaMaskPrompt;
