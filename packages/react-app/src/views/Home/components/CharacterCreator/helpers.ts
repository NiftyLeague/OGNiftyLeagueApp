/* eslint-disable import/prefer-default-export */

export type TraitArray = [
  [Tribe: 'Tribe', trait: number],
  [SkinColor: 'Skin Color', trait: number],
  [FurColor: 'Fur Color', trait: number],
  [EyeColor: 'Eye Color', trait: number],
  [PupilColor: 'Pupil Color', trait: number],
  [Hair: 'Hair', trait: number],
  [Mouth: 'Mouth', trait: number],
  [Beard: 'Beard', trait: number],
  [Top: 'Top', trait: number],
  [Outerwear: 'Outerwear', trait: number],
  [Print: 'Print', trait: number],
  [Bottom: 'Bottom', trait: number],
  [Footwear: 'Footwear', trait: number],
  [Belt: 'Belt', trait: number],
  [Hat: 'Hat', trait: number],
  [Eyewear: 'Eyewear', trait: number],
  [Piercing: 'Piercing', trait: number],
  [Wrist: 'Wrist', trait: number],
  [Hands: 'Hands', trait: number],
  [Neckwear: 'Neckwear', trait: number],
  [LeftItem: 'Left Item', trait: number],
  [RightItem: 'Right Item', trait: number],
];

type TraitObject = {
  Tribe?: number;
  SkinColor?: number;
  FurColor?: number;
  EyeColor?: number;
  PupilColor?: number;
  Hair?: number;
  Mouth?: number;
  Beard?: number;
  Top?: number;
  Outerwear?: number;
  Print?: number;
  Bottom?: number;
  Footwear?: number;
  Belt?: number;
  Hat?: number;
  Eyewear?: number;
  Piercing?: number;
  Wrist?: number;
  Hands?: number;
  Neckwear?: number;
  LeftItem?: number;
  RightItem?: number;
};

const objectify = (array: TraitArray): TraitObject => {
  return array.reduce((p, c) => {
    const [type, traitId] = c;
    // eslint-disable-next-line no-param-reassign
    p[type.replace(' ', '')] = traitId;
    return p;
  }, {});
};

type MintableTraits = {
  character: number[];
  head: number[];
  clothing: number[];
  accessories: number[];
  items: number[];
};

export const getMintableTraits = ({ traits }: { traits: TraitArray }): MintableTraits => {
  const traitObject = objectify(traits);
  const {
    Tribe,
    SkinColor,
    FurColor,
    EyeColor,
    PupilColor,
    Hair,
    Mouth,
    Beard,
    Top,
    Outerwear,
    Print,
    Bottom,
    Footwear,
    Belt,
    Hat,
    Eyewear,
    Piercing,
    Wrist,
    Hands,
    Neckwear,
    LeftItem,
    RightItem,
  } = traitObject as { [type: string]: number };
  const character = [Tribe, SkinColor, FurColor, EyeColor, PupilColor];
  const head = [Hair, Mouth, Beard];
  const clothing = [Top, Outerwear, Print, Bottom, Footwear, Belt];
  const accessories = [Hat, Eyewear, Piercing, Wrist, Hands, Neckwear];
  const items = [LeftItem, RightItem];
  return { character, head, clothing, accessories, items };
};
