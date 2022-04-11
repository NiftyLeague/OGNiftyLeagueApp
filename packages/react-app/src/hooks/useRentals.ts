import { useEffect, useState } from 'react';
import { Rentals } from 'types/api';
import { INITIAL_FILTER_STATE, FILTER_STATE_KEY_TO_TRAIT_MAPPING, FILTER_STATE_MAPPING } from 'views/Rentals/constants';
import isEmpty from 'lodash/isEmpty';

export const RENTALS_URL = 'https://nifty-league.s3.amazonaws.com/cache/rentals/rentables.json';

const CACHE_INTERVAL = 5 * 60 * 1000;

let cache: {
  timestamp: number | undefined;
  data: Rentals | undefined;
};

const useRentals = (filterState: typeof INITIAL_FILTER_STATE): [boolean, boolean, Rentals | undefined] => {
  const [loading, setLoading] = useState(true);
  const [rentals, setRentals] = useState<Rentals>();
  const [error, setError] = useState(false);
  const authToken = window.localStorage.getItem('authentication-token');
  const updateRentals = (items: Rentals | undefined): void => {
    if (!items) {
      return;
    }

    const { totalMultiplier, numOfRentals, ...arrayTraits } = filterState;
    const arrayTraitKeys = Object.keys(arrayTraits).filter(key => !isEmpty(filterState[key]));
    setRentals(
      Object.keys(items)
        .filter(rentalId =>
          arrayTraitKeys.every(key => {
            const traitValue = items[rentalId][FILTER_STATE_KEY_TO_TRAIT_MAPPING[key]];
            return (
              !traitValue ||
              (filterState[key] as string[])
                .map(traitId => FILTER_STATE_MAPPING[key][traitId].toLowerCase())
                .includes(traitValue)
            );
          }),
        )
        .reduce((mergedObj, rentalId) => ({ ...mergedObj, [rentalId]: items[rentalId] }), {}),
    );
  };

  console.log('------filterState-----', filterState);

  useEffect(() => {
    async function resolveRentals() {
      if (!authToken) {
        return;
      }

      if (cache?.timestamp && new Date().getTime() - cache.timestamp < CACHE_INTERVAL) {
        updateRentals(cache.data);
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
          updateRentals(result);
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
