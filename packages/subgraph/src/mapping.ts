import { BigInt, Address, log } from "@graphprotocol/graph-ts";
import {
  NiftyLeagueCharacter,
  CharacterGenerated,
  Transfer,
} from "../generated/NiftyLeagueCharacter/NiftyLeagueCharacter";
import { Character, Owner } from "../generated/schema";

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
