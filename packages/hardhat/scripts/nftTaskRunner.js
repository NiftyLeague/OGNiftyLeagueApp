/* eslint-disable no-use-before-define */
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
  const minty = await MakeMinty();
  const tokenId = 4;
  // await getNFT(minty, tokenId);
  await generateNFT(minty, tokenId);
}

async function generateNFT(minty, tokenId) {
  const nft = await minty.generateNFT(tokenId);

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

async function pinNFTData(minty, tokenId) {
  const { assetURI, metadataURI } = await minty.pinTokenData(tokenId);
  console.log(`🌿 Pinned all data for token id ${chalk.green(tokenId)}`);
  console.log(`Asset URI: ${assetURI} | Metadata URI: ${metadataURI}`);
}

function alignOutput(labelValuePairs) {
  const maxLabelLength = labelValuePairs.map(([l, _]) => l.length).reduce((len, max) => (len > max ? len : max));
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
