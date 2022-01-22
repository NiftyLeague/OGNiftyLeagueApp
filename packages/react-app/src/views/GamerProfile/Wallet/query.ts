/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const OWNER_QUERY = gql`
  query addressCharactersSearch($address: ID!) {
    owner(id: $address) {
      id
      address
      createdAt
      characterCount
      characters(first: 500) {
        id
        name
        nameHistory
        createdAt
        transactionHash
        traits {
          tribe
          skinColor
          furColor
          eyeColor
          pupilColor
          hair
          mouth
          beard
          top
          outerwear
          print
          bottom
          footwear
          belt
          hat
          eyewear
          piercing
          wrist
          hands
          neckwear
          leftItem
          rightItem
        }
      }
    }
  }
`;
