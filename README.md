# 🏗 Nifty League

## 🏄‍♂️ Quick Start

Prerequisites: [Node lts/fermium](https://nodejs.org/download/release/latest-fermium/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> define your target network and api keys in your env files:

Check `packages/hardhat/.sample.env` and `packages/react-app/.sample.env`

> install and start your 👷‍ Hardhat chain:

```bash
yarn && yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
yarn start
```

_Note: if you want to run subgraph locally skip to the next step_

> in a third terminal, deploy your contracts

```bash
yarn deploy
```

---

If you wish to turn on [Subgraph](https://thegraph.com/) for our characters and wallet pages:

> in a third terminal window, make sure Docker is open and spin up a local graph node:

```bash
yarn clean-graph-node # if you need to clean up previous data
yarn graph-run-node
```

> once GraphQL WebSocket is live, in a fourth terminal window, 🛰 create and deploy your local subgraph and contracts:

```bash
yarn graph-create-local
yarn deploy-and-graph-local
```

---

🔏 Edit your smart contracts in `packages/hardhat/contracts`

📝 Edit your frontend in `packages/react-app/src`

💼 Edit your deployment scripts in `packages/hardhat/deploy`

🛰 Edit your subgraph in `packages/subgraph/src`

📱 Open http://localhost:3000 to see the app

📡 Open http://localhost:8000/subgraphs/name/nifty-league/graphql to run queries

👾 Debug contract transactions on tenderly https://dashboard.tenderly.co/contract/rinkeby/<CONTRACT_ADDRESS>

---

## 📡 Deploying Subgraph

_make sure .env files point to your target network_

> deploy contracts to update subgraph configs if needed:

```bash
yarn deploy
```

> authorize deploy key if not done already:

```bash
cd packages/subgraph/
graph auth
```

You will be prompted to select a product and enter a deploy key which you can get here: https://thegraph.com/studio/subgraph. Make sure the `subgraph-studio` option is selected.

> generate and build the subgraph:

```bash
yarn graph-ship
```

> deploy the subgraph:

```bash
cd packages/subgraph/
graph deploy nifty-league
```

You will be prompted to select a product and version. Make sure the `subgraph-studio` product option is selected and then grab the version from the `specVersion` in `packages/subgraph/subgraph.yaml`

---

## TypeScript

We use TypeScript for our React app and plan on converting the remaining hardhat app soon as well!

Read the [ts-migrate](https://github.com/airbnb/ts-migrate) docs for help migrating files or temporarily ignoring problem types

> example command:

```bash
cd packages/react-app/
npm run ts-migrate -- migrate .
```

To help convert our contract ABIs for type checking we use [Typechain](https://github.com/ethereum-ts/TypeChain).  
This plugin overrides the hardhat compile task and automatically generates new Typechain artifacts on each compilation at `react-app/src/@types/contracts`

For additional resources learning TypeScript check out the [typescript-cheatsheets/react](https://github.com/typescript-cheatsheets/react) and the [typescript-book](https://github.com/basarat/typescript-book)!

---

## 📚 Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)

## 🔭 Learning Solidity

📕 Read the docs: https://docs.soliditylang.org

📚 Go through each topic from [solidity by example](https://solidity-by-example.org)

- [Primitive Data Types](https://solidity-by-example.org/primitives/)
- [Mappings](https://solidity-by-example.org/mapping/)
- [Structs](https://solidity-by-example.org/structs/)
- [Modifiers](https://solidity-by-example.org/function-modifier/)
- [Events](https://solidity-by-example.org/events/)
- [Inheritance](https://solidity-by-example.org/inheritance/)
- [Payable](https://solidity-by-example.org/payable/)
- [Fallback](https://solidity-by-example.org/fallback/)

📧 Learn the [Solidity globals and units](https://solidity.readthedocs.io/en/v0.6.6/units-and-global-variables.html)

🗒️ Read through the [Ethers API](https://docs.ethers.io/v5/api/) docs for common web3 commands you'll need

📝 Check out this [Guide to Full Stack Eth Development](https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13) which uses our exact stack only without TypeScript :p

## 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with 🏗 scaffold-eth!

---

🎛 Any web3 dev environment is complex, that's why 🏗 Scaffold-ETH comes with everything you need, already working together:

- Hardhat for your local blockchain, deploying, and testing smart contracts.
- React for building a frontend, using many useful pre-made components and hooks.
- Ant for your UI. (You can easily changed to another library you prefer)
- S3 / IPFS for publishing your app.
- Tenderly / The Graph / Etherscan / Infura / Blocknative for infrastructure.
- Support for L2 / Sidechains like Optimism and Arbitrum.

---
