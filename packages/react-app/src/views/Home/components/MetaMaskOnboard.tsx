import React, { useEffect, useRef } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { Alert } from 'antd';

const MetaMaskOnboard = ({ open }: { open: boolean }): JSX.Element | null => {
  const onboarding = useRef<MetaMaskOnboarding>();
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);
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
      <Alert
        closable
        closeText="Install MetaMask"
        message="No Web3 Wallet Detected"
        showIcon
        type="warning"
        afterClose={() => {
          if (onboarding.current) {
            console.log('try onboarding');
            onboarding.current.startOnboarding();
          }
        }}
      />
    </div>
  ) : null;
};

export default MetaMaskOnboard;
