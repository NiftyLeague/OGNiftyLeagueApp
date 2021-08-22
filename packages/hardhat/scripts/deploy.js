/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
const fs = require('fs');
const chalk = require('chalk');
const { config, ethers, tenderly, run } = require('hardhat');
const R = require('ramda');
const { ALLOWED_COLORS } = require('../constants/allowedColors');
const { COMMUNITY_TREASURY } = require('../constants/addresses');

function calculateGasMargin(value) {
  return value.mul(ethers.BigNumber.from(10000).add(ethers.BigNumber.from(1000))).div(ethers.BigNumber.from(10000));
}

const main = async () => {
  const targetNetwork = process.env.HARDHAT_NETWORK || config.defaultNetwork;
  console.log(`\n\n 📡 Deploying to ${targetNetwork}...\n`);

  const storage = await deploy('AllowedColorsStorage');
  // eslint-disable-next-line no-restricted-syntax
  for (const [i, traits] of ALLOWED_COLORS.entries()) {
    const args = [i + 1, traits, true];
    // eslint-disable-next-line no-await-in-loop
    await storage.estimateGas.setAllowedColorsOnTribe(...args, {}).then(async estimatedGasLimit => {
      await storage.setAllowedColorsOnTribe(...args, { gasLimit: calculateGasMargin(estimatedGasLimit) });
    });
  }

  const emissionStartTimestamp = Math.floor(Date.now() / 1000);
  const ownerSupply = ethers.utils.parseEther('110000000');
  const treasurySupply = ethers.utils.parseEther('180000000');
  const nftlToken = await deploy('NFTLToken', [
    emissionStartTimestamp,
    ownerSupply,
    treasurySupply,
    COMMUNITY_TREASURY,
  ]);
  const nft = await deploy('NiftyDegen', [nftlToken.address, storage.address]);
  await nftlToken.setNFTAddress(nft.address);

  // const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!

  // If you want to send ether to an address
  /*
  const deployerWallet = ethers.provider.getSigner();
  const deployerAddress = await deployerWallet.getAddress();
  const nonce = await deployerWallet.getTransactionCount();
  await deployerWallet.sendTransaction({
    to: COMMUNITY_TREASURY_ADDRESS[targetNetwork],
    value: ethers.utils.parseEther("1"),
  });
  */

  // If you want to send an ERC-20 token to an address
  /*
  const treasuryTx = await nftlToken.methods.transfer(toAddress, amount);
  const treasuryTxRequest = {
    from: deployerAddress,
    to: COMMUNITY_TREASURY_ADDRESS[targetNetwork],
    data: treasuryTx.encodeABI(),
    nonce,
  gasPrice: parseUnits(taskArgs.gasPrice ? taskArgs.gasPrice : "1.001", "gwei").toHexString(),
  gasLimit: taskArgs.gasLimit ? taskArgs.gasLimit : 24000,
  chainId: network.config.chainId,
  };
  send(treasuryTxRequest);
  */

  // If you want to send some ETH to a contract on deploy (make your constructor payable!)
  /*
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  // If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  /*
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  if (targetNetwork !== 'localhost') {
    // If you want to verify your contract on tenderly.co
    console.log(chalk.blue('verifying on tenderly'));
    await tenderlyVerify({ contractName: 'AllowedColorsStorage', contractAddress: storage.address });
    await tenderlyVerify({ contractName: 'NFTLToken', contractAddress: nftlToken.address });
    await tenderlyVerify({ contractName: 'NiftyDegen', contractAddress: nft.address });

    // If you want to verify your contract on etherscan
    // console.log(chalk.blue("verifying on etherscan"));
    // await run("verify:verify", {
    //   address: nftlToken.address,
    //   constructorArguments: [emissionStartTimestamp, initalSupply],
    // });
    // await run("verify:verify", {
    //   address: nft.address,
    //   constructorArguments: [nftlToken.address],
    // });
  }

  console.log(
    ' 💾  Artifacts (address, abi, and args) saved to: ',
    chalk.blue(`packages/hardhat/artifacts/${targetNetwork}`),
    '\n\n',
  );
};

const deploy = async (contractName, _args = [], overrides = {}, libraries = {}) => {
  console.log(` 🛰  Deploying: ${contractName}`);

  const contractArgs = _args || [];
  const contractArtifacts = await ethers.getContractFactory(contractName, {
    libraries,
  });
  const deployed = await contractArtifacts.deploy(...contractArgs, overrides);
  const encoded = abiEncodeArgs(deployed, contractArgs);
  fs.writeFileSync(`${config.paths.artifacts}/${contractName}.address`, deployed.address);
  let extraGasInfo = '';
  if (deployed && deployed.deployTransaction) {
    const gasUsed = deployed.deployTransaction.gasLimit.mul(deployed.deployTransaction.gasPrice);
    extraGasInfo = `${ethers.utils.formatEther(gasUsed)} ETH, tx hash ${deployed.deployTransaction.hash}`;
  }

  console.log(' 📄', chalk.cyan(contractName), 'deployed to:', chalk.magenta(deployed.address));
  console.log(' ⛽', chalk.grey(extraGasInfo));

  await tenderly.persistArtifacts({
    name: contractName,
    address: deployed.address,
  });

  if (!encoded || encoded.length <= 2) return deployed;
  fs.writeFileSync(`${config.paths.artifacts}/${contractName}.args`, encoded.slice(2));
  return deployed;
};

// ------ utils -------

function send(signer, txparams) {
  return signer.sendTransaction(txparams, (error, transactionHash) => {
    if (error) {
      console.log(`Error: ${error}`);
    }
    console.log(`sendTransactionHash: ${transactionHash}`);
  });
}

// abi encodes contract arguments
// useful when you want to manually verify the contracts
// for example, on Etherscan
const abiEncodeArgs = (deployed, contractArgs) => {
  // not writing abi encoded args if this does not pass
  if (!contractArgs || !deployed || !R.hasPath(['interface', 'deploy'], deployed)) {
    return '';
  }
  const encoded = ethers.utils.defaultAbiCoder.encode(deployed.interface.deploy.inputs, contractArgs);
  return encoded;
};

// checks if it is a Solidity file
const isSolidity = fileName =>
  fileName.indexOf('.sol') >= 0 && fileName.indexOf('.swp') < 0 && fileName.indexOf('.swap') < 0;

const readArgsFile = contractName => {
  let args = [];
  try {
    const targetNetwork = process.env.HARDHAT_NETWORK || config.defaultNetwork;
    const argsFile = `./contracts/${targetNetwork}/${contractName}.args`;
    if (!fs.existsSync(argsFile)) return args;
    args = JSON.parse(fs.readFileSync(argsFile));
  } catch (e) {
    console.log(e);
  }
  return args;
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// If you want to verify on https://tenderly.co/
// eslint-disable-next-line consistent-return
const tenderlyVerify = async ({ contractName, contractAddress }) => {
  const tenderlyNetworks = ['kovan', 'goerli', 'mainnet', 'rinkeby', 'ropsten', 'matic', 'mumbai', 'xDai', 'POA'];
  const targetNetwork = process.env.HARDHAT_NETWORK || config.defaultNetwork;

  if (tenderlyNetworks.includes(targetNetwork)) {
    console.log(chalk.blue(` 📁 Attempting tenderly verification of ${contractName} on ${targetNetwork}`));

    await tenderly.persistArtifacts({
      name: contractName,
      address: contractAddress,
    });

    const verification = await tenderly.verify({
      name: contractName,
      address: contractAddress,
      network: targetNetwork,
    });

    return verification;
  }
  console.log(chalk.grey(` 🧐 Contract verification not supported on ${targetNetwork}`));
};

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
