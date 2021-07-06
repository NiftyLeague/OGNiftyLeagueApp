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

export const INITIAL_FILTER_STATE = {
  tribes: [],
  skinColor: [],
  furColor: [],
  eyeColor: [],
  pupilColor: [],
  hair: [],
  mouth: [],
  beard: [],
  facemark: [],
  misc: [],
  top: [],
  outerwear: [],
  print: [],
  bottom: [],
  footwear: [],
  belt: [],
  hat: [],
  eyewear: [],
  piercings: [],
  wrists: [],
  hands: [],
  neckwear: [],
  leftItem: [],
  rightItem: [],
};

export const TRIBES = ["Aliens", "Apes", "Cats", "Dogs", "Frogs", "Humans"];

export const NAMES = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
