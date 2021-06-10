import React from "react";
import { ChainId, Currency } from "@sushiswap/sdk";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Disclosure } from "@headlessui/react";

import { NavLink } from "./Link";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { useETHBalances } from "../../state/wallet/hooks";
import LanguageSwitch from "./LanguageSwitch";
import MoreMenu from "./MoreMenu";
import QuestionHelper from "./QuestionHelper";
import Web3Network from "./Web3Network";
import Web3Status from "./Web3Status";
import ThemeProvider, { ThemedGlobalStyle } from "./theme";

import { ReactComponent as Burger } from "../../assets/svg/burger.svg";
import { ReactComponent as X } from "../../assets/svg/x.svg";
import Logo from "../../assets/images/logo.png";

function AppBar() {
  const { i18n } = useLingui();
  const { account, chainId, library } = useActiveWeb3React();

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? ""];

  console.log("account", account);
  console.log("userEthBalance", userEthBalance);
  console.log("chainID", chainId);
  console.log("ChainId.MAINNET", ChainId.MAINNET);

  return (
    <ThemeProvider>
      <ThemedGlobalStyle>
        <header className="flex flex-row flex-nowrap justify-between w-screen">
          <Disclosure
            as="nav"
            className="w-screen bg-transparent gradiant-border-bottom z-10 backdrop-filter backdrop-blur"
          >
            {({ open }) => (
              <>
                <div className="px-4 py-1.5">
                  <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img src={Logo} alt="Sushi" className="h-10 w-auto" />
                      </div>
                      <div className="hidden sm:block sm:ml-4">
                        <div className="flex space-x-2">
                          <NavLink id="swap-nav-link" to="/swap">
                            {i18n._(t`Swap`)}
                          </NavLink>
                          <NavLink
                            id="pool-nav-link"
                            to="/pool"
                            isActive={(match, { pathname }) =>
                              Boolean(match) ||
                              pathname.startsWith("/add") ||
                              pathname.startsWith("/remove") ||
                              pathname.startsWith("/create") ||
                              pathname.startsWith("/find")
                            }
                          >
                            {i18n._(t`Pool`)}
                          </NavLink>
                          {chainId && [ChainId.MAINNET, ChainId.MATIC].includes(chainId) && (
                            <NavLink id="yield-nav-link" to="/yield">
                              {i18n._(t`Yield`)}
                            </NavLink>
                          )}
                          {chainId === ChainId.MAINNET && (
                            <NavLink id="sushibar-nav-link" to="/sushibar">
                              {i18n._(t`SushiBar`)}
                            </NavLink>
                          )}
                          {chainId && [ChainId.MAINNET, ChainId.KOVAN, ChainId.BSC, ChainId.MATIC].includes(chainId) && (
                            <NavLink id="kashi-nav-link" to="/bento/kashi/lend">
                              {i18n._(t`Lend`)}
                            </NavLink>
                          )}
                          {chainId && [ChainId.MAINNET, ChainId.KOVAN, ChainId.BSC, ChainId.MATIC].includes(chainId) && (
                            <NavLink id="bento-nav-link" to="/bento">
                              {i18n._(t`BentoBox`)}
                            </NavLink>
                          )}
                          {chainId === ChainId.MAINNET && (
                            <NavLink id="vesting-nav-link" to="/vesting">
                              {i18n._(t`Vesting`)}
                            </NavLink>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-center justify-center w-full lg:w-auto p-4 fixed left-0 bottom-0 bg-dark-1000 lg:relative lg:p-0 lg:bg-transparent">
                      <div className="flex items-center justify-between sm:justify-end space-x-2 w-full">
                        {chainId && [ChainId.MAINNET].includes(chainId) && library && library.provider.isMetaMask && (
                          <>
                            <QuestionHelper text={i18n._(t`Add NFTL to your Metamask wallet`)}>
                              <div
                                className="hidden sm:inline-block rounded-md bg-dark-900 hover:bg-dark-800 cursor-pointer"
                                onClick={() => {
                                  const params = {
                                    type: "ERC20",
                                    options: {
                                      address: "0x8798249c2e607446efb7ad49ec89dd1865ff4272",
                                      symbol: "XSUSHI",
                                      decimals: 18,
                                      image:
                                        "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272/logo.png",
                                    },
                                  };

                                  if (library && library.provider.isMetaMask && library.provider.request) {
                                    library.provider
                                      .request({
                                        method: "wallet_watchAsset",
                                        params,
                                      })
                                      .then(success => {
                                        if (success) {
                                          console.log("Successfully added NFTL to MetaMask");
                                        } else {
                                          throw new Error("Something went wrong.");
                                        }
                                      })
                                      .catch(console.error);
                                  }
                                }}
                              >
                                <img
                                  src={`${process.env.PUBLIC_URL}/NFTL.jpg`}
                                  alt="Switch Network"
                                  style={{
                                    minWidth: 36,
                                    minHeight: 36,
                                    maxWidth: 36,
                                    maxHeight: 36,
                                  }}
                                  className="rounded-md object-contain"
                                />
                              </div>
                            </QuestionHelper>
                          </>
                        )}

                        {chainId && chainId === ChainId.MATIC && (
                          <div className="hidden sm:inline-block">
                            <a
                              className="flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto"
                              href="https://wallet.matic.network/bridge/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="grid grid-flow-col auto-cols-max items-center rounded-lg bg-dark-1000 text-sm text-secondary py-2 px-3 pointer-events-auto">
                                <div className="text-primary">{i18n._(t`Bridge Assets`)}</div>
                              </div>
                            </a>
                          </div>
                        )}
                        {library && library.provider.isMetaMask && (
                          <div className="hidden sm:inline-block">
                            <Web3Network />
                          </div>
                        )}

                        <div className="w-auto flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
                          {account && chainId && userEthBalance && (
                            <>
                              <div className="py-2 px-3 text-primary text-bold">
                                {userEthBalance?.toSignificant(4)} {Currency.getNativeCurrencySymbol(chainId)}
                              </div>
                            </>
                          )}
                          <Web3Status />
                        </div>
                        <LanguageSwitch />

                        <MoreMenu />
                      </div>
                    </div>
                    <div className="-mr-2 flex sm:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-high-emphesis focus:outline-none">
                        <span className="sr-only">{i18n._(t`Open main menu`)}</span>
                        {open ? (
                          <X title="Close" className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Burger title="Burger" className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                  <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    {/* <a
                                href="#"
                                className="bg-gray-1000 text-white block px-3 py-2 rounded-md text-base font-medium"
                            >
                                Dashboard
                            </a> */}

                    <NavLink id="swap-nav-link" to="/swap">
                      {i18n._(t`Swap`)}
                    </NavLink>
                    <NavLink
                      id="pool-nav-link"
                      to="/pool"
                      isActive={(match, { pathname }) =>
                        Boolean(match) ||
                        pathname.startsWith("/add") ||
                        pathname.startsWith("/remove") ||
                        pathname.startsWith("/create") ||
                        pathname.startsWith("/find")
                      }
                    >
                      {i18n._(t`Pool`)}
                    </NavLink>

                    {chainId && [ChainId.MAINNET, ChainId.MATIC].includes(chainId) && (
                      <NavLink id="yield-nav-link" to="/yield">
                        {i18n._(t`Yield`)}
                      </NavLink>
                    )}
                    {chainId && [ChainId.MAINNET, ChainId.KOVAN, ChainId.BSC, ChainId.MATIC].includes(chainId) && (
                      <NavLink id="kashi-nav-link" to="/bento/kashi/lend">
                        {i18n._(t`Kashi Lending`)}
                      </NavLink>
                    )}
                    {chainId && [ChainId.MAINNET, ChainId.KOVAN, ChainId.BSC, ChainId.MATIC].includes(chainId) && (
                      <NavLink id="bento-nav-link" to="/bento">
                        {i18n._(t`BentoBox`)}
                      </NavLink>
                    )}
                    {chainId === ChainId.MAINNET && (
                      <NavLink id="stake-nav-link" to="/sushibar">
                        {i18n._(t`SushiBar`)}
                      </NavLink>
                    )}
                    {chainId === ChainId.MAINNET && (
                      <NavLink id="vesting-nav-link" to="/vesting">
                        {i18n._(t`Vesting`)}
                      </NavLink>
                    )}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </header>
      </ThemedGlobalStyle>
    </ThemeProvider>
  );
}

export default AppBar;
