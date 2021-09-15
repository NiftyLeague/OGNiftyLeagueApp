export interface Character {
  id: string;
  tokenId: BigInt;
  owner: Owner;
  createdAt: BigInt;
  name: string;
  transactionHash: string;
  traits: {
    tribe: number;
    skinColor: number;
    furColor: number;
    eyeColor: number;
    pupilColor: number;
    hair: number;
    mouth: number;
    beard: number;
    top: number;
    outerwear: number;
    print: number;
    bottom: number;
    footwear: number;
    belt: number;
    hat: number;
    eyewear: number;
    piercing: number;
    wrist: number;
    hands: number;
    neckwear: number;
    leftItem: number;
    rightItem: number;
  };
}

export interface Contract {
  id: string;
  address: string;
  totalSupply: BigInt;
  nftPrice: BigInt;
  removedTraits: number[];
}

export interface Characters {
  characters: Character[];
  contracts: Contract[];
}

export interface Owner {
  id: string;
  address: string;
  createdAt: BigInt;
  characters: Character[];
  characterCount: number;
}

export interface TraitMap {
  id: string;
  tokenId: BigInt;
  character: Character;
  tribe: number;
  skinColor: number;
  furColor: number;
  eyeColor: number;
  pupilColor: number;
  hair: number;
  mouth: number;
  beard: number;
  top: number;
  outerwear: number;
  print: number;
  bottom: number;
  footwear: number;
  belt: number;
  hat: number;
  eyewear: number;
  piercing: number;
  wrists: number;
  hands: number;
  neckwear: number;
  leftItem: number;
  rightItem: number;
}

export interface TraitMaps {
  traitMaps: TraitMap[];
}
