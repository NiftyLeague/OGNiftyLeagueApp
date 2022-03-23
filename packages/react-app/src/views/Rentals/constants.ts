import {
  TRIBES,
  SKIN_COLORS,
  FUR_COLORS,
  EYE_COLORS,
  PUPIL_COLORS,
  HAIR,
  MOUTHS,
  BEARDS,
  TOPS,
  OUTERWEAR,
  PRINTS,
  BOTTOMS,
  FOOTWEAR,
  BELTS,
  HATS,
  EYEWEAR,
  PIERCINGS,
  WRISTS,
  HANDS,
  NECKWEAR,
  LEFT_ITEMS,
  RIGHT_ITEMS,
} from '../../constants/characters';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const PAGE_SIZE = 50;

export const INITIAL_FILTER_STATE = {
  tribes: [],
  skinColors: [],
  furColors: [],
  eyeColors: [],
  pupilColors: [],
  hair: [],
  mouths: [],
  beards: [],
  tops: [],
  outerwear: [],
  prints: [],
  bottoms: [],
  footwear: [],
  belts: [],
  hats: [],
  eyewear: [],
  piercings: [],
  wrists: [],
  hands: [],
  neckwear: [],
  leftItems: [],
  rightItems: [],
};

export const FILTER_STATE_MAPPING = {
  tribes: TRIBES,
  skinColors: SKIN_COLORS,
  furColors: FUR_COLORS,
  eyeColors: EYE_COLORS,
  pupilColors: PUPIL_COLORS,
  hair: HAIR,
  mouths: MOUTHS,
  beards: BEARDS,
  tops: TOPS,
  outerwear: OUTERWEAR,
  prints: PRINTS,
  bottoms: BOTTOMS,
  footwear: FOOTWEAR,
  belts: BELTS,
  hats: HATS,
  eyewear: EYEWEAR,
  piercings: PIERCINGS,
  wrists: WRISTS,
  hands: HANDS,
  neckwear: NECKWEAR,
  leftItems: LEFT_ITEMS,
  rightItems: RIGHT_ITEMS,
};
