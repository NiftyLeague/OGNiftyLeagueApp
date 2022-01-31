/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const COMICS_TRIBES_QUERY = gql`
  query comicsSnapshotSearch {
    owners(block: { number: 14112400 }, where: { characterCount_gt: 5 }, first: 1000) {
      id
      address
      characterCount
      characters(first: 500) {
        id
        traits {
          tribe
        }
      }
    }
  }
`;
