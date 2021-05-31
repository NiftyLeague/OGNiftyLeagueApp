#!/usr/bin/env node
/* eslint-disable no-use-before-define */

// This file contains the main entry point for the command line `minty` app, and the command line option parsing code.
// See minty.js for the core functionality.

const path = require("path");
const { Command } = require("commander");
const chalk = require("chalk");
const colorize = require("json-colorizer");
const { MakeMinty } = require("./minty");

const colorizeOptions = {
  pretty: true,
  colors: {
    STRING_KEY: "blue.bold",
    STRING_LITERAL: "green",
  },
};

async function main() {
  const program = new Command();

  // commands
  program
    .command("mint")
    .description("create a new NFT from an image file")
    .option("-ch, --character <character>", "Character base traits.")
    .option("-h, --head <head>", "Character head traits.")
    .option("-c, --clothing <clothing>", "Character clothing options.")
    .option("-a, --accessories <accessories>", "Character accessories.")
    .option("-i, --items <items>", "Character items.")
    .action(createNFT);

  program
    .command("show <token-id>")
    .description("get info about an NFT using its token ID")
    .option("-c, --creation-info", "include the creator address and block number the NFT was minted")
    .action(getNFT);

  program.command("transfer <token-id> <to-address>").description("transfer an NFT to a new owner").action(transferNFT);

  program
    .command("pin <token-id>")
    .description('"pin" the data for an NFT to a remote IPFS Pinning Service')
    .action(pinNFTData);

  // The hardhat and getconfig modules both expect to be running from the root directory of the project,
  // so we change the current directory to the parent dir of this script file to make things work
  // even if you call minty from elsewhere
  const rootDir = path.join(__dirname, "..");
  process.chdir(rootDir);

  await program.parseAsync(process.argv);
}

// ---- command action functions

async function createNFT(options) {
  const minty = await MakeMinty();
  const nft = await minty.createNFT(options);
  console.log("🌿 Minted a new NFT: ");

  alignOutput([
    ["Token ID:", chalk.green(nft.tokenId)],
    ["Metadata Address:", chalk.blue(nft.metadataURI)],
    ["Metadata Gateway URL:", chalk.blue(nft.metadataGatewayURL)],
    ["Asset Address:", chalk.blue(nft.assetURI)],
    ["Asset Gateway URL:", chalk.blue(nft.assetGatewayURL)],
  ]);
  console.log("NFT Metadata:");
  console.log(colorize(JSON.stringify(nft.metadata), colorizeOptions));
}

async function getNFT(tokenId, options) {
  const { creationInfo: fetchCreationInfo } = options;
  const minty = await MakeMinty();
  const nft = await minty.getNFT(tokenId, { fetchCreationInfo });

  const output = [
    ["Token ID:", chalk.green(nft.tokenId)],
    ["Owner Address:", chalk.yellow(nft.ownerAddress)],
  ];
  if (nft.creationInfo) {
    output.push(["Creator Address:", chalk.yellow(nft.creationInfo.creatorAddress)]);
    output.push(["Block Number:", nft.creationInfo.blockNumber]);
  }
  output.push(["Metadata Address:", chalk.blue(nft.metadataURI)]);
  output.push(["Metadata Gateway URL:", chalk.blue(nft.metadataGatewayURL)]);
  output.push(["Asset Address:", chalk.blue(nft.assetURI)]);
  output.push(["Asset Gateway URL:", chalk.blue(nft.assetGatewayURL)]);
  alignOutput(output);

  console.log("NFT Metadata:");
  console.log(colorize(JSON.stringify(nft.metadata), colorizeOptions));
}

async function transferNFT(tokenId, toAddress) {
  const minty = await MakeMinty();

  await minty.transferToken(tokenId, toAddress);
  console.log(`🌿 Transferred token ${chalk.green(tokenId)} to ${chalk.yellow(toAddress)}`);
}

async function pinNFTData(tokenId) {
  const minty = await MakeMinty();
  const { assetURI, metadataURI } = await minty.pinTokenData(tokenId);
  console.log(`🌿 Pinned all data for token id ${chalk.green(tokenId)}`);
  console.log(`Asset URI: ${assetURI} | Metadata URI: ${metadataURI}`);
}

// ---- helpers

function alignOutput(labelValuePairs) {
  const maxLabelLength = labelValuePairs.map(([l, _]) => l.length).reduce((len, max) => (len > max ? len : max));
  // eslint-disable-next-line no-restricted-syntax
  for (const [label, value] of labelValuePairs) {
    console.log(label.padEnd(maxLabelLength + 1), value);
  }
}

// ---- main entry point when running as a script

// make sure we catch all errors
main()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
