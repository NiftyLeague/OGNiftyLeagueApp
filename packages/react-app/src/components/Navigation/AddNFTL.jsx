import React, { useContext } from "react";
import { NetworkContext } from "NetworkProvider";
import Tooltip from "../Tooltip";
import { NFTL_CONTRACT } from "../../constants";

const AddNFTL = () => {
  const { userProvider, writeContracts } = useContext(NetworkContext);
  const NFTLAddress = writeContracts && writeContracts[NFTL_CONTRACT].address;
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
    <Tooltip text="Add NFTL to your Metamask wallet">
      <div className="add-token" onClick={handleAddToken}>
        <img src={`${process.env.PUBLIC_URL}/NFTL.jpg`} alt="NFTL logo" />
      </div>
    </Tooltip>
  ) : null;
};

export default AddNFTL;
