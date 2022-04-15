/* eslint-disable import/prefer-default-export */
import React, { useContext, useState } from 'react';

import { NetworkContext } from 'NetworkProvider';
import { getProviderAndSigner } from 'helpers';

export const useSign = (
  nonce: string | null,
  token: string | null,
): [boolean, boolean, () => Promise<string | null>] => {
  const { address, userProvider } = useContext(NetworkContext);
  const [msgSent, setMsgSent] = useState(false);
  const [error, setError] = useState(false);

  const signMsg = async (): Promise<string | null> => {
    if (address && userProvider && nonce && token) {
      const { signer } = getProviderAndSigner(userProvider);
      if (signer) {
        const addressToLower = address.toLowerCase();
        const signAddress = `${addressToLower.substr(0, 6)}...${addressToLower.substr(-4)}`;
        const verification = await signer.signMessage(
          `Please sign this message to verify that ${signAddress} belongs to you. ${nonce || ''}`,
        );
        setMsgSent(true);
        const result = await fetch('https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/verification', {
          method: 'POST',
          body: JSON.stringify({
            token,
            nonce,
            verification,
            address: addressToLower,
          }),
        })
          .then(res => {
            if (res.status === 404) setError(true);
            return res.text();
          })
          .catch(() => {
            setError(true);
          });
        if (result?.length) {
          const auth = result.slice(1, -1);
          window.localStorage.setItem('authentication-token', auth);
          window.localStorage.setItem('uuid-token', token);
          window.localStorage.setItem('nonce', nonce);
          return auth;
        }
      }
    }

    return null;
  };

  return [error, msgSent, signMsg];
};
