import { useEffect, useState } from 'react';
import { Rentals } from 'types/api';

export const RENTALS_URL = `${process.env.REACT_APP_AWS_BASED_API_URL || ''}prod/rentals/rentables`;

const CACHE_INTERVAL = 5 * 60 * 1000;

let cache: {
  timestamp: number | undefined;
  data: Rentals | undefined;
};

const useRentals = (): [boolean, boolean, Rentals | undefined] => {
  const [loading, setLoading] = useState(true);
  const [rentals, setRentals] = useState<Rentals>();
  const [error, setError] = useState(false);
  const authToken = window.localStorage.getItem('authentication-token');

  useEffect(() => {
    async function resolveRentals() {
      if (!authToken) {
        return;
      }

      if (cache?.timestamp && new Date().getTime() - cache.timestamp < CACHE_INTERVAL) {
        setRentals(cache.data);
      } else {
        const result = await fetch(RENTALS_URL, {
          headers: { authorizationToken: authToken },
        })
          .then(async res => {
            if (res.status === 404) setError(true);
            setLoading(false);
            const json = (await res.json()) as Rentals;
            return json;
          })
          .catch(() => {
            setError(true);
          });
        if (result) {
          setRentals(result);
          cache = {
            timestamp: new Date().getTime(),
            data: result,
          };
        }
      }
    }
    void resolveRentals();
  }, [authToken]);

  return [loading, error, rentals];
};

export default useRentals;
