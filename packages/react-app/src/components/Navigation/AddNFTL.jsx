import React, { useContext } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { NetworkContext } from "NetworkProvider";
import Tooltip from "../Tooltip";
import { NFTL_CONTRACT } from "../../constants";

const AddNFTL = () => {
  const { currentTheme } = useThemeSwitcher();
  const { userProvider, writeContracts } = useContext(NetworkContext);
  const NFTLAddress = writeContracts && writeContracts[NFTL_CONTRACT].address;
  const handleAddToken = () => {
    const params = {
      type: "ERC20",
      options: {
        address: NFTLAddress,
        symbol: "NFTL",
        decimals: 18,
        image: "https://raw.githubusercontent.com/NiftyLeague/Nifty-League-Images/main/NFTL.png",
      },
    };
    userProvider.provider
      .request({ method: "wallet_watchAsset", params })
      .then(success => {
        if (success) console.log("Successfully added NFTL to MetaMask");
        else throw new Error("Something went wrong.");
      })
      .catch(console.error);
  };

  return userProvider?.provider?.isMetaMask && userProvider?.provider?.request ? (
    <Tooltip text="Add NFTL to your Metamask wallet">
      <div className="add-token" onClick={handleAddToken}>
        <img
          src={`${process.env.PUBLIC_URL}/${currentTheme === "dark" ? "logo192-white.png" : "logo192.png"}`}
          alt="NFTL logo"
        />
      </div>
    </Tooltip>
  ) : null;
};

export default AddNFTL;
