import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Container, Grid, Typography } from "@material-ui/core";
import { CharacterCard, WalletConnectPrompt } from "components";
import { useClaimableNFTL } from "hooks";
import { OWNER_QUERY } from "./query";

const useStyles = makeStyles(theme => ({
  container: { padding: "40px 0" },
  progress: { marginTop: 100 },
  grid: { flexGrow: 1, margin: "8px 0px 8px -8px" },
}));

const Wallet = ({ address, readContracts }) => {
  const classes = useStyles();
  const { loading, data } = useQuery(OWNER_QUERY, {
    pollInterval: 5000,
    variables: { address: address?.toLowerCase() },
    skip: !address,
  });

  const characters = useMemo(() => {
    return data?.owner?.characters || [];
  }, [data]);

  const tokenIndices = useMemo(() => {
    return characters.map(char => parseInt(char.id, 10));
  }, [characters]);

  const totalAccumulated = useClaimableNFTL(readContracts, tokenIndices);

  console.log("totalAccumulated", tokenIndices, totalAccumulated);

  return address ? (
    <Container className={classes.container}>
      {loading ? (
        <CircularProgress size={100} className={classes.progress} />
      ) : (
        <>
          <Typography variant="h4">Your Degens</Typography>
          {characters.length ? (
            <Grid container spacing={2} className={classes.grid}>
              {characters.map(character => (
                <Grid item xs={6} sm={4} md={3} key={character.id}>
                  <CharacterCard character={character} ownerOwned />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div style={{ paddingTop: 60 }}>
              No Degens found. Please check your address or go mint if you haven't done so already!
            </div>
          )}
        </>
      )}
    </Container>
  ) : (
    <WalletConnectPrompt />
  );
};

export default Wallet;
