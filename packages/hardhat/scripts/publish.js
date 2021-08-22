const fs = require('fs');
const chalk = require('chalk');
const { config, ethers } = require('hardhat');

const publishDir = '../react-app/src/contracts';
const graphDir = '../subgraph';

function publishContract(contractName, startBlock) {
  console.log(' 💽 Publishing', chalk.cyan(contractName), 'to', chalk.gray(publishDir));
  try {
    const targetNetwork = process.env.HARDHAT_NETWORK || config.defaultNetwork;
    let contract = fs
      .readFileSync(`${config.paths.artifacts}/contracts/${contractName}.sol/${contractName}.json`)
      .toString();
    const address = fs.readFileSync(`${config.paths.artifacts}/${contractName}.address`).toString();
    contract = JSON.parse(contract);
    const graphConfigPath = `${graphDir}/config/config${targetNetwork === 'localhost' ? '.dev' : ''}.json`;
    let graphConfig;
    try {
      if (fs.existsSync(graphConfigPath)) {
        graphConfig = fs.readFileSync(graphConfigPath).toString();
      } else {
        graphConfig = '{}';
      }
    } catch (e) {
      console.log(e);
    }

    graphConfig = JSON.parse(graphConfig);
    graphConfig[contractName + 'Address'] = address;
    graphConfig.network = targetNetwork;
    graphConfig.startBlock = startBlock;
    fs.writeFileSync(`${publishDir}/${targetNetwork}/${contractName}.address.js`, `module.exports = "${address}";`);
    fs.writeFileSync(`${publishDir}/${targetNetwork}/${contractName}.abi.json`, JSON.stringify(contract.abi, null, 2));
    fs.writeFileSync(
      `${publishDir}/${targetNetwork}/${contractName}.bytecode.js`,
      `module.exports = "${contract.bytecode}";`,
    );

    const folderPath = graphConfigPath.replace(`config${targetNetwork === 'localhost' ? '.dev' : ''}.json`, '');
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    fs.writeFileSync(graphConfigPath, JSON.stringify(graphConfig, null, 2));
    fs.writeFileSync(`${graphDir}/abis/${targetNetwork}/${contractName}.json`, JSON.stringify(contract.abi, null, 2));

    console.log(' 📠 Published ' + chalk.green(contractName) + ' to the frontend.');

    return true;
  } catch (e) {
    if (e.toString().indexOf('no such file or directory') >= 0) {
      console.log(chalk.yellow(" ⚠️  Can't publish " + contractName + ' yet (make sure it getting deployed).'));
      return false;
    }
    console.log(e);
    return false;
  }
}

async function main() {
  const targetNetwork = process.env.HARDHAT_NETWORK || config.defaultNetwork;
  if (fs.existsSync(`${publishDir}/${targetNetwork}`)) {
    fs.rmdirSync(`${publishDir}/${targetNetwork}`, { recursive: true });
  }
  if (!fs.existsSync(`${graphDir}/abis`)) fs.mkdirSync(`${graphDir}/abis`);
  if (fs.existsSync(`${graphDir}/abis/${targetNetwork}`)) {
    fs.rmdirSync(`${graphDir}/abis/${targetNetwork}`, { recursive: true });
  }
  fs.mkdirSync(`${publishDir}/${targetNetwork}`);
  fs.mkdirSync(`${graphDir}/abis/${targetNetwork}`);

  const finalContractList = [];
  const startBlock = await ethers.provider.getBlockNumber();
  fs.readdirSync(config.paths.sources).forEach(file => {
    if (file.indexOf('.sol') >= 0) {
      const contractName = file.replace('.sol', '');
      // Add contract to list if publishing is successful
      if (publishContract(contractName, startBlock)) {
        finalContractList.push(contractName);
      }
    }
  });
  fs.writeFileSync(
    `${publishDir}/${targetNetwork}/contracts.js`,
    `module.exports = ${JSON.stringify(finalContractList)};`,
  );
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
