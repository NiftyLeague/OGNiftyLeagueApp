// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "./INifty.sol";

import "hardhat/console.sol";

/**
 *
 * NFTL Contract (The native token of Nifty League)
 * @dev Extends standard ERC20 contract
 */
contract NFTLToken is ERC20 {
    uint256 public constant INITIAL_ALLOTMENT = 5000e18; // 5000 NFTL
    uint256 public constant EMISSION_PER_DAY = 27.3972603e18;  // 27.397 NFTL

    uint256 public emissionStart;
    uint256 public emissionEnd;

    mapping(uint256 => uint256) private _lastClaim;

    address private _nftAddress;

    /**
     * @dev Sets the values for {name}, {symbol}, and initalizes {emissionStart}
     *
     * All three of these values are immutable: they can only be set once during
     * construction.
     */
    constructor (uint256 emissionStartTimestamp, uint256 initialSupply) ERC20('NFTLToken','NFTL') {
        emissionStart = emissionStartTimestamp;
        emissionEnd = emissionStartTimestamp + (1 days * 365 * 5);
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Permissioning not added because it is only callable once. It is set right after deployment and verified.
     */
    function setNFTAddress(address nftAddress) public {
        require(_nftAddress == address(0), "Already set");
        _nftAddress = nftAddress;
    }
    
    /**
     * @dev When accumulated NFTL have last been claimed for a NFT index
     */
    function lastClaim(uint256 tokenIndex) public view returns (uint256) {
        require(INifty(_nftAddress).ownerOf(tokenIndex) != address(0), "Owner cannot be 0 address");
        require(tokenIndex < INifty(_nftAddress).totalSupply(), "NFT at index has not been minted yet");

        uint256 lastClaimed = uint256(_lastClaim[tokenIndex]) != 0 ? uint256(_lastClaim[tokenIndex]) : emissionStart;
        return lastClaimed;
    }
    
    /**
     * @dev Accumulated NFTL tokens for a NFT token index.
     */
    function accumulated(uint256 tokenIndex) public view returns (uint256) {
        require(block.timestamp > emissionStart, "Emission has not started yet");
        require(INifty(_nftAddress).ownerOf(tokenIndex) != address(0), "Owner cannot be 0 address");
        require(tokenIndex < INifty(_nftAddress).totalSupply(), "NFT at index has not been minted yet");

        uint256 lastClaimed = lastClaim(tokenIndex);
        // Sanity check if last claim was on or after emission end
        if (lastClaimed >= emissionEnd) return 0;

        uint256 accumulationPeriod = block.timestamp < emissionEnd ? block.timestamp : emissionEnd; // Getting the min value of both
        uint256 totalAccumulated = (accumulationPeriod - lastClaimed) * EMISSION_PER_DAY / 1 days;

        // If claim hasn't been done before for the index, add initial allotment (plus prereveal multiplier if applicable)
        if (lastClaimed == emissionStart) {
            totalAccumulated = totalAccumulated + INITIAL_ALLOTMENT;
        }
        return totalAccumulated;
    }

    /**
     * @dev Claim mints NFTL and supports multiple NFT token indices at once.
     */
    function claim(uint256[] memory tokenIndices) public returns (uint256) {
        require(block.timestamp > emissionStart, "Emission has not started yet");

        uint256 totalClaimQty = 0;
        for (uint i = 0; i < tokenIndices.length; i++) {
            // Sanity check for non-minted index
            require(tokenIndices[i] < INifty(_nftAddress).totalSupply(), "NFT at index has not been minted yet");
            // Duplicate token index check
            for (uint j = i + 1; j < tokenIndices.length; j++) {
                require(tokenIndices[i] != tokenIndices[j], "Duplicate token index");
            }

            uint tokenIndex = tokenIndices[i];
            require(INifty(_nftAddress).ownerOf(tokenIndex) == msg.sender, "Sender is not the owner");

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