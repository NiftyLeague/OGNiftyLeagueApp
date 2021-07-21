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

---

If you wish to turn on [Subgraph](https://thegraph.com/) for our characters and wallet pages:

> in a third terminal window, spin up a local graph node:

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

If you wish to turn on the image and metadata generator:

> if there's no local ipfs repo at `$HOME/.ipfs`, initialize one:

```bash
npx go-ipfs init
```

> run local ipfs daemon

```bash
npx go-ipfs daemon
```

> in a fifth terminal window, run our NFT task runner

```bash
yarn nft-task-runner
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

> generate, build, and deploy the subgraph:

```bash
yarn graph-ship
```

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

## 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with 🏗 scaffold-eth!

---

🎛 Any web3 dev environment is complex, that's why 🏗 Scaffold-ETH comes with everything you need, already working together:

- Hardhat for your local blockchain, deploying, and testing smart contracts.
- React for building a frontend, using many useful pre-made components and hooks.
- Ant for your UI. (You can easily changed to another library you prefer)
- Surge / S3 / IPFS for publishing your app.
- Tenderly / The Graph / Etherscan / Infura / Blocknative for infrastructure.
- Support for L2 / Sidechains like Optimism and Arbitrum.

---
