/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const COMICS_TRIBES_QUERY = gql`
  query tribesSnapshotSearch {
    owners(block: { number: 14115835 }, where: { characterCount_gt: 5 }, first: 1000) {
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

export const COMICS_OWNERS_SUM_QUERY = gql`
  query ownersSumSearch($lastId: String) {
    owners(block: { number: 14115835 }, orderBy: id, where: { characterCount_gt: 0, id_gt: $lastId }, first: 1000) {
      id
      characterCount
    }
  }
`;

export const COMICS_COMMON_QUERY = gql`
  query commonSnapshotSearch($lastId: String) {
    traitMaps(block: { number: 14115835 }, orderBy: id, where: { background: 0, id_gt: $lastId }, first: 1000) {
      character {
        id
        owner {
          id
        }
      }
    }
  }
`;

export const COMICS_RARE_QUERY = gql`
  query rareSnapshotSearch {
    traitMaps(block: { number: 14115835 }, orderBy: tokenId, where: { background: 1 }, first: 550) {
      character {
        id
        owner {
          id
        }
      }
    }
  }
`;

export const COMICS_META_QUERY = gql`
  query metaSnapshotSearch {
    traitMaps(block: { number: 14115835 }, orderBy: tokenId, where: { background: 2 }, first: 300) {
      character {
        id
        owner {
          id
        }
      }
    }
  }
`;

export const COMICS_LEGENDARY_QUERY = gql`
  query legendarySnapshotSearch {
    traitMaps(block: { number: 14115835 }, orderBy: tokenId, where: { background: 3 }, first: 105) {
      character {
        id
        owner {
          id
        }
      }
    }
  }
`;
