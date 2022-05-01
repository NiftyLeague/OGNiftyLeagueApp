import { gql } from '@apollo/client';

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
`;

export const ID_SEARCH_QUERY = gql`
  query CharacterByID($search: String) {
    characters(where: { id: $search }) {
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
`;

export const NAME_SEARCH_QUERY = gql`
  query CharactersLikeName($search: String) {
    characters(orderBy: createdAt, where: { name_contains: $search }) {
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
`;

export const FILTER_SEARCH_QUERY = gql`
  query CharactersFiltered(
    $tribes: [Int]
    $skinColors: [Int]
    $furColors: [Int]
    $eyeColors: [Int]
    $pupilColors: [Int]
    $hair: [Int]
    $mouths: [Int]
    $beards: [Int]
    $tops: [Int]
    $outerwear: [Int]
    $prints: [Int]
    $bottoms: [Int]
    $footwear: [Int]
    $belts: [Int]
    $hats: [Int]
    $eyewear: [Int]
    $piercings: [Int]
    $wrists: [Int]
    $hands: [Int]
    $neckwear: [Int]
    $leftItems: [Int]
    $rightItems: [Int]
  ) {
    traitMaps(
      orderBy: tokenId
      where: {
        tribe_in: $tribes
        skinColor_in: $skinColors
        furColor_in: $furColors
        eyeColor_in: $eyeColors
        pupilColor_in: $pupilColors
        hair_in: $hair
        mouth_in: $mouths
        beard_in: $beards
        top_in: $tops
        outerwear_in: $outerwear
        print_in: $prints
        bottom_in: $bottoms
        footwear_in: $footwear
        belt_in: $belts
        hat_in: $hats
        eyewear_in: $eyewear
        piercing_in: $piercings
        wrist_in: $wrists
        hands_in: $hands
        neckwear_in: $neckwear
        leftItem_in: $leftItems
        rightItem_in: $rightItems
      }
    ) {
      tokenId
      character {
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
