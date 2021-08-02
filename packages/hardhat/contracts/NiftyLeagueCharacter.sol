// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title NiftyLeagueCharacter (Base NFT for Nifty League characters)
 * @dev Extends standard ERC721 contract from OpenZeppelin
 */
contract NiftyLeagueCharacter is ERC721, Ownable, Pausable {
    using Strings for string;

    struct Character {
        uint256 traits;
        string name;
    }
    struct CharacterTraits {
        // character
        uint16 tribe;
        uint16 skinColor;
        uint16 furColor;
        uint16 eyeColor;
        uint16 pupilColor;
        //  head
        uint16 hair;
        uint16 mouth;
        uint16 beard;
        //  clothing
        uint16 top;
        uint16 outerwear;
        uint16 print;
        uint16 bottom;
        uint16 footwear;
        uint16 belt;
        //  accessories
        uint16 hat;
        uint16 eyewear;
        uint16 piercings;
        uint16 wrists;
        uint16 hands;
        uint16 neckwear;
        //  items
        uint16 leftItem;
        uint16 rightItem;
    }
    /// @dev Mapping of created character structs from token ID
    mapping(uint256 => Character) internal _characters;

    /// @dev Expected uint if no specific trait is selected
    uint256 internal constant EMPTY_TRAIT = 0;

    /// @dev Mapping if character trait combination exist
    mapping(uint256 => bool) internal _existMap;

    /// @dev Mapping if character trait has been removed
    mapping(uint256 => bool) internal _removedTraitsMap;

    /// @dev Array initialized in order to return removed trait list
    uint16[] internal removedTraits;

    /// @dev Nifty League NFTL token address
    address internal immutable _nftlAddress;

    /**
     * @notice Construct the Nifty League NFTs
     * @param nftlAddress Address of verified Nifty League NFTL contract
     */
    constructor(
        address nftlAddress,
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {
        _nftlAddress = nftlAddress;
    }

    // External functions

    /**
     * @notice Triggers stopped state
     * @dev Requirements: The contract must not be paused
     */
    function pauseMinting() external onlyOwner {
        _pause();
    }

    /**
     * @notice Returns to normal state
     * @dev Requirements: The contract must be paused
     */
    function unpauseMinting() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Withdraw ether from this contract (Callable by owner)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    /**
     * @notice Retrieve a list of removed character traits
     * @return removedTraits - list of unavailable character traits
     */
    function getRemovedTraits() external view returns (uint16[] memory) {
        return removedTraits;
    }

    // Public functions

    /**
     * @notice Check whether trait combo is unique
     * @param traitCombo Generated trait combo packed into uint256
     * @return True if combo is unique and available
     */
    function isUnique(uint256 traitCombo) public view returns (bool) {
        return !_existMap[traitCombo];
    }

    /**
     * @notice Check whether trait is still available
     * @param trait ID of trait
     * @return True if trait has not been removed
     */
    function isAvailableTrait(uint256 trait) public view returns (bool) {
        return !_removedTraitsMap[trait];
    }
}
