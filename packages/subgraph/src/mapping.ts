import { Address, BigInt, log } from "@graphprotocol/graph-ts";
import { NiftyDegen, Transfer, NameUpdated } from "../generated/NiftyDegen/NiftyDegen";
import { Character, Contract, Owner, Traits } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
  // Bind the contract to the address that emitted the event
  let contract = NiftyDegen.bind(event.address);
  let fromString = event.params.from.toHexString();
  let toString = event.params.to.toHexString();
  let tokenId = event.params.tokenId.toString();
  log.info("TransferEvent tokenId: {} from: {} to: {}", [tokenId, fromString, toString]);

  let previousOwner = Owner.load(fromString);
  let newOwner = Owner.load(toString);

  if (previousOwner !== null) {
    previousOwner.characterCount = previousOwner.characterCount - 1;
    previousOwner.save();
  }

  if (newOwner === null) {
    newOwner = new Owner(toString);
    newOwner.address = event.params.to;
    newOwner.createdAt = event.block.timestamp;
    newOwner.characterCount = 1;
  } else {
    newOwner.characterCount = newOwner.characterCount + 1;
  }

  let character = Character.load(tokenId);
  let traits = Traits.load(tokenId);

  if (character === null) {
    character = new Character(tokenId);
    character.tokenId = event.params.tokenId;
    character.name = contract.getName(event.params.tokenId);
    character.owner = toString;
    character.createdAt = event.block.timestamp;
    character.transactionHash = event.transaction.hash.toHex();
    traits = new Traits(tokenId);
    let traitList = contract.getCharacterTraits(event.params.tokenId);
    traits.tribe = traitList.tribe;
    traits.skinColor = traitList.skinColor;
    traits.furColor = traitList.furColor;
    traits.eyeColor = traitList.eyeColor;
    traits.pupilColor = traitList.pupilColor;
    traits.hair = traitList.hair;
    traits.mouth = traitList.mouth;
    traits.beard = traitList.beard;
    traits.facemark = traitList.facemark;
    traits.misc = traitList.misc;
    traits.top = traitList.top;
    traits.outerwear = traitList.outerwear;
    traits.print = traitList.print;
    traits.bottom = traitList.bottom;
    traits.footwear = traitList.footwear;
    traits.belt = traitList.belt;
    traits.hat = traitList.hat;
    traits.eyewear = traitList.eyewear;
    traits.piercings = traitList.piercings;
    traits.wrists = traitList.wrists;
    traits.hands = traitList.hands;
    traits.neckwear = traitList.neckwear;
    traits.leftItem = traitList.leftItem;
    traits.rightItem = traitList.rightItem;
    character.traits = tokenId;
  } else {
    character.owner = toString;
  }

  let contractEntity = Contract.load(event.address.toHexString());
  if (contractEntity === null) contractEntity = new Contract(event.address.toHexString());
  contractEntity.address = event.address;
  contractEntity.totalSupply = contract.totalSupply();

  newOwner.save();
  traits.save();
  character.save();
  contractEntity.save();
}

export function handleCharacterNameChange(event: NameUpdated): void {
  let previousName = event.params.previousName;
  let newName = event.params.newName;
  let tokenId = event.params.tokenId.toString();
  log.info("NameUpdated tokenId: {} from: {} to: {}", [tokenId, previousName, newName]);

  let character = Character.load(tokenId);
  character.name = newName;
  let nameHistory = character.nameHistory;
  nameHistory.push(previousName);
  character.nameHistory = nameHistory;
  character.save();
}
