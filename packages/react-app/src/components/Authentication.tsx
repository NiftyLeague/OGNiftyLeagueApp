import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import Container from '@mui/material/Container';

import { NetworkContext } from 'NetworkProvider';
import { useSign } from 'utils/sign';

const ProfileVerification = ({
  setAuth,
  setSuccess,
}: {
  setAuth: (value: React.SetStateAction<string>) => void;
  setSuccess: (value: React.SetStateAction<boolean>) => void;
}): JSX.Element => {
  const { address, userProvider } = useContext(NetworkContext);
  const [error, setError] = useState('');
  const [msgSent, signMsg] = useSign();

  useEffect(() => {
    void (async () => {
      if (!msgSent) {
        try {
          const authToken = await signMsg();
          if (authToken) {
            setAuth(authToken);
            setSuccess(true);
          }
        } catch (err) {
          setError(err);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, msgSent]);

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
