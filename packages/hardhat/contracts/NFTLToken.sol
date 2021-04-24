// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./INifty.sol";

import "hardhat/console.sol";

/**
 *
 * NFTL Contract (The native token of Nifty League)
 * @dev Extends standard ERC20 contract
 */
contract NFTLToken is ERC20 {
    using SafeMath for uint256;

    // Constants
    uint256 private constant SECONDS_IN_A_DAY = 86400;
    uint256 private constant INITIAL_ALLOTMENT = 1830 * (10 ** 18);
    uint256 private constant PRE_REVEAL_MULTIPLIER = 2;

    // Public variables
    uint256 public emissionStart;
    uint256 public emissionEnd; 
    uint256 public emissionPerDay = 10 * (10 ** 18);

    mapping(uint256 => uint256) private _lastClaim;

    address private _masksAddress;

    /**
     * @dev Sets the values for {name}, {symbol}, and initalizes {emissionStart}
     *
     * All three of these values are immutable: they can only be set once during
     * construction.
     */
    constructor (uint256 emissionStartTimestamp, uint256 initialSupply) ERC20('NFTLToken','NFTL') {
        emissionStart = emissionStartTimestamp;
        emissionEnd = emissionStartTimestamp + (SECONDS_IN_A_DAY * 365 * 5);
        console.log('emissionStart %s', emissionStart);
        console.log('emissionEnd %s', emissionEnd);
        _mint(msg.sender, initialSupply);
    }
    
    /**
     * @dev When accumulated NCTs have last been claimed for a Hashmask index
     */
    function lastClaim(uint256 tokenIndex) public view returns (uint256) {
        require(INifty(_masksAddress).ownerOf(tokenIndex) != address(0), "Owner cannot be 0 address");
        require(tokenIndex < INifty(_masksAddress).totalSupply(), "NFT at index has not been minted yet");

        uint256 lastClaimed = uint256(_lastClaim[tokenIndex]) != 0 ? uint256(_lastClaim[tokenIndex]) : emissionStart;
        return lastClaimed;
    }
    
    /**
     * @dev Accumulated NCT tokens for a Hashmask token index.
     */
    function accumulated(uint256 tokenIndex) public view returns (uint256) {
        require(block.timestamp > emissionStart, "Emission has not started yet");
        require(INifty(_masksAddress).ownerOf(tokenIndex) != address(0), "Owner cannot be 0 address");
        require(tokenIndex < INifty(_masksAddress).totalSupply(), "NFT at index has not been minted yet");

        uint256 lastClaimed = lastClaim(tokenIndex);

        // Sanity check if last claim was on or after emission end
        if (lastClaimed >= emissionEnd) return 0;

        uint256 accumulationPeriod = block.timestamp < emissionEnd ? block.timestamp : emissionEnd; // Getting the min value of both
        uint256 totalAccumulated = accumulationPeriod.sub(lastClaimed).mul(emissionPerDay).div(SECONDS_IN_A_DAY);

        // If claim hasn't been done before for the index, add initial allotment (plus prereveal multiplier if applicable)
        if (lastClaimed == emissionStart) {
            uint256 initialAllotment = INifty(_masksAddress).isMintedBeforeReveal(tokenIndex) == true ? INITIAL_ALLOTMENT.mul(PRE_REVEAL_MULTIPLIER) : INITIAL_ALLOTMENT;
            totalAccumulated = totalAccumulated.add(initialAllotment);
        }

        return totalAccumulated;
    }

    /**
     * @dev Permissioning not added because it is only callable once. It is set right after deployment and verified.
     */
    function setMasksAddress(address masksAddress) public {
        require(_masksAddress == address(0), "Already set");
        
        _masksAddress = masksAddress;
    }

    /**
     * @dev Claim mints NCTs and supports multiple Hashmask token indices at once.
     */
    function claim(uint256[] memory tokenIndices) public returns (uint256) {
        require(block.timestamp > emissionStart, "Emission has not started yet");

        uint256 totalClaimQty = 0;
        for (uint i = 0; i < tokenIndices.length; i++) {
            // Sanity check for non-minted index
            require(tokenIndices[i] < INifty(_masksAddress).totalSupply(), "NFT at index has not been minted yet");
            // Duplicate token index check
            for (uint j = i + 1; j < tokenIndices.length; j++) {
                require(tokenIndices[i] != tokenIndices[j], "Duplicate token index");
            }

            uint tokenIndex = tokenIndices[i];
            require(INifty(_masksAddress).ownerOf(tokenIndex) == msg.sender, "Sender is not the owner");

            uint256 claimQty = accumulated(tokenIndex);
            if (claimQty != 0) {
                totalClaimQty = totalClaimQty.add(claimQty);
                _lastClaim[tokenIndex] = block.timestamp;
            }
        }

        require(totalClaimQty != 0, "No accumulated NCT");
        _mint(msg.sender, totalClaimQty);
        return totalClaimQty;
    }
}