import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import Container from '@mui/material/Container';

import { NetworkContext } from 'NetworkProvider';
import { getProviderAndSigner } from 'helpers';

const ProfileVerification = ({
  setAuth,
  setSuccess,
}: {
  setAuth: (value: React.SetStateAction<string>) => void;
  setSuccess: (value: React.SetStateAction<boolean>) => void;
}): JSX.Element => {
  const { address, userProvider } = useContext(NetworkContext);
  const [msgSent, setMsgSent] = useState(false);
  const [error, setError] = useState(false);
  const nonce = `0x${crypto.randomBytes(4).toString('hex')}`;
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-call
  const token = `${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}-${uuidv4()}`;

  useEffect(() => {
    const signMsg = async () => {
      if (userProvider) {
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
          if (result && result.length) {
            const auth = result.slice(1, -1);
            setAuth(auth);
            setSuccess(true);
            window.localStorage.setItem('authentication-token', auth);
            window.localStorage.setItem('uuid-token', token);
            window.localStorage.setItem('nonce', nonce);
          }
        }
      }
    };
    if (address && userProvider && nonce.length > 5 && token && !msgSent) void signMsg();
  }, [address, msgSent, nonce, token, userProvider, setAuth, setSuccess]);

  return (
    <Container style={{ textAlign: 'center', padding: '40px' }}>
      {error ? (
        'Error signing message'
      ) : (
        <>{address ? 'Please sign message to verify address ownership' : 'Please connect your wallet'}</>
      )}
    </Container>
  );
};

export default function withVerification(Component: (props: any) => JSX.Element) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (props): JSX.Element | null => {
    const { address } = useContext(NetworkContext);
    const [success, setSuccess] = useState(false);
    const [auth, setAuth] = useState(window.localStorage.getItem('authentication-token'));

    useEffect(() => {
      const checkAddress = async () => {
        if (auth) {
          const result = await fetch(
            'https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/verification/address',
            {
              headers: { authorizationToken: auth },
            },
          )
            .then(res => {
              if (res.status === 404) setSuccess(false);
              return res.text();
            })
            .catch(() => {
              setSuccess(false);
            });
          if (result && result.slice(1, -1) === address.toLowerCase()) {
            setSuccess(true);
          } else {
            window.localStorage.removeItem('authentication-token');
            window.localStorage.removeItem('uuid-token');
            window.localStorage.removeItem('nonce');
            setAuth(null);
          }
        }
      };
      if (auth && address) void checkAddress();
    }, [auth, address, setSuccess]);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (auth && !success) return null;
    return success ? (
      <Component {...props} auth={auth} />
    ) : (
      <ProfileVerification setAuth={setAuth} setSuccess={setSuccess} />
    );
  };
}
