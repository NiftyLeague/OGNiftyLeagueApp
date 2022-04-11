/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useMemo, useState } from 'react';
import { CircularProgress, Container, Grid } from '@mui/material';
import { RentalCard } from 'components';
import useRentals from 'hooks/useRentals';
import isEmpty from 'lodash/isEmpty';

import CharactersFilter from './CharactersFilter';
import { INITIAL_FILTER_STATE, PAGE_SIZE } from './constants';
import CustomSearchInput from './CustomSearchInput';

const PAGE_KEY = 'FILTER_PAGE';

const CharactersContainer = (): JSX.Element => {
  const storedPage = localStorage.getItem(PAGE_KEY);
  const [page, setPage] = useState(storedPage ? parseInt(storedPage, 10) : 1);
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
  const filterActive = useMemo(() => Object.values(filterState).some(v => isEmpty(v)), [filterState]);
  const [loading, error, rentals] = useRentals(filterState);

  const handleSearch = value => {
    setPage(1);
    localStorage.setItem(PAGE_KEY, '1');
    setSearch(value);
  };

  const handleFilter = (value: typeof filterState) => {
    setPage(1);
    localStorage.setItem(PAGE_KEY, '1');
    setFilterState(value);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <CharactersFilter
          filterActive={filterActive}
          filterState={filterState}
          search={search}
          setFilterState={handleFilter}
          setSearch={handleSearch}
        />
        <Container>
          <CustomSearchInput search={search} setSearch={setSearch} />
          {loading ? (
            <CircularProgress size={100} style={{ marginTop: 100 }} />
          ) : (
            <Grid container spacing={2} style={{ flexGrow: 1, margin: '8px 0px 8px -8px' }}>
              {rentals &&
                Object.values(rentals)
                  .slice((page - 1) * PAGE_SIZE, (page - 1) * PAGE_SIZE + PAGE_SIZE)
                  .map(rental => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={rental.id}>
                      <RentalCard rental={rental} />
                    </Grid>
                  ))}
            </Grid>
          )}
        </Container>
      </div>
    </>
  );
};

export default CharactersContainer;
