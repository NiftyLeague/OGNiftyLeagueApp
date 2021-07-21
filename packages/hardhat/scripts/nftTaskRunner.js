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
  const tokenId = 2;
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
