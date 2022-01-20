import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import { NetworkContext } from 'NetworkProvider';
import { getProviderAndSigner } from 'helpers';

const GameVerification = (): JSX.Element => {
  const { address, userProvider } = useContext(NetworkContext);
  const [msgSent, setMsgSent] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const nonce = params.get('nonce');
  const token = params.get('token');

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
            setSuccess(true);
            window.localStorage.setItem('authentication-token', result.slice(1, -1));
          }
        }
      }
    };
    if (address && userProvider && nonce && token && !msgSent) void signMsg();
  }, [address, msgSent, nonce, token, userProvider]);

  return (
    <Container style={{ textAlign: 'center', padding: '40px' }}>
      {error || success ? (
        <>
          {error && 'Error signing message'}
          {success && 'Successfully verified account! Please return to the Nifty League desktop app'}
        </>
      ) : (
        <>{address ? 'Please sign message to verify address ownership' : 'Please connect your wallet'}</>
      )}
    </Container>
  );
};

export default GameVerification;
