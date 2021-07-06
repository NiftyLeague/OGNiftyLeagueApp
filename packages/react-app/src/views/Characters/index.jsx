import React, { useMemo, useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import clsx from "clsx";
import { useQuery } from "@apollo/client";
import { CircularProgress, Container, Grid, Snackbar } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import SaleProgress from "components/SaleProgress";
import CharactersFilter from "./CharactersFilter";
import CharacterCard from "./CharacterCard";
import { INITIAL_FILTER_STATE, PAGE_SIZE } from "./constants";
import { DEFAULT_QUERY, FILTER_SEARCH_QUERY, ID_SEARCH_QUERY, NAME_SEARCH_QUERY } from "./queries";
import { useStyles } from "./styles";

const CharactersContainer = ({ readContracts }) => {
  const classes = useStyles();
  const { currentTheme } = useThemeSwitcher();
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
  const filterActive = useMemo(() => Object.values(filterState).some(v => v.length), [filterState]);

  console.log("filterState", filterState);

  let query = DEFAULT_QUERY;
  if (filterActive) query = FILTER_SEARCH_QUERY;
  else if (search) query = search.match(/^\d+$/) ? ID_SEARCH_QUERY : NAME_SEARCH_QUERY;

  const { loading, data } = useQuery(query, {
    pollInterval: 5000,
    variables: { size: PAGE_SIZE, lastID: (page - 1) * PAGE_SIZE, search },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Container style={{ padding: "40px 0" }}>
      <CharactersFilter
        filterActive={filterActive}
        filterState={filterState}
        search={search}
        setFilterState={setFilterState}
        setSearch={setSearch}
      />
      {loading ? (
        <CircularProgress size={100} style={{ marginTop: 100 }} />
      ) : (
        <Grid container spacing={2} style={{ flexGrow: 1, margin: "8px 0px 8px -8px" }}>
          {data?.characters?.map(character => (
            <Grid item xs={6} sm={4} md={3} key={character.id}>
              <CharacterCard character={character} />
            </Grid>
          ))}
        </Grid>
      )}
      {(data?.contracts && data.contracts[0]?.totalSupply) ||
      (data?.characters && data.characters.length > PAGE_SIZE) ? (
        <Pagination
          className={clsx(classes.pagination, { [classes.paginationDark]: currentTheme === "dark" })}
          color="primary"
          count={
            data?.contracts
              ? Math.ceil(data.contracts[0]?.totalSupply / PAGE_SIZE)
              : Math.ceil(data?.characters?.length / PAGE_SIZE)
          }
          onChange={(_, value) => setPage(value)}
          page={page}
          size="large"
          variant="outlined"
        />
      ) : null}
      <Snackbar open={open} autoHideDuration={null} onClose={handleClose} className={classes.snackbar}>
        <SaleProgress readContracts={readContracts} handleClose={handleClose} />
      </Snackbar>
    </Container>
  );
};

export default CharactersContainer;
