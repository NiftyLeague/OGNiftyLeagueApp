import React from 'react';
import { Alert } from 'antd';

const SaleLocked = ({ totalSupply, saleLocked }: { totalSupply: number; saleLocked: boolean }): JSX.Element | null => {
  return saleLocked ? (
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
        message={totalSupply < 3 ? '⚠️ The sale has not started yet' : '✅ ALL DEGENS HAVE SOLD OUT!'}
        description={
          totalSupply < 3 ? (
            <div>We will officially launch as soon as the 3rd NFT is minted!</div>
          ) : (
            <div>Thank you all for the support!</div>
          )
        }
        type="warning"
        closable
      />
    </div>
  ) : null;
};

export default SaleLocked;
