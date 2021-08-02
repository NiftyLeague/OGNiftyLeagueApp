/* eslint-disable no-use-before-define, no-await-in-loop */
const fs = require("fs");
const hardhat = require("hardhat");
const config = require("getconfig");
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
  const targetNetwork = process.env.HARDHAT_NETWORK || hardhat.config.defaultNetwork;
  const contract = await hardhat.ethers.getContractAt(
    config.nftContractName,
    fs.readFileSync(`./artifacts/${targetNetwork}/${config.nftContractName}.address`).toString(),
  );
  await contract.deployed();

  const baseDir = `${config.ipfsBaseDirName}/${targetNetwork}`;
  if (!fs.existsSync(`${baseDir}/images`)) fs.mkdirSync(`${baseDir}/images`);
  if (!fs.existsSync(`${baseDir}/metadata`)) fs.mkdirSync(`${baseDir}/metadata`);

  const minty = await MakeMinty();
  const tokenIds = [1, 2];
  let lastestMetadataCID;
  // eslint-disable-next-line no-restricted-syntax
  for (const tokenId of tokenIds) {
    // await getNFT(minty, tokenId);
    const { metadata, metadataURI } = await generateNFT(minty, tokenId);
    lastestMetadataCID = await pinNFTData(minty, tokenId, metadata, metadataURI);
  }
  await updateIPNS(minty, lastestMetadataCID);
}

async function generateNFT(minty, tokenId) {
  const nft = await minty.generateNFT(tokenId);

  console.log("");
  alignOutput([
    ["Token ID:", chalk.green(nft.tokenId)],
    ["Metadata Address:", chalk.blue(nft.metadataURI)],
    ["Metadata Gateway URL:", chalk.blue(nft.metadataGatewayURL)],
    ["Asset Address:", chalk.blue(nft.assetURI)],
    ["Asset Gateway URL:", chalk.blue(nft.assetGatewayURL)],
  ]);
  console.log("NFT Metadata:");
  console.log(colorize(JSON.stringify(nft.metadata), colorizeOptions));
  return { metadata: nft.metadata, metadataURI: nft.metadataURI };
}

// eslint-disable-next-line no-unused-vars
async function getNFT(minty, tokenId, options = {}) {
  const nft = await minty.getNFT(tokenId, options);

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

async function pinNFTData(minty, tokenId, metadata, metadataURI) {
  console.log("");
  const { pinnedMetadataCID } = await minty.pinTokenData(tokenId, metadata, metadataURI);
  console.log(`🌿 Pinned all data for token id ${chalk.green(tokenId)}`);
  return pinnedMetadataCID;
}

async function updateIPNS(minty, pinnedMetadataCID) {
  console.log("");
  const { name, value, gatewayURL } = await minty.publishToIPNS(pinnedMetadataCID);
  console.log(`Updated IPNS (${name}) to point to ${value}`);
  console.log(`Viewable at ${gatewayURL}`);
}

function alignOutput(labelValuePairs) {
  const maxLabelLength = labelValuePairs.map(([l]) => l.length).reduce((len, max) => (len > max ? len : max));
  // eslint-disable-next-line no-restricted-syntax
  for (const [label, value] of labelValuePairs) {
    console.log(label.padEnd(maxLabelLength + 1), value);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
