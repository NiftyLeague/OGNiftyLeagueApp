import React from "react";
import { Container } from "@material-ui/core";
import CharactersFilter from "./CharactersFilter";

const CharactersContainer = () => {
  return (
    <Container style={{ padding: "40px 0" }}>
      <CharactersFilter />
    </Container>
  );
};

export default CharactersContainer;
