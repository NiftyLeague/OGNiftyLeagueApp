import { useContext, useEffect, useState } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { DEGEN_BASE_API_URL } from '../constants/characters';

const useBackgroundType = (tokenId: string | number): [boolean, boolean, string] => {
  const [loading, setLoading] = useState(true);
  const [background, setBackground] = useState('Not Found');
  const [error, setError] = useState(false);
  const { targetNetwork } = useContext(NetworkContext);
  const backgroundAPI = `${DEGEN_BASE_API_URL}/${targetNetwork.name || 'rinkeby'}/degen/${tokenId}/background`;

  useEffect(() => {
    async function resolveBackground() {
      const result = await fetch(backgroundAPI)
        .then(res => {
          if (res.status === 404) setError(true);
          setLoading(false);
          return res.text();
        })
        .catch(() => {
          setError(true);
        });
      if (result) setBackground(result);
    }
    if (tokenId) void resolveBackground();
  }, [tokenId, backgroundAPI]);

  return [loading, error, background];
};

export default useBackgroundType;
