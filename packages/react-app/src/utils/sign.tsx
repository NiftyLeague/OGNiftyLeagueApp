/* eslint-disable import/prefer-default-export */
import React, { useContext, useState } from 'react';

import { NetworkContext } from 'NetworkProvider';
import { getProviderAndSigner } from 'helpers';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export const useSign = (_nonce?: string | null, _token?: string | null): [boolean, () => Promise<string | null>] => {
  const { address, userProvider } = useContext(NetworkContext);
  const [msgSent, setMsgSent] = useState(false);

  const nonce = _nonce || `0x${crypto.randomBytes(4).toString('hex')}`;
  const token =
    _token || `${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}`;

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
            if (res.status === 404) throw Error('Failed to verify signature!');
            return res.text();
          })
          .catch(() => {
            throw Error('Failed to verify signature!');
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

  return [msgSent, signMsg];
};
