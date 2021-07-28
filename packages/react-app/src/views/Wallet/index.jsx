import React, { useCallback, useContext, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Button } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Container, Grid, Typography } from "@material-ui/core";
import { CharacterCard, WalletConnectPrompt } from "components";
import { useClaimableNFTL } from "hooks";
import { NetworkContext } from "NetworkProvider";
import { DEBUG, NFTL_CONTRACT } from "../../constants";
import { OWNER_QUERY } from "./query";

const useStyles = makeStyles(theme => ({
  container: { padding: "40px 0" },
  progress: { marginTop: 100 },
  claimContainer: { display: "flex", alignItems: "baseline", float: "right", marginTop: -50 },
  grid: { flexGrow: 1, margin: "8px 0px 8px -8px" },
  [theme.breakpoints.down(840)]: {
    claimContainer: { marginTop: 0 },
  },
}));

const ClaimNFTL = ({ tokenIndices }) => {
  const { tx, writeContracts } = useContext(NetworkContext);
  const classes = useStyles();
  const totalAccumulated = useClaimableNFTL(writeContracts, tokenIndices);

  const handleClaimNFTL = useCallback(async () => {
    if (DEBUG) console.log("claim", tokenIndices, totalAccumulated);
    tx(writeContracts[NFTL_CONTRACT].claim(tokenIndices));
  }, [tokenIndices, totalAccumulated, tx, writeContracts]);

  const btnStyles = {
    verticalAlign: "top",
    marginLeft: 8,
    marginTop: 16,
    background: "-webkit-linear-gradient(89deg, #620edf 0%, #5e72eb 100%)",
    color: "#fff",
    borderColor: "#6f6c6c",
  };

  return totalAccumulated ? (
    <div className={classes.claimContainer}>
      {parseFloat(totalAccumulated).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}{" "}
      NFTL Claimable
      {totalAccumulated > 0.0 && writeContracts && (
        <Button style={btnStyles} shape="round" size="large" onClick={handleClaimNFTL}>
          Claim
        </Button>
      )}
    </div>
  ) : null;
};

const Wallet = () => {
  const classes = useStyles();
  const { address } = useContext(NetworkContext);
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

  return address ? (
    <Container className={classes.container}>
      {loading ? (
        <CircularProgress size={100} className={classes.progress} />
      ) : (
        <>
          <Typography variant="h4">Your Degens</Typography>
          <ClaimNFTL tokenIndices={tokenIndices} />
          {characters.length ? (
            <Grid container spacing={2} className={classes.grid}>
              {characters.map(character => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
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
