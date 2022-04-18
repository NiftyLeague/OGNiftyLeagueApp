/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useMemo, useState } from 'react';
import { CircularProgress, Container, Grid, Pagination } from '@mui/material';
import clsx from 'clsx';
import { useThemeSwitcher } from 'react-css-theme-switcher';

import { RentalCard } from 'components';
import useRentals from 'hooks/useRentals';
import isEmpty from 'lodash/isEmpty';

import RentalSearchSidebar from 'components/RentalSearchSidebar';
import { INITIAL_FILTER_STATE, PAGE_SIZE } from './constants';
import CustomSearchInput from './CustomSearchInput';
import { useStyles } from '../Characters/styles';

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

  const handleFilter = (value: typeof filterState) => {
    setPage(1);
    localStorage.setItem(PAGE_KEY, '1');
    setFilterState(value);
  };

  const initFilter = () => {
    setFilterState(INITIAL_FILTER_STATE);
  };
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setFilterState(prev => ({
      ...prev,
      search,
    }));
  }, [search]);

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
          {(rentals && (Object.keys(rentals).length > PAGE_SIZE)) ? (
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
        </Container>
      </div>
    </>
  );
};

export default CharactersContainer;
