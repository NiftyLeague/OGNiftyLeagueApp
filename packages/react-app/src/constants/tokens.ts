import { ChainId, Token } from "@sushiswap/sdk";

type ChainTokenMap = {
  readonly [chainId in ChainId]?: Token;
};

// SUSHI
export const SUSHI: ChainTokenMap = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
    18,
    "SUSHI",
    "SushiToken",
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F",
    18,
    "SUSHI",
    "SushiToken",
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F",
    18,
    "SUSHI",
    "SushiToken",
  ),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F", 18, "SUSHI", "SushiToken"),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, "0x0769fd68dFb93167989C6f7254cd0D766Fb2841F", 18, "SUSHI", "SushiToken"),
  [ChainId.FANTOM]: new Token(ChainId.FANTOM, "0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC", 18, "SUSHI", "SushiToken"),
};

// Default Ethereum chain tokens
export const DAI = new Token(
  ChainId.MAINNET,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  18,
  "DAI",
  "Dai Stablecoin",
);
export const USDC = new Token(ChainId.MAINNET, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6, "USDC", "USD Coin");
export const USDT = new Token(ChainId.MAINNET, "0xdAC17F958D2ee523a2206206994597C13D831ec7", 6, "USDT", "Tether USD");
export const WBTC = new Token(ChainId.MAINNET, "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", 8, "WBTC", "Wrapped BTC");
export const NFTX = new Token(ChainId.MAINNET, "0x87d73E916D7057945c9BcD8cdd94e42A6F47f776", 18, "NFTX", "NFTX");

export const BSC: { [key: string]: Token } = {
  DAI: new Token(ChainId.BSC, "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3", 18, "DAI", "Dai Stablecoin"),
  USD: new Token(ChainId.BSC, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", 18, "BUSD", "Binance USD"),
  USDC: new Token(ChainId.BSC, "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", 18, "USDC", "USD Coin"),
  USDT: new Token(ChainId.BSC, "0x55d398326f99059fF775485246999027B3197955", 18, "USDT", "Tether USD"),
  BTCB: new Token(ChainId.BSC, "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c", 18, "BTCB", "Bitcoin"),
};

export const FANTOM: { [key: string]: Token } = {
  USDC: new Token(ChainId.FANTOM, "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75", 6, "USDC", "USD Coin"),
  WBTC: new Token(ChainId.FANTOM, "0x321162Cd933E2Be498Cd2267a90534A804051b11", 8, "WBTC", "Wrapped Bitcoin"),
  DAI: new Token(ChainId.FANTOM, "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E", 18, "DAI", "Dai Stablecoin"),
  WETH: new Token(ChainId.FANTOM, "0x74b23882a30290451A17c44f4F05243b6b58C76d", 18, "WETH", "Wrapped Ether"),
};

export const MATIC: { [key: string]: Token } = {
  USDC: new Token(ChainId.MATIC, "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", 6, "USDC", "USD Coin"),
  WBTC: new Token(ChainId.MATIC, "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", 8, "WBTC", "Wrapped Bitcoin"),
  DAI: new Token(ChainId.MATIC, "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", 18, "DAI", "Dai Stablecoin"),
  WETH: new Token(ChainId.MATIC, "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", 18, "WETH", "Wrapped Ether"),
  USDT: new Token(ChainId.MATIC, "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", 6, "USDT", "Tether USD"),
  TEL: new Token(ChainId.MATIC, "0xdF7837DE1F2Fa4631D716CF2502f8b230F1dcc32", 2, "TEL", "Telcoin"),
  SUSHI: new Token(ChainId.MATIC, "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a", 18, "SUSHI", "SushiToken"),
  AAVE: new Token(ChainId.MATIC, "0xD6DF932A45C0f255f85145f286eA0b292B21C90B", 18, "AAVE", "Aave"),
  FRAX: new Token(ChainId.MATIC, "0x104592a158490a9228070E0A8e5343B499e125D0", 18, "FRAX", "Frax"),
  FXS: new Token(ChainId.MATIC, "0x3e121107F6F22DA4911079845a470757aF4e1A1b", 18, "FXS", "Frax Share"),
};
