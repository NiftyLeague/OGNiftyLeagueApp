import { gql } from "@apollo/client";

export const DEFAULT_QUERY = gql`
  query defaultCharactersSearch($size: Int!, $lastID: Int) {
    contracts {
      totalSupply
    }
    characters(orderBy: createdAt, first: $size, where: { tokenId_gt: $lastID }) {
      id
      tokenId
      createdAt
      name
      nameHistory
      traits {
        tribe
        skinColor
        furColor
        eyeColor
        pupilColor
        hair
        mouth
        beard
        facemark
        misc
        top
        outerwear
        print
        bottom
        footwear
        belt
        hat
        eyewear
        piercings
        wrists
        hands
        neckwear
        leftItem
        rightItem
      }
    }
  }
`;

export const ID_SEARCH_QUERY = gql`
  query CharacterByID($search: String) {
    characters(where: { id: $search }) {
      id
      createdAt
      name
      nameHistory
      traits {
        tribe
        skinColor
        furColor
        eyeColor
        pupilColor
        hair
        mouth
        beard
        facemark
        misc
        top
        outerwear
        print
        bottom
        footwear
        belt
        hat
        eyewear
        piercings
        wrists
        hands
        neckwear
        leftItem
        rightItem
      }
    }
  }
`;

export const NAME_SEARCH_QUERY = gql`
  query CharactersLikeName($search: String) {
    characters(orderBy: createdAt, where: { name_contains: $search }) {
      id
      createdAt
      name
      nameHistory
      traits {
        tribe
        skinColor
        furColor
        eyeColor
        pupilColor
        hair
        mouth
        beard
        facemark
        misc
        top
        outerwear
        print
        bottom
        footwear
        belt
        hat
        eyewear
        piercings
        wrists
        hands
        neckwear
        leftItem
        rightItem
      }
    }
  }
`;

export const FILTER_SEARCH_QUERY = gql`
  query CharactersFiltered($search: String) {
    characters(orderBy: createdAt, where: { name_contains: $search }) {
      id
      createdAt
      name
      nameHistory
      traits {
        tribe
        skinColor
        furColor
        eyeColor
        pupilColor
        hair
        mouth
        beard
        facemark
        misc
        top
        outerwear
        print
        bottom
        footwear
        belt
        hat
        eyewear
        piercings
        wrists
        hands
        neckwear
        leftItem
        rightItem
      }
    }
  }
`;
