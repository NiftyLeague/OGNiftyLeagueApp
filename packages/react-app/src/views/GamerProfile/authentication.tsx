import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import Container from '@material-ui/core/Container';

import { NetworkContext } from 'NetworkProvider';
import { getProviderAndSigner } from 'helpers';

const ProfileVerification = ({
  setSuccess,
}: {
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
            console.log('result', result);
            setSuccess(true);
            window.localStorage.setItem('authentication-token', result.slice(1, -1));
          }
        }
      }
    };
    if (address && userProvider && nonce.length > 5 && token && !msgSent) void signMsg();
  }, [address, msgSent, nonce, token, userProvider, setSuccess]);

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

export default function withVerification(Component: () => JSX.Element) {
  return (): JSX.Element | null => {
    const { address } = useContext(NetworkContext);
    const [success, setSuccess] = useState(false);
    const auth = window.localStorage.getItem('authentication-token');
    console.log('auth', auth);
    console.log('address', address);

    useEffect(() => {
      const checkAddress = async () => {
        if (auth) {
          const result = await fetch('https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/verification', {
            method: 'OPTIONS',
            headers: {
              authorizationToken: auth,
              'Access-Control-Allow-Origin': '*',
            },
          })
            .then(res => {
              if (res.status === 404) setSuccess(false);
              return res.text();
            })
            .catch(() => {
              setSuccess(false);
            });
          console.log('result', result);
          if (result && result.slice(1, -1) === address.toLowerCase()) {
            setSuccess(true);
          } else {
            // window.localStorage.removeItem('authentication-token');
            setSuccess(true); // TODO: remove once CORS issues are resolved
          }
        }
      };
      if (auth && address) void checkAddress();
    }, [auth, address, setSuccess]);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (auth && !success) return null;
    return success ? <Component /> : <ProfileVerification setSuccess={setSuccess} />;
  };
}
