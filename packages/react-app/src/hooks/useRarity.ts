import { useContext, useEffect, useState } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { DEGEN_BASE_API_URL } from '../constants/characters';

const useRarity = (tokenId: string | number): [boolean, boolean, string] => {
  const [loading, setLoading] = useState(true);
  const [rarity, setRarity] = useState('Not Found');
  const [error, setError] = useState(false);
  const { targetNetwork } = useContext(NetworkContext);
  const rarityAPI = `${DEGEN_BASE_API_URL}/${targetNetwork.name || 'rinkeby'}/degen/${tokenId}/rarity`;

  useEffect(() => {
    async function resolveRarity() {
      const result = await fetch(rarityAPI)
        .then(res => {
          if (res.status === 404) setError(true);
          setLoading(false);
          return res.text();
        })
        .catch(() => {
          setError(true);
        });
      if (result) setRarity(result);
    }
    if (tokenId) void resolveRarity();
  }, [tokenId, rarityAPI]);

  return [loading, error, rarity];
};

export default useRarity;
