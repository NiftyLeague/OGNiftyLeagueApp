import { BigInt, Address, log } from "@graphprotocol/graph-ts";
import {
  NiftyLeagueCharacter,
  CharacterGenerated,
  Transfer,
} from "../generated/NiftyLeagueCharacter/NiftyLeagueCharacter";
import { YourContract, SetPurpose } from "../generated/YourContract/YourContract";
import { Character, Owner, Purpose, Sender } from "../generated/schema";

export function handleSetPurpose(event: SetPurpose): void {
  let senderString = event.params.sender.toHexString();
  let sender = Sender.load(senderString);

  if (sender == null) {
    sender = new Sender(senderString);
    sender.address = event.params.sender;
    sender.createdAt = event.block.timestamp;
    sender.purposeCount = BigInt.fromI32(1);
  } else {
    sender.purposeCount = sender.purposeCount.plus(BigInt.fromI32(1));
  }

  let purpose = new Purpose(event.transaction.hash.toHex() + "-" + event.logIndex.toString());

  purpose.purpose = event.params.purpose;
  purpose.sender = senderString;
  purpose.createdAt = event.block.timestamp;
  purpose.transactionHash = event.transaction.hash.toHex();

  purpose.save();
  sender.save();
}

export function handleCharacterGenerated(event: CharacterGenerated): void {
  let ownerString = event.params.sender.toHexString();
  log.info("Message to be displayed: {}, {}", [ownerString, event.params.tokenId.toString()]);
  let owner = Owner.load(ownerString);

  if (owner == null) {
    owner = new Owner(ownerString);
    owner.address = event.params.sender;
    owner.createdAt = event.block.timestamp;
    owner.characterCount = BigInt.fromI32(1);
  } else {
    owner.characterCount = owner.characterCount.plus(BigInt.fromI32(1));
  }

  // let character = new Character(event.transaction.hash.toHex() + "-" + event.logIndex.toString());

  let character = new Character(event.params.tokenId.toString());

  character.traits = event.params.traits;
  character.name = "test";
  character.owner = ownerString;
  character.createdAt = event.block.timestamp;
  character.transactionHash = event.transaction.hash.toHex();

  character.save();
  owner.save();
}

export function handleTransfer(event: Transfer): void {
  // Bind the contract to the address that emitted the event
  let contract = NiftyLeagueCharacter.bind(event.address);
  let fromString = event.params.from.toHexString();
  let toString = event.params.to.toHexString();

  // Access state variables and functions by calling them
  let totalSupply = contract.totalSupply();
  log.info("Message to be displayed: {}, {}, {}, {}", [
    fromString,
    toString,
    event.params.tokenId.toString(),
    totalSupply.toString(),
  ]);
}
