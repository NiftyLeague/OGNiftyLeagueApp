import { useCallback, useEffect, useState } from 'react';
import { MyRental, Rental, Rentals } from 'types/api';
import { INITIAL_FILTER_STATE, FILTER_STATE_KEY_TO_INDEX } from 'views/Rentals/constants';
import isEmpty from 'lodash/isEmpty';
import { BACKGROUNDS } from 'constants/characters';

const RENTALS_URL = 'https://nifty-league.s3.amazonaws.com/cache/rentals/rentables.json';
const RENTAL_URL = (degenId: string): string =>
  `https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/rentals/rentables?degen_id=${degenId}`;
const RENTAL_PASS_INVENTORY_URL =
  'https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/accounts/account/inventory?id=rental-pass-base';
const RENTAL_RENAME_URL = (rentalId: string): string =>
  `https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/rentals/rental/rename?id=${encodeURIComponent(
    rentalId,
  )}`;
const RENT_URL = 'https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/rentals/rent';
const MY_RENTALS_URL = 'https://odgwhiwhzb.execute-api.us-east-1.amazonaws.com/prod/rentals/my-rentals';

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
          .filter(degenId => {
            const itemName = items[degenId].name?.toLowerCase();
            return (
              degenId.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
              itemName?.includes(searchTerm.toLocaleLowerCase())
            );
          })
          .reduce((mergedObj, degenId) => ({ ...mergedObj, [degenId]: items[degenId] }), {})
      : items;

    setRentals(
      Object.keys(searchedItems)
        .filter(degenId => {
          const item = searchedItems[degenId];
          const { price, multiplier, total_rented, background } = item;
          if (
            !arrayTraitKeys.every(key => {
              const traitValue: string = item.traits_string.split(',')[FILTER_STATE_KEY_TO_INDEX[key] as number];
              return (filterState[key] as string[]).includes(traitValue);
            })
          ) {
            return false;
          }

          if (priceRange.low && priceRange.high) {
            if (!(priceRange.low <= price && price <= priceRange.high)) {
              return false;
            }
          }

          if (totalMultiplier.low && totalMultiplier.high) {
            if (!(totalMultiplier.low <= multiplier && multiplier <= totalMultiplier.high)) {
              return false;
            }
          }

          if (numOfRentals.low && numOfRentals.high) {
            if (!(numOfRentals.low <= total_rented && total_rented <= numOfRentals.high)) {
              return false;
            }
          }

          if (!isEmpty(backgrounds)) {
            if (!backgrounds.find(bgKey => (BACKGROUNDS[bgKey] as string).toLowerCase().includes(background))) {
              return false;
            }
          }

          return true;
        })
        .reduce((mergedObj, degenId) => ({ ...mergedObj, [degenId]: searchedItems[degenId] }), {}),
    );
  };

  useEffect(() => {
    async function resolveRentals() {
      if (cache?.timestamp && new Date().getTime() - cache.timestamp < CACHE_INTERVAL) {
        updateRentals(cache.data);
      } else {
        try {
          setLoading(true);
          const res = await fetch(RENTALS_URL);
          const result = (await res.json()) as Rentals;
          if (result) {
            updateRentals(result);
            cache = {
              timestamp: new Date().getTime(),
              data: result,
            };
          }
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
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
): (() => Promise<MyRental | undefined>) => {
  const rent = async (): Promise<MyRental | undefined> => {
    const auth = window.localStorage.getItem('authentication-token');
    if (!auth || !degenId || !price) {
      return undefined;
    }

    const res = await fetch(RENT_URL, {
      method: 'POST',
      headers: { authorizationToken: auth },
      body: JSON.stringify({
        degen_id: degenId,
        position,
        price,
        address,
      }),
    });
    if (res.status === 404) {
      throw Error('Not Found');
    }
    const json = (await res.json()) as MyRental;
    return json;
  };

  return rent;
};

export const useRental = (degenId: string | undefined): [boolean, boolean, Rental | undefined] => {
  const [loading, setLoading] = useState(true);
  const [rental, setRental] = useState<Rental>();
  const [error, setError] = useState(false);
  useEffect(() => {
    async function resolveRental() {
      const authToken = window.localStorage.getItem('authentication-token');
      if (!degenId || !authToken) {
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(RENTAL_URL(degenId), {
          method: 'GET',
          headers: { authorizationToken: authToken },
        });
        if (res.status === 404) {
          throw Error('Not Found');
        }
        const result = (await res.json()) as Rental;
        setRental(result);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    void resolveRental();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [degenId]);

  return [loading, error, rental];
};

export const useRentalPassCount = (degenId: string | undefined): [boolean, boolean, number] => {
  const [loading, setLoading] = useState(true);
  const [rentalPassCount, setRentalPassCount] = useState<number>(0);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function resolveRental() {
      const authToken = window.localStorage.getItem('authentication-token');
      if (!degenId || !authToken) {
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(RENTAL_PASS_INVENTORY_URL, {
          method: 'GET',
          headers: { authorizationToken: authToken },
        });
        if (res.status === 404) {
          throw Error('Not Found');
        }
        const json = (await res.json()) as any[];
        setRentalPassCount(json.length);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    void resolveRental();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [degenId]);

  return [loading, error, rentalPassCount];
};

export const useRentalRename = (
  degenId: string | undefined,
  rentalId: string | undefined,
  name: string | undefined,
): (() => Promise<void>) => {
  const rent = async () => {
    const auth = window.localStorage.getItem('authentication-token');
    if (!auth || !degenId || !rentalId || !name) {
      return;
    }

    const res = await fetch(RENTAL_RENAME_URL(rentalId), {
      method: 'POST',
      headers: { authorizationToken: auth },
      body: JSON.stringify({
        degen_id: degenId,
        name,
      }),
    });
    if (res.status === 404) {
      throw Error('Not Found');
    }
  };

  return rent;
};

export const useRentalRenameFee = (degenId: string | undefined): [boolean, boolean, number | undefined] => {
  const [loading, setLoading] = useState(true);
  const [rentalRenameFee, setRentalRenameFee] = useState<number>();
  const [error, setError] = useState(false);
  useEffect(() => {
    async function resolveRental() {
      if (!degenId) {
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(RENTAL_RENAME_URL(degenId), {
          method: 'GET',
        });
        if (res.status === 404 || res.status === 401) {
          throw Error('Not Found');
        }
        const json = (await res.json()) as { price: number };
        setRentalRenameFee(json.price);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    void resolveRental();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [degenId]);

  return [loading, error, rentalRenameFee];
};

export const useMyRentals = (): [MyRental[] | undefined, () => void] => {
  const [rentals, setRentals] = useState<MyRental[]>([]);
  const refresh = useCallback(() => {
    async function resolveRentals() {
      const auth = window.localStorage.getItem('authentication-token');
      if (!auth) {
        return;
      }

      try {
        const res = await fetch(MY_RENTALS_URL, {
          method: 'GET',
          headers: { authorizationToken: auth },
        });
        const result = (await res.json()) as MyRental[];
        setRentals(result);
      } catch (err) {
        // eslint-disable-next-line no-empty
        console.error(err);
      }
    }
    void resolveRentals();
  }, []);
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [rentals, refresh];
};
