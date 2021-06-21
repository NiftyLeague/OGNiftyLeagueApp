import React, { useState } from "react";
import { Container, Grid, Snackbar } from "@material-ui/core";
import SaleProgress from "components/SaleProgress";
import CharactersFilter from "./CharactersFilter";
import CharacterCard from "./CharacterCard";

const CharactersContainer = ({ readContracts }) => {
  const [open, setOpen] = useState(true);
  const [characters, setCharcters] = useState([
    { id: 1, created: 1624111342, name: "Degen Ape", tribe: "Ape", skinColor: "Blue" },
    { id: 2, created: 1624123342, name: "Happy frog", tribe: "Frog", skinColor: "Blue" },
    { id: 3, created: 1624135342, name: "Yoko", tribe: "Cat", skinColor: "Red" },
    { id: 4, created: 1624141342, name: "Bruce", tribe: "Human", skinColor: "White" },
    { id: 5, created: 1624141342, name: "Ape 5", tribe: "Ape", skinColor: "Black" },
  ]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Container style={{ padding: "40px 0" }}>
      <CharactersFilter />
      <Grid container spacing={2} style={{ flexGrow: 1, margin: "8px 0px 8px -8px" }}>
        {characters.map(character => (
          <Grid item xs={6} sm={4} md={3} key={character.id}>
            <CharacterCard character={character} />
          </Grid>
        ))}
      </Grid>
      <Snackbar open={open} autoHideDuration={null} onClose={handleClose}>
        <SaleProgress readContracts={readContracts} handleClose={handleClose} />
      </Snackbar>
    </Container>
  );
};

export default CharactersContainer;
