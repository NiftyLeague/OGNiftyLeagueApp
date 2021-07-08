import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Container, Grid, Typography } from "@material-ui/core";
import { CharacterCard, WalletConnectPrompt } from "components";
import { OWNER_QUERY } from "./query";

const useStyles = makeStyles(theme => ({
  container: { padding: "40px 0" },
  progress: { marginTop: 100 },
  grid: { flexGrow: 1, margin: "8px 0px 8px -8px" },
}));

const Wallet = ({ address }) => {
  const classes = useStyles();
  const { loading, data } = useQuery(OWNER_QUERY, {
    pollInterval: 5000,
    variables: { address: address?.toLowerCase() },
    skip: !address,
  });

  const characters = useMemo(() => {
    return data?.owner?.characters || [];
  }, [data]);

  console.log("data", data);

  return address ? (
    <Container className={classes.container}>
      {loading ? (
        <CircularProgress size={100} className={classes.progress} />
      ) : (
        <>
          <Typography variant="h4">Your Degens</Typography>
          <Grid container spacing={2} className={classes.grid}>
            {characters.map(character => (
              <Grid item xs={6} sm={4} md={3} key={character.id}>
                <CharacterCard character={character} ownerOwned />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  ) : (
    <WalletConnectPrompt />
  );
};

export default Wallet;
