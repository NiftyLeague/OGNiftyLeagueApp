import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';

import { NetworkContext } from 'NetworkProvider';
import { useSign } from 'utils/sign';

const GameVerification = (): JSX.Element => {
  const { address, userProvider } = useContext(NetworkContext);
  const [success, setSuccess] = useState(false);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const nonce = params.get('nonce');
  const token = params.get('token');
  const [error, setError] = useState('');
  const [msgSent, signMsg] = useSign(nonce, token);

  useEffect(() => {
    void (async () => {
      if (!msgSent) {
        try {
          const authToken = await signMsg();
          if (authToken) {
            setSuccess(true);
          }
        } catch (err) {
          setError(err);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, nonce, token, msgSent]);

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
