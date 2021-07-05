const fs = require("fs");
const { ethers } = require("hardhat");
const config = require("getconfig");
const metadataTemple = require("../constants/metadataTemplate");
const TRAIT_TYPES = require("../constants/traitTypes");
const TRAIT_NAME_MAP = require("../constants/traitNameMap");

async function main() {
  const targetNetwork = process.env.HARDHAT_NETWORK || config.defaultNetwork;
  const contract = await ethers.getContractAt(
    config.nftContractName,
    fs.readFileSync(`./artifacts/${targetNetwork}/${config.nftContractName}.address`).toString(),
  );
  await contract.deployed();
  const length = await contract.totalSupply();
  let index = 1;
  /* eslint-disable no-await-in-loop */
  while (index <= length) {
    const characterMetadata = { ...metadataTemple };
    const characterTraits = await contract.getCharacterTraits(index);
    characterMetadata.name = (await contract.getName(index)) || `${TRAIT_NAME_MAP[characterTraits[0]]} #${index}`;
    const filename = `metadata/${characterMetadata.name.toLowerCase().replace(/\s/g, "-").replace("#", "")}.json`;
    if (fs.existsSync(filename)) {
      console.log(`File already exists for token ID ${index}`);
    } else {
      characterTraits.forEach((trait, i) => {
        if (trait !== 0) {
          console.log(TRAIT_TYPES[i], trait);
          characterMetadata.attributes.push({ trait_type: TRAIT_TYPES[i], value: TRAIT_NAME_MAP[trait] });
        }
      });
      const data = JSON.stringify(characterMetadata);
      fs.writeFileSync(filename, data);
      console.log(`File wrote for token ID ${index}`);
    }
    index += 1;
  }
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
