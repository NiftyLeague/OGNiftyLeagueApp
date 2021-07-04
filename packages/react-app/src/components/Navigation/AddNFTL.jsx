import React from "react";
import NFTLAddress from "contracts/NFTLToken.address.js";
import Tooltip from "../Tooltip";

const AddNFTL = ({ userProvider }) => {
  const handleAddToken = () => {
    const params = {
      type: "ERC20",
      options: {
        address: NFTLAddress,
        symbol: "NFTL",
        decimals: 18,
        image:
          "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272/logo.png",
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
    <Tooltip text={"Add NFTL to your Metamask wallet"}>
      <div className="add-token" onClick={handleAddToken}>
        <img src={`${process.env.PUBLIC_URL}/NFTL.jpg`} alt="NFTL logo" />
      </div>
    </Tooltip>
  ) : null;
};

export default AddNFTL;
