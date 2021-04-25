// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "hardhat/console.sol";

/**
 * @title NFTL Token (The native token of Nifty League)
 * @dev Extends standard ERC20 contract from OpenZeppelin
 */
contract NFTLToken is ERC20("Nifty League", "NFTL") {
    /// @notice Initial supply given upon minting an NFT
    uint256 public constant INITIAL_ALLOTMENT = 5000e18; // 5000 NFTL

    /// @notice NFTL tokens calaimable per day for NFT holders
    uint256 public constant EMISSION_PER_DAY = 27.3972603e18; // 27.397 NFTL

    /// @notice Start timestamp from contract deployment
    uint256 public emissionStart;

    /// @notice End date for NFTL emissions to NFT holder
    uint256 public emissionEnd;

    /// @dev A record of last claimed timestamp for NFTs
    mapping(uint256 => uint256) private _lastClaim;

    /// @dev Contract address for ___ NFT
    address private _nftAddress;

    /**
     * @notice Construct the NFTL token
     * @param emissionStartTimestamp Timestamp of deployment
     * @param initialSupply The initial supply minted and transferred to appropriate accounts
     * @param nftAddress Address of verified Nifty League NFT contract
     */
    constructor(
        uint256 emissionStartTimestamp,
        uint256 initialSupply,
        address nftAddress
    ) {
        emissionStart = emissionStartTimestamp;
        emissionEnd = emissionStartTimestamp + (1 days * 365 * 5);
        _mint(msg.sender, initialSupply);
        _setNFTAddress(nftAddress);
    }

    /**
     * @notice Sets the contract address to Nifty League ____ NFTs upon deployment
     * @param nftAddress Address of verified NFT contract
     */
    function _setNFTAddress(address nftAddress) internal {
        require(_nftAddress == address(0), "Already set");
        _nftAddress = nftAddress;
    }

    /**
     * @notice Check last claim timestamp of accumulated NFTL for given NFT
     * @param tokenIndex Index of NFT to check
     * @return Last claim timestamp
     */
    function getLastClaim(uint256 tokenIndex) public view returns (uint256) {
        require(
            ERC721Enumerable(_nftAddress).ownerOf(tokenIndex) != address(0),
            "Owner cannot be 0 address"
        );
        require(
            tokenIndex < ERC721Enumerable(_nftAddress).totalSupply(),
            "NFT at index has not been minted yet"
        );

        uint256 lastClaimed =
            uint256(_lastClaim[tokenIndex]) != 0
                ? uint256(_lastClaim[tokenIndex])
                : emissionStart;
        return lastClaimed;
    }

    /**
     * @notice Check accumulated NFTL tokens for an NFT
     * @param tokenIndex Index of NFT to check
     * @return Total NFTL accumulated and ready to claim
     */
    function accumulated(uint256 tokenIndex) public view returns (uint256) {
        require(
            block.timestamp > emissionStart,
            "Emission has not started yet"
        );
        require(
            ERC721Enumerable(_nftAddress).ownerOf(tokenIndex) != address(0),
            "Owner cannot be 0 address"
        );
        require(
            tokenIndex < ERC721Enumerable(_nftAddress).totalSupply(),
            "NFT at index has not been minted yet"
        );

        uint256 lastClaimed = getLastClaim(tokenIndex);
        // Sanity check if last claim was on or after emission end
        if (lastClaimed >= emissionEnd) return 0;

        uint256 accumulationPeriod =
            block.timestamp < emissionEnd ? block.timestamp : emissionEnd; // Getting the min value of both
        uint256 totalAccumulated =
            ((accumulationPeriod - lastClaimed) * EMISSION_PER_DAY) / 1 days;

        // If claim hasn't been done before for the index, add initial allotment (plus prereveal multiplier if applicable)
        if (lastClaimed == emissionStart) {
            totalAccumulated = totalAccumulated + INITIAL_ALLOTMENT;
        }
        return totalAccumulated;
    }

    /**
     * @notice Mint and claim available NFTL for each NFT and
     * @param tokenIndices Indexes of NFTs to claim for
     * @return Total NFTL claimed
     */
    function claim(uint256[] memory tokenIndices) public returns (uint256) {
        require(
            block.timestamp > emissionStart,
            "Emission has not started yet"
        );

        uint256 totalClaimQty = 0;
        for (uint256 i = 0; i < tokenIndices.length; i++) {
            // Sanity check for non-minted index
            require(
                tokenIndices[i] < ERC721Enumerable(_nftAddress).totalSupply(),
                "NFT at index has not been minted yet"
            );
            // Duplicate token index check
            for (uint256 j = i + 1; j < tokenIndices.length; j++) {
                require(
                    tokenIndices[i] != tokenIndices[j],
                    "Duplicate token index"
                );
            }

            uint256 tokenIndex = tokenIndices[i];
            require(
                ERC721Enumerable(_nftAddress).ownerOf(tokenIndex) == msg.sender,
                "Sender is not the owner"
            );

            uint256 claimQty = accumulated(tokenIndex);
            if (claimQty != 0) {
                totalClaimQty = totalClaimQty + claimQty;
                _lastClaim[tokenIndex] = block.timestamp;
            }
        }

        require(totalClaimQty != 0, "No accumulated NFTL");
        _mint(msg.sender, totalClaimQty);
        return totalClaimQty;
    }
}
