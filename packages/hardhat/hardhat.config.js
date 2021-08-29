/* eslint-disable no-undef */
/* eslint-disable global-require */
require('dotenv').config();
const fs = require('fs');

require('@typechain/hardhat');
require('@nomiclabs/hardhat-waffle');
require('@tenderly/hardhat-tenderly');
require('@nomiclabs/hardhat-etherscan');

/*
      📡 This is where you configure your deploy configuration

      check out `packages/scripts/deploy.js` to customize your deployment

      out of the box it will auto deploy anything in the `contracts` folder and named *.sol
      plus it will use *.args for constructor args
*/

// Select the network you want to deploy to here:
const defaultNetwork = process.env.HARDHAT_NETWORK;

function getMnemonic() {
  try {
    return fs.readFileSync('./mnemonic.txt').toString().trim();
  } catch (e) {
    if (defaultNetwork !== 'localhost') {
      console.log(
        '☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn generate` and then `yarn account`.',
      );
    }
  }
  return '';
}

module.exports = {
  defaultNetwork,
  networks: {
    localhost: {
      url: 'http://localhost:8545',
      // Remove accounts if you want to use account 0 of the hardhat node to deploy
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    matic: {
      url: 'https://rpc-mainnet.maticvigil.com/',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.7',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  etherscan: {
    // Your API key for https://etherscan.io/
    apiKey: process.env.ETHERSCAN_KEY,
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: `./cache/${defaultNetwork}`,
    artifacts: `./artifacts/${defaultNetwork}`,
  },
  typechain: {
    outDir: '../react-app/src/@types/contracts',
    target: 'ethers-v5',
    externalArtifacts: [
      'externalArtifacts/*.json',
      `artifacts/${defaultNetwork}/@openzeppelin/**/!(*.dbg)*.json`,
      `artifacts/${defaultNetwork}/contracts/**/!(*.dbg)*.json`,
    ],
  },
};

const DEBUG = process.env.NODE_ENV === 'development';

function debug(text) {
  if (DEBUG) console.log(text);
}

task('wallet', 'Create a wallet (pk) link', async (_, { ethers }) => {
  const randomWallet = ethers.Wallet.createRandom();
  const privateKey = randomWallet._signingKey().privateKey;
  console.log('🔐 WALLET Generated as ' + randomWallet.address + '');
  console.log('🔗 http://localhost:3000/pk#' + privateKey);
});

task('fundedwallet', 'Create a wallet (pk) link and fund it with deployer?')
  .addOptionalParam('amount', 'Amount of ETH to send to wallet after generating')
  .addOptionalParam('url', 'URL to add pk to')
  .setAction(async (taskArgs, { ethers }) => {
    const randomWallet = ethers.Wallet.createRandom();
    const privateKey = randomWallet._signingKey().privateKey;
    console.log('🔐 WALLET Generated as ' + randomWallet.address + '');
    const url = taskArgs.url ? taskArgs.url : 'http://localhost:3000';

    let localDeployerMnemonic;
    try {
      localDeployerMnemonic = fs.readFileSync('./mnemonic.txt');
      localDeployerMnemonic = localDeployerMnemonic.toString().trim();
    } catch (e) {
      /* do nothing - this file isn't always there */
    }

    const amount = taskArgs.amount ? taskArgs.amount : '0.01';
    const tx = {
      to: randomWallet.address,
      value: ethers.utils.parseEther(amount),
    };

    // SEND USING LOCAL DEPLOYER MNEMONIC IF THERE IS ONE
    // IF NOT SEND USING LOCAL HARDHAT NODE:
    if (localDeployerMnemonic) {
      let deployerWallet = new ethers.Wallet.fromMnemonic(localDeployerMnemonic);
      deployerWallet = deployerWallet.connect(ethers.provider);
      console.log('💵 Sending ' + amount + ' ETH to ' + randomWallet.address + ' using deployer account');
      await deployerWallet.sendTransaction(tx);
      console.log('\n' + url + '/pk#' + privateKey + '\n');
      return;
    }
    console.log('💵 Sending ' + amount + ' ETH to ' + randomWallet.address + ' using local node');
    console.log('\n' + url + '/pk#' + privateKey + '\n');
    return send(ethers.provider.getSigner(), tx);
  });

task('generate', 'Create a mnemonic for builder deploys', async () => {
  const bip39 = require('bip39');
  const hdkey = require('ethereumjs-wallet/hdkey');
  const mnemonic = bip39.generateMnemonic();
  if (DEBUG) console.log('mnemonic', mnemonic);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  if (DEBUG) console.log('seed', seed);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const walletHDpath = "m/44'/60'/0'/0/";
  const accountIndex = 0;
  const fullPath = walletHDpath + accountIndex;
  if (DEBUG) console.log('fullPath', fullPath);
  const wallet = hdwallet.derivePath(fullPath).getWallet();
  const privateKey = '0x' + wallet._privKey.toString('hex');
  if (DEBUG) console.log('privateKey', privateKey);
  const EthUtil = require('ethereumjs-util');
  const address = '0x' + EthUtil.privateToAddress(wallet._privKey).toString('hex');
  console.log('🔐 Account Generated as ' + address + ' and set as mnemonic in packages/hardhat');
  console.log("💬 Use 'yarn account' to get more information about the deployment account.");

  fs.writeFileSync('./' + address + '.txt', mnemonic.toString());
  fs.writeFileSync('./mnemonic.txt', mnemonic.toString());
});

task('account', 'Get balance informations for the deployment account.', async (_, { config, ethers }) => {
  const hdkey = require('ethereumjs-wallet/hdkey');
  const bip39 = require('bip39');
  const mnemonic = fs.readFileSync('./mnemonic.txt').toString().trim();
  if (DEBUG) console.log('mnemonic', mnemonic);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  if (DEBUG) console.log('seed', seed);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const walletHDpath = "m/44'/60'/0'/0/";
  const accountIndex = 0;
  const fullPath = walletHDpath + accountIndex;
  if (DEBUG) console.log('fullPath', fullPath);
  const wallet = hdwallet.derivePath(fullPath).getWallet();
  const privateKey = '0x' + wallet._privKey.toString('hex');
  if (DEBUG) console.log('privateKey', privateKey);
  const EthUtil = require('ethereumjs-util');
  const address = '0x' + EthUtil.privateToAddress(wallet._privKey).toString('hex');

  const qrcode = require('qrcode-terminal');
  qrcode.generate(address);
  console.log('‍📬 Deployer Account is ' + address);
  // eslint-disable-next-line no-restricted-syntax
  for (const n of config.networks) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(config.networks[n].url);
      // eslint-disable-next-line no-await-in-loop
      const balance = await provider.getBalance(address);
      console.log(' -- ' + n + ' --  -- -- 📡 ');
      console.log('   balance: ' + ethers.utils.formatEther(balance));
      // eslint-disable-next-line no-await-in-loop
      console.log('   nonce: ' + (await provider.getTransactionCount(address)));
    } catch (e) {
      if (DEBUG) {
        console.log(e);
      }
    }
  }
});

async function addr(ethers, address) {
  if (ethers.utils.isAddress(address)) {
    return ethers.utils.getAddress(address);
  }
  const accounts = await ethers.provider.listAccounts();
  if (accounts[address] !== undefined) {
    return accounts[address];
  }
  throw new Error(`Could not normalize address: ${address}`);
}

task('accounts', 'Prints the list of accounts', async (_, { ethers }) => {
  const accounts = await ethers.provider.listAccounts();
  accounts.forEach(account => console.log(account));
});

task('blockNumber', 'Prints the block number', async (_, { ethers }) => {
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log(blockNumber);
});

task('balance', "Prints an account's balance")
  .addPositionalParam('account', "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(await addr(ethers, taskArgs.account));
    console.log(ethers.utils.formatUnits(balance, 'ether'), 'ETH');
  });

function send(signer, txparams) {
  return signer.sendTransaction(txparams, (error, transactionHash) => {
    if (error) {
      debug(`Error: ${error}`);
    }
    debug(`transactionHash: ${transactionHash}`);
    // checkForReceipt(2, params, transactionHash, resolve)
  });
}

task('send', 'Send ETH')
  .addParam('from', 'From address or account index')
  .addOptionalParam('to', 'To address or account index')
  .addOptionalParam('amount', 'Amount to send in ether')
  .addOptionalParam('data', 'Data included in transaction')
  .addOptionalParam('gasPrice', 'Price you are willing to pay in gwei')
  .addOptionalParam('gasLimit', 'Limit of how much gas to spend')

  .setAction(async (taskArgs, { network, ethers }) => {
    const from = await addr(ethers, taskArgs.from);
    debug(`Normalized from address: ${from}`);
    const fromSigner = await ethers.provider.getSigner(from);

    let to;
    if (taskArgs.to) {
      to = await addr(ethers, taskArgs.to);
      debug(`Normalized to address: ${to}`);
    }

    const txRequest = {
      from: await fromSigner.getAddress(),
      to,
      value: ethers.utils.parseUnits(taskArgs.amount ? taskArgs.amount : '0', 'ether').toHexString(),
      nonce: await fromSigner.getTransactionCount(),
      gasPrice: ethers.utils.parseUnits(taskArgs.gasPrice ? taskArgs.gasPrice : '1.001', 'gwei').toHexString(),
      gasLimit: taskArgs.gasLimit ? taskArgs.gasLimit : 24000,
      chainId: network.config.chainId,
    };

    if (taskArgs.data !== undefined) {
      txRequest.data = taskArgs.data;
      debug(`Adding data to payload: ${txRequest.data}`);
    }
    debug(txRequest.gasPrice / 1000000000 + ' gwei');
    debug(JSON.stringify(txRequest, null, 2));

    return send(fromSigner, txRequest);
  });
