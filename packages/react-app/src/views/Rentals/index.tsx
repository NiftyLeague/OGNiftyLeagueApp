/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useMemo, useState } from 'react';
import { CircularProgress, Container, Grid, Pagination, Box } from '@mui/material';
import clsx from 'clsx';
import { useThemeSwitcher } from 'react-css-theme-switcher';

import { RentalCard } from 'components';
import { useRentals } from 'hooks/rental';
import isEmpty from 'lodash/isEmpty';

import { RentalSearchSidebar } from 'components/RentalSearchSidebar';
import { SORT_FUNCTION } from 'constants/index';
import { INITIAL_FILTER_STATE } from './constants';
import CustomSearchInput from './CustomSearchInput';
import { useStyles } from '../Characters/styles';
import useDebounce from '../../hooks/useDebounce';
import CustomSort from './CustomSort';

const PAGE_SIZE = 20;
const PAGE_KEY = 'FILTER_PAGE';

const CharactersContainer = (): JSX.Element => {
  const { currentTheme } = useThemeSwitcher();
  const classes: any = useStyles();
  const storedPage = localStorage.getItem(PAGE_KEY);
  const [page, setPage] = useState(storedPage ? parseInt(storedPage, 10) : 1);
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
  const filterActive = useMemo(() => Object.values(filterState).some(v => isEmpty(v)), [filterState]);
  const [loading, error, rentals] = useRentals(filterState);
  const [sort, setSort] = useState('idAscending');
  const handleFilter = (value: typeof filterState) => {
    setPage(1);
    localStorage.setItem(PAGE_KEY, '1');
    setFilterState(value);
  };

  const initFilter = () => {
    setFilterState({
      ...INITIAL_FILTER_STATE,
      search,
    });
  };
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  // for debouncing search field => waiting 5 milliseconds after adding new character in search field then filter the rentals
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    setFilterState(prev => ({
      ...prev,
      search,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);
  console.log('loading: ', loading);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <RentalSearchSidebar
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          filterState={filterState}
          setFilterState={handleFilter}
          initFilter={initFilter}
        />
        <Container className={classes.container}>
          <Box className={classes.topBox}>
            <CustomSearchInput search={search} setSearch={setSearch} />
            <CustomSort sort={sort} setSort={setSort} />
          </Box>
          {loading ? (
            <CircularProgress size={100} style={{ marginTop: 100 }} />
          ) : (
            <>
              {rentals && Object.keys(rentals).length > 0 ? (
                <Box className={classes.grid}>
                  {Object.values(rentals)
                    .sort(SORT_FUNCTION[sort])
                    .slice((page - 1) * PAGE_SIZE, (page - 1) * PAGE_SIZE + PAGE_SIZE)
                    .map(rental => (
                      <RentalCard key={rental.id} rental={rental} />
                    ))}
                </Box>
              ) : (
                <Box className={clsx(classes.noItem)}>
                  <p>No items found</p>
                </Box>
              )}
              {rentals && Object.keys(rentals).length > PAGE_SIZE ? (
                <Pagination
                  className={clsx(classes.pagination, { [classes.paginationDark]: currentTheme === 'dark' })}
                  color="primary"
                  count={Math.ceil(Object.keys(rentals)?.length / PAGE_SIZE)}
                  onChange={(_, value) => {
                    setPage(value);
                    localStorage.setItem(PAGE_KEY, value.toString());
                  }}
                  page={page}
                  size="large"
                  variant="outlined"
                />
              ) : null}
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default CharactersContainer;
