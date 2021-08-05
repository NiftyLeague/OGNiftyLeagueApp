import React, { useCallback, useMemo, useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import clsx from 'clsx';
import { useQuery } from '@apollo/client';
import { CircularProgress, Container, Grid, Snackbar } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { CharacterCard, SaleProgress } from 'components';
import CharactersFilter from './CharactersFilter';
import { INITIAL_FILTER_STATE, FILTER_STATE_MAPPING, PAGE_SIZE } from './constants';
import { DEFAULT_QUERY, FILTER_SEARCH_QUERY, ID_SEARCH_QUERY, NAME_SEARCH_QUERY } from './queries';
import { useStyles } from './styles';

const CharactersContainer = () => {
  const classes = useStyles();
  const { currentTheme } = useThemeSwitcher();
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
  const filterActive = useMemo(() => Object.values(filterState).some(v => v.length), [filterState]);

  let query = DEFAULT_QUERY;
  if (search) query = search.match(/^\d+$/) ? ID_SEARCH_QUERY : NAME_SEARCH_QUERY;
  const { loading, data } = useQuery(query, {
    pollInterval: 5000,
    variables: { size: PAGE_SIZE, lastID: (page - 1) * PAGE_SIZE, search },
  });

  const filterParams = useMemo(() => {
    const params = {};
    if (filterActive) {
      Object.entries(filterState).forEach(([key, values]) => {
        params[key] = values.length ? values : ['0', ...Object.keys(FILTER_STATE_MAPPING[key])];
      });
      Object.entries(params).forEach(([key, values]) => {
        params[key] = values.map(v => parseInt(v, 10));
      });
    }
    return params;
  }, [filterActive, filterState]);

  const { loading: filterDataLoading, data: filterData } = useQuery(FILTER_SEARCH_QUERY, {
    pollInterval: 5000,
    variables: { ...filterParams },
    skip: !filterActive,
  });

  const handleClose = useCallback(
    (event, reason) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    },
    [setOpen],
  );

  const handleSearch = value => {
    setPage(1);
    setSearch(value);
  };

  const handleFilter = value => {
    setPage(1);
    setFilterState(value);
  };

  const characters = useMemo(() => {
    if (filterData?.traitMaps) {
      const chars = filterData.traitMaps.map(t => t.character);
      return search ? chars.filter(c => c.name.includes(search) || c.id === search) : chars;
    }
    return data?.characters || [];
  }, [data, filterData, search]);

  const unfilteredSearch = data?.contracts && !filterActive;

  return (
    <Container style={{ padding: '40px 0' }}>
      <CharactersFilter
        filterActive={filterActive}
        filterState={filterState}
        search={search}
        setFilterState={handleFilter}
        setSearch={handleSearch}
      />
      {loading || filterDataLoading ? (
        <CircularProgress size={100} style={{ marginTop: 100 }} />
      ) : (
        <Grid container spacing={2} style={{ flexGrow: 1, margin: '8px 0px 8px -8px' }}>
          {(unfilteredSearch
            ? characters
            : characters.slice((page - 1) * PAGE_SIZE, (page - 1) * PAGE_SIZE + PAGE_SIZE)
          ).map(character => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
              <CharacterCard character={character} />
            </Grid>
          ))}
        </Grid>
      )}
      {(unfilteredSearch && data.contracts[0]?.totalSupply) || (characters && characters.length > PAGE_SIZE) ? (
        <Pagination
          className={clsx(classes.pagination, { [classes.paginationDark]: currentTheme === 'dark' })}
          color="primary"
          count={
            unfilteredSearch
              ? Math.ceil(data.contracts[0]?.totalSupply / PAGE_SIZE)
              : Math.ceil(characters?.length / PAGE_SIZE)
          }
          onChange={(_, value) => setPage(value)}
          page={page}
          size="large"
          variant="outlined"
        />
      ) : null}
      <Snackbar open={open} autoHideDuration={null} onClose={handleClose} className={classes.snackbar}>
        <SaleProgress handleClose={handleClose} />
      </Snackbar>
    </Container>
  );
};

export default CharactersContainer;
