import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import CharactersFilter from "./CharactersFilter";
import CharacterCard from "./CharacterCard";

const CharactersContainer = () => {
  const [characters, setCharcters] = useState([
    { id: 1, created: 1624111342, name: "Degen Ape", tribe: "Ape", skinColor: "Blue" },
    { id: 2, created: 1624123342, name: "Happy frog", tribe: "Frog", skinColor: "Blue" },
    { id: 3, created: 1624135342, name: "Yoko", tribe: "Cat", skinColor: "Red" },
    { id: 4, created: 1624141342, name: "Bruce", tribe: "Human", skinColor: "White" },
    { id: 5, created: 1624141342, name: "Ape 5", tribe: "Ape", skinColor: "Black" },
  ]);
  return (
    <Container style={{ padding: "40px 0" }}>
      <CharactersFilter />
      <Grid container spacing={2} style={{ flexGrow: 1, margin: "8px 0" }}>
        {characters.map(character => (
          <Grid item xs={6} sm={4} md={3}>
            <CharacterCard character={character} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CharactersContainer;
