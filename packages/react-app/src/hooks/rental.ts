import { useEffect, useState } from 'react';
import { Rentals } from 'types/api';
import { INITIAL_FILTER_STATE, FILTER_STATE_KEY_TO_INDEX } from 'views/Rentals/constants';
import isEmpty from 'lodash/isEmpty';
import { BACKGROUNDS } from 'constants/characters';

export const RENTALS_URL = 'https://nifty-league.s3.amazonaws.com/cache/rentals/rentables.json';
export const RENTAL_URL = (degenId: string): string =>
  `https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/rentals/rentables?degen_id=${degenId}`;

const CACHE_INTERVAL = 5 * 60 * 1000;

let cache: {
  timestamp: number | undefined;
  data: Rentals | undefined;
};

export const useRentals = (filterState: typeof INITIAL_FILTER_STATE): [boolean, boolean, Rentals | undefined] => {
  const [loading, setLoading] = useState(true);
  const [rentals, setRentals] = useState<Rentals>();
  const [error, setError] = useState(false);
  const updateRentals = (items: Rentals | undefined): void => {
    if (!items) {
      return;
    }

    const {
      search: searchTerm,
      price: priceRange,
      totalMultiplier,
      numOfRentals,
      backgrounds,
      ...arrayTraits
    } = filterState;
    const arrayTraitKeys = Object.keys(arrayTraits).filter(key => !isEmpty(filterState[key]));

    const searchedItems: Rentals = searchTerm
      ? Object.keys(items)
          .filter(rentalId => {
            const itemName = items[rentalId].name?.toLowerCase();
            return (
              rentalId.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
              itemName?.includes(searchTerm.toLocaleLowerCase())
            );
          })
          .reduce((mergedObj, rentalId) => ({ ...mergedObj, [rentalId]: items[rentalId] }), {})
      : items;

    setRentals(
      Object.keys(searchedItems)
        .filter(rentalId =>
          arrayTraitKeys.every(key => {
            const traitValue: string =
              searchedItems[rentalId].traits_string.split(',')[FILTER_STATE_KEY_TO_INDEX[key] as number];
            return (filterState[key] as string[]).includes(traitValue);
          }),
        )
        .filter(rentalId => {
          const { price } = searchedItems[rentalId];
          if (priceRange.low && priceRange.high) {
            return priceRange.low <= price && price <= priceRange.high;
          }
          return true;
        })
        .filter(rentalId => {
          const { multiplier } = searchedItems[rentalId];
          if (totalMultiplier.low && totalMultiplier.high) {
            return totalMultiplier.low <= multiplier && multiplier <= totalMultiplier.high;
          }
          return true;
        })
        .filter(rentalId => {
          const { total_rented } = searchedItems[rentalId];
          if (numOfRentals.low && numOfRentals.high) {
            return numOfRentals.low <= total_rented && total_rented <= numOfRentals.high;
          }
          return true;
        })
        .filter(rentalId => {
          if (isEmpty(backgrounds)) {
            return true;
          }

          const { background } = searchedItems[rentalId];
          return !!backgrounds.find(bgKey => (BACKGROUNDS[bgKey] as string).toLowerCase().includes(background));
        })
        .reduce((mergedObj, rentalId) => ({ ...mergedObj, [rentalId]: searchedItems[rentalId] }), {}),
    );
  };

  useEffect(() => {
    async function resolveRentals() {
      if (cache?.timestamp && new Date().getTime() - cache.timestamp < CACHE_INTERVAL) {
        updateRentals(cache.data);
      } else {
        const result = await fetch(RENTALS_URL)
          .then(async res => {
            if (res.status === 404) setError(true);
            const json = (await res.json()) as Rentals;
            setLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState]);

  return [loading, error, rentals];
};

export const useRent = (
  degenId: string | undefined,
  position: number,
  price: number | undefined,
  address: string,
): (() => Promise<void>) => {
  const rent = async () => {
    const auth = window.localStorage.getItem('authentication-token');
    if (!auth || !degenId || !price) {
      return;
    }

    const res = await fetch('https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/rentals/rent', {
      method: 'POST',
      headers: { authorizationToken: auth },
      body: JSON.stringify({
        degen_id: degenId,
        position: degenId,
        price,
        address,
      }),
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (json.statusCode) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw Error(json.body);
    } else {
      alert('rent success');
    }
  };

  return rent;
};

export const useRental = (rentalId: string | undefined): [boolean, boolean, Rentals | undefined] => {
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState<Rentals>();
  const [error, setError] = useState(false);
  useEffect(() => {
    async function resolveRental() {
      const authToken = window.localStorage.getItem('authentication-token');
      if (!rentalId || !authToken) {
        return;
      }

      const result = await fetch(RENTAL_URL(rentalId), {
        method: 'GET',
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
        setRental(result);
      }
    }
    void resolveRental();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rentalId]);

  return [loading, error, rental];
};
