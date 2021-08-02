/* eslint-disable import/prefer-default-export */
const objectify = (array = []) => {
  return array.reduce((p, c) => {
    // eslint-disable-next-line prefer-destructuring, no-param-reassign
    p[c[0].replace(" ", "")] = c[1];
    return p;
  }, {});
};

export const getMintableTraits = ({ traits }) => {
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
  } = traitObject;
  const character = [Tribe, SkinColor, FurColor, EyeColor, PupilColor];
  const head = [Hair, Mouth, Beard];
  const clothing = [Top, Outerwear, Print, Bottom, Footwear, Belt];
  const accessories = [Hat, Eyewear, Piercing, Wrist, Hands, Neckwear];
  const items = [LeftItem, RightItem];
  return { character, head, clothing, accessories, items };
};
