/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable spaced-comment */
const fs = require("fs/promises");
const path = require("path");

const CID = require("cids");
const ipfsClient = require("ipfs-http-client");
const all = require("it-all");
const uint8ArrayConcat = require("uint8arrays/concat");
const uint8ArrayToString = require("uint8arrays/to-string");
const { BigNumber } = require("ethers");

// The getconfig package loads configuration from files located in the the `config` directory.
// See https://www.npmjs.com/package/getconfig for info on how to override the default config for
// different environments (e.g. testnet, mainnet, staging, production, etc).
const config = require("getconfig");

const TRAIT_TYPES = require("../constants/traitTypes");
const TRAIT_NAME_MAP = require("../constants/traitNameMap");

// ipfs.add parameters for more deterministic CIDs
const ipfsAddOptions = {
  cidVersion: 1,
  hashAlg: "sha2-256",
};

/**
 * Construct and asynchronously initialize a new Minty instance.
 * @returns {Promise<Minty>} a new instance of Minty, ready to mint NFTs.
 */
async function MakeMinty() {
  const m = new Minty();
  await m.init();
  return m;
}

/**
 * Minty is the main object responsible for storing NFT data and interacting with the smart contract.
 * Before constructing, make sure that the contract has been deployed and a deployment
 * info file exists (the default location is `minty-deployment.json`)
 *
 * Minty requires async initialization, so the Minty class (and its constructor) are not exported.
 * To make one, use the async {@link MakeMinty} function.
 */
class Minty {
  constructor() {
    this.ipfs = null;
    this.contract = null;
    this._initialized = false;
  }

  async init() {
    if (this._initialized) return;

    // eslint-disable-next-line global-require
    this.hardhat = require("hardhat");

    // connect to the smart contract using the address and ABI from the deploy info
    this.contract = await this.hardhat.ethers.getContractAt(
      config.nftContractName,
      fs.readFileSync(`./artifacts/${config.nftContractName}.address`).toString(),
    );

    // create a local IPFS node
    this.ipfs = ipfsClient(config.ipfsApiUrl);

    this._initialized = true;
  }

  //////////////////////////////////////////////
  // ------ NFT Creation
  //////////////////////////////////////////////

  /**
   * Create a new NFT from the given asset data.
   *
   * @param {Buffer|Uint8Array} content - a Buffer or UInt8Array of data (e.g. for an image)
   * @param {object} options
   * @param {?string} path - optional file path to set when storing the data on IPFS
   * @param {?string} name - optional name to set in NFT metadata
   * @param {?string} description - optional description to store in NFT metadata
   * @param {?string} owner - optional ethereum address that should own the new NFT.
   * If missing, the default signing address will be used.
   *
   * @typedef {object} CreateNFTResult
   * @property {string} tokenId - the unique ID of the new token
   * @property {object} metadata - the JSON metadata stored in IPFS and referenced by the token's metadata URI
   * @property {string} assetURI - an ipfs:// URI for the NFT asset
   * @property {string} metadataURI - an ipfs:// URI for the NFT metadata
   * @property {string} assetGatewayURL - an HTTP gateway URL for the NFT asset
   * @property {string} metadataGatewayURL - an HTTP gateway URL for the NFT metadata
   *
   * @returns {Promise<CreateNFTResult>}
   */
  async createNFTFromAssetData(tokenId, filePath, content) {
    // add the asset to IPFS
    const basename = path.basename(filePath);

    // When you add an object to IPFS with a directory prefix in its path,
    // IPFS will create a directory structure for you. This is nice, because
    // it gives us URIs with descriptive filenames in them e.g.
    // 'ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM/cat-pic.png' instead of
    // 'ipfs://QmaNZ2FCgvBPqnxtkbToVVbK2Nes6xk5K4Ns6BsmkPucAM'
    const ipfsPath = "/nft/" + basename;
    const { cid: assetCid } = await this.ipfs.add({ path: ipfsPath, content }, ipfsAddOptions);

    // make the NFT metadata JSON
    const assetURI = ensureIpfsUriPrefix(assetCid) + "/" + basename;
    const metadata = await this.makeNFTMetadata(tokenId, assetURI);

    // add the metadata to IPFS
    const { cid: metadataCid } = await this.ipfs.add(
      { path: "/nft/metadata.json", content: JSON.stringify(metadata) },
      ipfsAddOptions,
    );
    const metadataURI = ensureIpfsUriPrefix(metadataCid) + "/metadata.json";

    return {
      tokenId,
      metadata,
      assetURI,
      metadataURI,
      assetGatewayURL: makeGatewayURL(assetURI),
      metadataGatewayURL: makeGatewayURL(metadataURI),
    };
  }

  /**
   * Create a new NFT from an asset file at the given path.
   *
   * @param {object} options
   * @param {?[]} character - Character base traits
   * @param {?[]} head - Character head traits
   * @param {?[]} clothing - Character clothing options
   * @param {?[]} accessories - Character accessories
   * @param {?[]} items - Character items
   *
   * @returns {Promise<CreateNFTResult>}
   */
  async createNFT(options) {
    const tokenId = await this.mintToken(options);
    const filePath = await this.generateImage(tokenId, options);
    const content = await fs.readFile(filePath);
    return this.createNFTFromAssetData(tokenId, filePath, content);
  }

  /**
   * Helper to generate image from character options
   *
   * @param {number} tokenId - the unique ID of the new token
   * @param {object} options
   * @param {?[]} character - Character base traits
   * @param {?[]} head - Character head traits
   * @param {?[]} clothing - Character clothing options
   * @param {?[]} accessories - Character accessories
   * @param {?[]} items - Character items
   *
   * @returns {string} - NFT image filepath
   */
  // eslint-disable-next-line class-methods-use-this
  async generateImage(tokenId, options) {
    const filePath = `images/${tokenId}.jpeg`;
    if (fs.existsSync(filePath)) {
      console.log(`File already exists`);
    } else {
      // TODO: generate image from Unity using options
      console.log("image options", options);
    }
    return filePath;
  }

  /**
   * Helper to construct metadata JSON for character NFTs
   *
   * @param {number} tokenId - the unique ID of the new token
   * @param {string} assetURI - IPFS URI for the NFT asset
   *
   * @typedef {object} CreateMetadataResult
   * @property {string} name - optional name to set in NFT metadata
   * @property {object} image - an ipfs:// URI for the NFT asset
   * @property {string} description - optional description to store in NFT metadata
   * @property {string} external_url - an HTTP gateway URL for the NFT asset
   * @property {string} attributes - optional attributes to store in NFT metadata
   *
   * @returns {Promise<CreateMetadataResult>}
   */
  async makeNFTMetadata(tokenId, assetURI) {
    const characterTraits = await this.contract.getCharacterTraits(tokenId);
    const attributes = characterTraits
      .filter(trait => trait !== 0)
      .map((trait, i) => {
        return { trait_type: TRAIT_TYPES[i], value: TRAIT_NAME_MAP[trait] };
      });
    return {
      name: (await this.contract.getName(tokenId)) || `${TRAIT_NAME_MAP[characterTraits[0]]} #${tokenId}`,
      image: ensureIpfsUriPrefix(assetURI),
      description: config.metadata.description,
      external_url: `${config.metadata.externalURL}/${tokenId}`,
      attributes,
    };
  }

  //////////////////////////////////////////////
  // -------- NFT Retreival
  //////////////////////////////////////////////

  /**
   * Get information about an existing token.
   * By default, this includes the token id, owner address, metadata, and metadata URI.
   * To include info about when the token was created and by whom, set `opts.fetchCreationInfo` to true.
   * To include the full asset data (base64 encoded), set `opts.fetchAsset` to true.
   *
   * @param {string} tokenId
   * @param {object} opts
   * @param {?boolean} opts.fetchAsset - if true, asset data will be fetched from IPFS and returned in assetData (base64 encoded)
   * @param {?boolean} opts.fetchCreationInfo - if true, fetch historical info (creator address and block number)
   *
   *
   * @typedef {object} NFTInfo
   * @property {string} tokenId
   * @property {string} ownerAddress
   * @property {object} metadata
   * @property {string} metadataURI
   * @property {string} metadataGatewayURI
   * @property {string} assetURI
   * @property {string} assetGatewayURL
   * @property {?string} assetDataBase64
   * @property {?object} creationInfo
   * @property {string} creationInfo.creatorAddress
   * @property {number} creationInfo.blockNumber
   * @returns {Promise<NFTInfo>}
   */
  async getNFT(tokenId, opts) {
    const { metadata, metadataURI } = await this.getNFTMetadata(tokenId);
    const ownerAddress = await this.getTokenOwner(tokenId);
    const metadataGatewayURL = makeGatewayURL(metadataURI);
    const nft = { tokenId, metadata, metadataURI, metadataGatewayURL, ownerAddress };

    const { fetchAsset, fetchCreationInfo } = opts || {};
    if (metadata.image) {
      nft.assetURI = metadata.image;
      nft.assetGatewayURL = makeGatewayURL(metadata.image);
      if (fetchAsset) {
        nft.assetDataBase64 = await this.getIPFSBase64(metadata.image);
      }
    }

    if (fetchCreationInfo) {
      nft.creationInfo = await this.getCreationInfo(tokenId);
    }
    return nft;
  }

  /**
   * Fetch the NFT metadata for a given token id.
   *
   * @param tokenId - the id of an existing token
   * @returns {Promise<{metadata: object, metadataURI: string}>} - resolves to an object containing the metadata and
   * metadata URI. Fails if the token does not exist, or if fetching the data fails.
   */
  async getNFTMetadata(tokenId) {
    const metadataURI = await this.contract.tokenURI(tokenId);
    const metadata = await this.getIPFSJSON(metadataURI);

    return { metadata, metadataURI };
  }

  //////////////////////////////////////////////
  // --------- Smart contract interactions
  //////////////////////////////////////////////

  /**
   * Create a new NFT token that references the given character options.
   *
   * @param {object} options
   * @param {?[]} character - Character base traits
   * @param {?[]} head - Character head traits
   * @param {?[]} clothing - Character clothing options
   * @param {?[]} accessories - Character accessories
   * @param {?[]} items - Character items
   *
   * @returns {Promise<string>} - the ID of the new token
   */
  async mintToken(options) {
    // Call the mintToken method to issue a new token to the given address
    // This returns a transaction object, but the transaction hasn't been confirmed
    // yet, so it doesn't have our token id.
    const tx = await this.contract.purchase(...options);

    // The OpenZeppelin base ERC721 contract emits a Transfer event when a token is issued.
    // tx.wait() will wait until a block containing our transaction has been mined and confirmed.
    // The transaction receipt contains events emitted while processing the transaction.
    const receipt = await tx.wait();
    for (const event of receipt.events) {
      if (event.event !== "Transfer") {
        console.log("ignoring unknown event type ", event.event);
        continue;
      }
      return event.args.tokenId.toString();
    }

    throw new Error("unable to get token id");
  }

  async transferToken(tokenId, toAddress) {
    const fromAddress = await this.getTokenOwner(tokenId);

    // because the base ERC721 contract has two overloaded versions of the safeTranferFrom function,
    // we need to refer to it by its fully qualified name.
    const tranferFn = this.contract["safeTransferFrom(address,address,uint256)"];
    const tx = await tranferFn(fromAddress, toAddress, tokenId);

    // wait for the transaction to be finalized
    await tx.wait();
  }

  /**
   * @returns {Promise<string>} - the default signing address that should own new tokens, if no owner was specified.
   */
  async defaultOwnerAddress() {
    const signers = await this.hardhat.ethers.getSigners();
    return signers[0].address;
  }

  /**
   * Get the address that owns the given token id.
   *
   * @param {string} tokenId - the id of an existing token
   * @returns {Promise<string>} - the ethereum address of the token owner. Fails if no token with the given id exists.
   */
  async getTokenOwner(tokenId) {
    return this.contract.ownerOf(tokenId);
  }

  /**
   * Get historical information about the token.
   *
   * @param {string} tokenId - the id of an existing token
   *
   * @typedef {object} NFTCreationInfo
   * @property {number} blockNumber - the block height at which the token was minted
   * @property {string} creatorAddress - the ethereum address of the token's initial owner
   *
   * @returns {Promise<NFTCreationInfo>}
   */
  async getCreationInfo(tokenId) {
    const filter = await this.contract.filters.Transfer(null, null, BigNumber.from(tokenId));

    const logs = await this.contract.queryFilter(filter);
    const blockNumber = logs[0].blockNumber;
    const creatorAddress = logs[0].args.to;
    return {
      blockNumber,
      creatorAddress,
    };
  }

  //////////////////////////////////////////////
  // --------- IPFS helpers
  //////////////////////////////////////////////

  /**
   * Get the full contents of the IPFS object identified by the given CID or URI.
   *
   * @param {string} cidOrURI - IPFS CID string or `ipfs://<cid>` style URI
   * @returns {Promise<Uint8Array>} - contents of the IPFS object
   */
  async getIPFS(cidOrURI) {
    const cid = stripIpfsUriPrefix(cidOrURI);
    return uint8ArrayConcat(await all(this.ipfs.cat(cid)));
  }

  /**
   * Get the contents of the IPFS object identified by the given CID or URI, and return it as a string.
   *
   * @param {string} cidOrURI - IPFS CID string or `ipfs://<cid>` style URI
   * @returns {Promise<string>} - the contents of the IPFS object as a string
   */
  async getIPFSString(cidOrURI) {
    const bytes = await this.getIPFS(cidOrURI);
    return uint8ArrayToString(bytes);
  }

  /**
   * Get the full contents of the IPFS object identified by the given CID or URI, and return it as a base64 encoded string.
   *
   * @param {string} cidOrURI - IPFS CID string or `ipfs://<cid>` style URI
   * @returns {Promise<string>} - contents of the IPFS object, encoded to base64
   */
  async getIPFSBase64(cidOrURI) {
    const bytes = await this.getIPFS(cidOrURI);
    return uint8ArrayToString(bytes, "base64");
  }

  /**
   * Get the contents of the IPFS object identified by the given CID or URI, and parse it as JSON, returning the parsed object.
   *
   * @param {string} cidOrURI - IPFS CID string or `ipfs://<cid>` style URI
   * @returns {Promise<string>} - contents of the IPFS object, as a javascript object (or array, etc depending on what was stored). Fails if the content isn't valid JSON.
   */
  async getIPFSJSON(cidOrURI) {
    const str = await this.getIPFSString(cidOrURI);
    return JSON.parse(str);
  }

  //////////////////////////////////////////////
  // -------- Pinning to remote services
  //////////////////////////////////////////////

  /**
   * Pins all IPFS data associated with the given tokend id to the remote pinning service.
   *
   * @param {string} tokenId - the ID of an NFT that was previously minted.
   * @returns {Promise<{assetURI: string, metadataURI: string}>} - the IPFS asset and metadata uris that were pinned.
   * Fails if no token with the given id exists, or if pinning fails.
   */
  async pinTokenData(tokenId) {
    const { metadata, metadataURI } = await this.getNFTMetadata(tokenId);
    const { image: assetURI } = metadata;

    console.log(`Pinning asset data (${assetURI}) for token id ${tokenId}....`);
    await this.pin(assetURI);

    console.log(`Pinning metadata (${metadataURI}) for token id ${tokenId}...`);
    await this.pin(metadataURI);

    return { assetURI, metadataURI };
  }

  /**
   * Request that the remote pinning service pin the given CID or ipfs URI.
   *
   * @param {string} cidOrURI - a CID or ipfs:// URI
   * @returns {Promise<void>}
   */
  async pin(cidOrURI) {
    const cid = extractCID(cidOrURI);

    // Make sure IPFS is set up to use our preferred pinning service.
    await this._configurePinningService();

    // Check if we've already pinned this CID to avoid a "duplicate pin" error.
    const pinned = await this.isPinned(cid);
    if (pinned) {
      return;
    }

    // Ask the remote service to pin the content.
    // Behind the scenes, this will cause the pinning service to connect to our local IPFS node
    // and fetch the data using Bitswap, IPFS's transfer protocol.
    await this.ipfs.pin.remote.add(cid, { service: config.pinningService.name });
  }

  /**
   * Check if a cid is already pinned.
   *
   * @param {string|CID} cid
   * @returns {Promise<boolean>} - true if the pinning service has already pinned the given cid
   */
  async isPinned(cid) {
    if (typeof cid === "string") {
      cid = new CID(cid);
    }

    const opts = {
      service: config.pinningService.name,
      cid: [cid], // ls expects an array of cids
    };
    for await (const result of this.ipfs.pin.remote.ls(opts)) {
      return true;
    }
    return false;
  }

  /**
   * Configure IPFS to use the remote pinning service from our config.
   *
   * @private
   */
  async _configurePinningService() {
    if (!config.pinningService) {
      throw new Error(`No pinningService set up in minty config. Unable to pin.`);
    }

    // check if the service has already been added to js-ipfs
    for (const svc of await this.ipfs.pin.remote.service.ls()) {
      if (svc.service === config.pinningService.name) {
        // service is already configured, no need to do anything
        return;
      }
    }

    // add the service to IPFS
    const { name, endpoint, key } = config.pinningService;
    if (!name) {
      throw new Error("No name configured for pinning service");
    }
    if (!endpoint) {
      throw new Error(`No endpoint configured for pinning service ${name}`);
    }
    if (!key) {
      throw new Error(
        `No key configured for pinning service ${name}.` +
          `If the config references an environment variable, e.g. '$$PINATA_API_TOKEN', ` +
          `make sure that the variable is defined.`,
      );
    }
    await this.ipfs.pin.remote.service.add(name, { endpoint, key });
  }
}

//////////////////////////////////////////////
// -------- URI helpers
//////////////////////////////////////////////

/**
 * @param {string} cidOrURI either a CID string, or a URI string of the form `ipfs://${cid}`
 * @returns the input string with the `ipfs://` prefix stripped off
 */
function stripIpfsUriPrefix(cidOrURI) {
  if (cidOrURI.startsWith("ipfs://")) {
    return cidOrURI.slice("ipfs://".length);
  }
  return cidOrURI;
}

function ensureIpfsUriPrefix(cidOrURI) {
  let uri = cidOrURI.toString();
  if (!uri.startsWith("ipfs://")) {
    uri = "ipfs://" + cidOrURI;
  }
  // Avoid the Nyan Cat bug (https://github.com/ipfs/go-ipfs/pull/7930)
  if (uri.startsWith("ipfs://ipfs/")) {
    uri = uri.replace("ipfs://ipfs/", "ipfs://");
  }
  return uri;
}

/**
 * Return an HTTP gateway URL for the given IPFS object.
 * @param {string} ipfsURI - an ipfs:// uri or CID string
 * @returns - an HTTP url to view the IPFS object on the configured gateway.
 */
function makeGatewayURL(ipfsURI) {
  return config.ipfsGatewayUrl + "/" + stripIpfsUriPrefix(ipfsURI);
}

/**
 *
 * @param {string} cidOrURI - an ipfs:// URI or CID string
 * @returns {CID} a CID for the root of the IPFS path
 */
function extractCID(cidOrURI) {
  // remove the ipfs:// prefix, split on '/' and return first path component (root CID)
  const cidString = stripIpfsUriPrefix(cidOrURI).split("/")[0];
  return new CID(cidString);
}

//////////////////////////////////////////////
// -------- Exports
//////////////////////////////////////////////

module.exports = {
  MakeMinty,
};
