import React, { useContext } from 'react';
import { NetworkContext } from 'NetworkProvider';
import NFTL from 'assets/images/NFTL.png';
import Tooltip from 'components/Tooltip';
import { NFTL_CONTRACT } from '../../constants';

const AddNFTL = (): JSX.Element | null => {
  const { userProvider, writeContracts } = useContext(NetworkContext);
  const NFTLAddress = writeContracts[NFTL_CONTRACT] && writeContracts[NFTL_CONTRACT].address;
  const handleAddToken = () => {
    const params = {
      type: 'ERC20',
      options: {
        address: NFTLAddress,
        symbol: 'NFTL',
        decimals: 18,
        image: 'https://raw.githubusercontent.com/NiftyLeague/Nifty-League-Images/main/NFTL.png',
      },
    };
    if (userProvider?.provider?.request)
      userProvider.provider
        // @ts-expect-error ts-migrate(2740) FIXME: Type '{ type: string; options: { address: string; ... Remove this comment to see the full error message
        .request({ method: 'wallet_watchAsset', params })
        .then(success => {
          if (success) console.log('Successfully added NFTL to MetaMask');
          else throw new Error('Something went wrong.');
        })
        .catch(console.error);
  };

  return userProvider?.provider?.isMetaMask && userProvider?.provider?.request ? (
    <Tooltip text="Add NFTL to your Metamask wallet" placement="left-start">
      <div className="add-token" onClick={handleAddToken}>
        <img src={NFTL} alt="NFTL logo" />
      </div>
    </Tooltip>
  ) : null;
};

export default AddNFTL;
