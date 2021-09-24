import { useContext, useEffect, useState } from 'react';
import { NetworkContext } from 'NetworkProvider';
import { DEGEN_BASE_API_URL } from '../constants/characters';

const useRarity = (tokenId: string | number): [boolean, boolean, number] => {
  const [loading, setLoading] = useState(true);
  const [rarity, setRarity] = useState(0);
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
      if (result) setRarity(parseInt(result, 10));
    }
    if (tokenId) void resolveRarity();
  }, [tokenId, rarityAPI]);

  return [loading, error, rarity];
};

export default useRarity;
