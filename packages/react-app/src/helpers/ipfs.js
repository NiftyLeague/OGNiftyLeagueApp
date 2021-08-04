import { IPNS_URL } from '../constants';

export function makeImageGatewayURL(ipfsURI) {
  return `${process.env.REACT_APP_IPFS_GATEWAY}/ipfs/${ipfsURI.slice('ipfs://'.length)}`;
}

export async function ResolveImageURL(tokenId) {
  // TODO: can grab directly from contract once gateway is up
  // const metadata = await nftContract.methods.tokenURI("1").call()
  try {
    const response = await fetch(`${IPNS_URL}/${tokenId}.json`);
    if (!response?.ok) throw new Error(response?.statusText);
    const json = await response.json();
    if (!json.image) throw new Error("image doesn't exist");
    return makeImageGatewayURL(json.image);
  } catch (error) {
    console.log(`ERROR occured fetching metadata for token #${tokenId}`);
    console.log(error);
  }
  return null;
}
