// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./NameableCharacter.sol";
import "./AllowedColorsStorage.sol";

import "hardhat/console.sol";

/**
 * @title NiftyDegen NFT (The OG NFTs of Nifty League on Ethereum)
 * @dev Extends NameableCharacter and NiftyLeagueCharacter (ERC721)
 */
contract NiftyDegen is NameableCharacter {
    using Counters for Counters.Counter;

    /// @notice Counter for number of minted characters
    Counters.Counter public totalSupply;

    /// @notice Max number of mintable characters
    uint256 public constant MAX_SUPPLY = 10000;

    /// @notice Special characters reserved for future giveaways
    uint256 public constant SPECIAL_CHARACTERS = 100;

    /// @dev Available traits storage address
    address internal immutable _storageAddress;

    /// @dev Set if we want to override bonding curve pricing
    uint256 private _manualMintPrice;

    /**
     * @notice Construct the Nifty League NFTs
     * @param nftlAddress Address of verified Nifty League NFTL contract
     * @param storageAddress Address of verified Allowed Colors Storage
     */
    constructor(address nftlAddress, address storageAddress) NiftyLeagueCharacter(nftlAddress, "NiftyDegen", "DEGEN") {
        _storageAddress = storageAddress;
    }

    // External functions

    function overrideMintPrice(uint256 newPrice) external onlyOwner {
        _manualMintPrice = newPrice;
    }

    /**
     * @notice Validate character traits and purchase a Nifty Degen NFT
     * @param character Indexed list of character traits
     * @param head Indexed list of head traits
     * @param clothing Indexed list of clothing options
     * @param accessories Indexed list of accessories
     * @param items Indexed list of items
     * @dev Order is based on character selector indexes
     */
    function purchase(
        uint256[5] memory character,
        uint256[3] memory head,
        uint256[6] memory clothing,
        uint256[6] memory accessories,
        uint256[2] memory items
    ) external payable {
        require(!paused() || msg.sender == owner(), "Purchases are paused.");
        require(msg.value == getNFTPrice() || msg.sender == owner(), "Ether value incorrect");
        _validateTraits(character, head, clothing, accessories, items);
        uint256 traitCombo = _generateTraitCombo(character, head, clothing, accessories, items);
        _storeNewCharacter(traitCombo);
    }

    /**
     * @notice Retrieve a list of character traits for a token
     * @param tokenId ID of NFT
     * @dev Permissioning not added because it is only callable once.
     * @return _characterTraits - indexed list of character traits
     */
    function getCharacterTraits(uint256 tokenId) external view returns (CharacterTraits memory _characterTraits) {
        require(_exists(tokenId), "nonexistent token");
        Character memory character = _characters[tokenId];
        _characterTraits.tribe = _unpackUint10(character.traits);
        _characterTraits.skinColor = _unpackUint10(character.traits >> 10);
        _characterTraits.furColor = _unpackUint10(character.traits >> 20);
        _characterTraits.eyeColor = _unpackUint10(character.traits >> 30);
        _characterTraits.pupilColor = _unpackUint10(character.traits >> 40);
        _characterTraits.hair = _unpackUint10(character.traits >> 50);
        _characterTraits.mouth = _unpackUint10(character.traits >> 60);
        _characterTraits.beard = _unpackUint10(character.traits >> 70);
        _characterTraits.top = _unpackUint10(character.traits >> 80);
        _characterTraits.outerwear = _unpackUint10(character.traits >> 90);
        _characterTraits.print = _unpackUint10(character.traits >> 100);
        _characterTraits.bottom = _unpackUint10(character.traits >> 110);
        _characterTraits.footwear = _unpackUint10(character.traits >> 120);
        _characterTraits.belt = _unpackUint10(character.traits >> 130);
        _characterTraits.hat = _unpackUint10(character.traits >> 140);
        _characterTraits.eyewear = _unpackUint10(character.traits >> 150);
        _characterTraits.piercings = _unpackUint10(character.traits >> 160);
        _characterTraits.wrists = _unpackUint10(character.traits >> 170);
        _characterTraits.hands = _unpackUint10(character.traits >> 180);
        _characterTraits.neckwear = _unpackUint10(character.traits >> 190);
        _characterTraits.leftItem = _unpackUint10(character.traits >> 200);
        _characterTraits.rightItem = _unpackUint10(character.traits >> 210);
    }

    // Public functions

    /**
     * @notice Gets current NFT Price based on current supply
     * @return Current price to mint 1 NFT
     */
    function getNFTPrice() public view returns (uint256) {
        uint256 currentSupply = totalSupply.current();
        require(
            currentSupply < MAX_SUPPLY - SPECIAL_CHARACTERS || (_msgSender() == owner() && currentSupply < MAX_SUPPLY),
            "Sale has already ended"
        );
        if (_manualMintPrice > 0) return _manualMintPrice;
        if (currentSupply >= 9900 || currentSupply <= 5) {
            return 0; // 9900 - 10000 free special giveaway characters
        } else if (currentSupply >= 9500) {
            return 1000000000000000000; // 9500 - 9900 1 ETH
        } else if (currentSupply >= 8500) {
            return 750000000000000000; // 8500 - 9500 0.75 ETH
        } else if (currentSupply >= 6500) {
            return 500000000000000000; // 6500 - 8500 0.5 ETH
        } else if (currentSupply >= 4500) {
            return 250000000000000000; // 4500 - 6500 0.25 ETH
        } else if (currentSupply >= 2500) {
            return 100000000000000000; // 2500 - 4500 0.1 ETH
        } else if (currentSupply >= 1000) {
            return 50000000000000000; // 1000 - 2500 0.05 ETH
        } else {
            return 25000000000000000; // 0 - 1000 0.025 ETH
        }
    }

    /**
     * @notice Check if traits is allowed for tribe and hasn't been removed yet
     * @param tribe Tribe ID
     * @param trait Trait ID
     * @dev Trait types are restricted per tribe before deploy in AllowedColorsStorage
     * @return True if trait is available and allowed for tribe
     */
    function isAvailableAndAllowedTrait(uint256 tribe, uint256 trait) public view returns (bool) {
        if (trait == EMPTY_TRAIT) return true;
        if (trait >= 150) return isAvailableTrait(trait);
        AllowedColorsStorage colorsStorage = AllowedColorsStorage(_storageAddress);
        return isAvailableTrait(trait) && colorsStorage.isAllowedColor(tribe, trait);
    }

    // Internal functions

    /**
     * @notice Base URI for computing {tokenURI}. Overrides ERC721 default
     * @return Base token URI linked to IPFS metadata
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://nifty-league.com/ipfs/metadata/";
    }

    // Private functions

    /**
     * @notice Validate character traits
     * @param char Indexed list of character traits
     * @param head Indexed list of head traits
     * @param cloth Indexed list of clothing options
     * @param acc Indexed list of accessories
     * @param items Indexed list of items
     */
    function _validateTraits(
        uint256[5] memory char,
        uint256[3] memory head,
        uint256[6] memory cloth,
        uint256[6] memory acc,
        uint256[2] memory items
    ) private view {
        uint256 tribe = char[0];
        require(tribe > 0 && (tribe <= 6 || (tribe <= 9 && msg.sender == owner())), "Tribe incorrect");
        require(_isTraitInRange(char[1], 10, 69) || _isTraitInRange(char[1], 119, 149), "Skin color incorrect");
        require(_isTraitInRange(char[2], 70, 100) || _isTraitInRange(char[2], 119, 149), "Fur color incorrect");
        require(_isTraitInRange(char[3], 101, 109) || _isTraitInRange(char[3], 119, 149), "Eye color incorrect");
        require(_isTraitInRange(char[4], 110, 118) || _isTraitInRange(char[4], 119, 149), "Pupil color incorrect");
        require(_isTraitInRange(head[0], 150, 262), "Hair incorrect");
        require(_isTraitInRange(head[1], 263, 276), "Mouth incorrect");
        require(_isTraitInRange(head[2], 277, 339), "Beard incorrect");
        require(_isTraitInRange(cloth[0], 340, 438), "Top incorrect");
        require(_isTraitInRange(cloth[1], 439, 514), "Outerwear incorrect");
        require(_isTraitInRange(cloth[2], 515, 555), "Print incorrect");
        require(_isTraitInRange(cloth[3], 556, 657), "Bottom incorrect");
        require(_isTraitInRange(cloth[4], 658, 694), "Footwear incorrect");
        require(_isTraitInRange(cloth[5], 695, 706), "Belt incorrect");
        require(_isTraitInRange(acc[0], 707, 749), "Hat incorrect");
        require(_isTraitInRange(acc[1], 750, 799), "Eyewear incorrect");
        require(_isTraitInRange(acc[2], 800, 809), "Piercings incorrect");
        require(_isTraitInRange(acc[3], 810, 821), "Wist accessory incorrect");
        require(_isTraitInRange(acc[4], 822, 846), "Hand accessory incorrect");
        require(_isTraitInRange(acc[5], 847, 883), "Neckwear incorrect");
        require(_isTraitInRange(items[0], 884, 975), "Left item incorrect");
        require(_isTraitInRange(items[1], 976, 1023), "Right item incorrect");

        require(isAvailableAndAllowedTrait(tribe, char[1]), "Skin color unavailable");
        require(isAvailableAndAllowedTrait(tribe, char[2]), "Fur color unavailable");
        require(isAvailableAndAllowedTrait(tribe, char[3]), "Eye color unavailable");
        require(isAvailableAndAllowedTrait(tribe, char[4]), "Pupil color unavailable");
        require(isAvailableAndAllowedTrait(tribe, head[0]), "Hair unavailable");
        require(isAvailableAndAllowedTrait(tribe, head[1]), "Mouth unavailable");
        require(isAvailableAndAllowedTrait(tribe, head[2]), "Beard unavailable");
        require(isAvailableAndAllowedTrait(tribe, cloth[0]), "Top unavailable");
        require(isAvailableAndAllowedTrait(tribe, cloth[1]), "Outerwear unavailable");
        require(isAvailableAndAllowedTrait(tribe, cloth[2]), "Print unavailable");
        require(isAvailableAndAllowedTrait(tribe, cloth[3]), "Bottom unavailable");
        require(isAvailableAndAllowedTrait(tribe, cloth[4]), "Footwear unavailable");
        require(isAvailableAndAllowedTrait(tribe, cloth[5]), "Belt unavailable");
        require(isAvailableAndAllowedTrait(tribe, acc[0]), "Hat unavailable");
        require(isAvailableAndAllowedTrait(tribe, acc[1]), "Eyewear unavailable");
        require(isAvailableAndAllowedTrait(tribe, acc[2]), "Piercings unavailable");
        require(isAvailableAndAllowedTrait(tribe, acc[3]), "Wrist accessory unavailable");
        require(isAvailableAndAllowedTrait(tribe, acc[4]), "Hand accessory unavailable");
        require(isAvailableAndAllowedTrait(tribe, acc[5]), "Neckwear unavailable");
        require(isAvailableAndAllowedTrait(tribe, items[0]), "Left item unavailable");
        require(isAvailableAndAllowedTrait(tribe, items[1]), "Right item unavailable");
    }

    /**
     * @notice Generates uint256 bitwise trait combo
     * @param character Indexed list of character traits
     * @param head Indexed list of head traits
     * @param clothing Indexed list of clothing options
     * @param accessories Indexed list of accessories
     * @param items Indexed list of items
     * @dev Each trait is stored in 10 bits
     * @return Trait combo packed into uint256
     */
    function _generateTraitCombo(
        uint256[5] memory character,
        uint256[3] memory head,
        uint256[6] memory clothing,
        uint256[6] memory accessories,
        uint256[2] memory items
    ) private pure returns (uint256) {
        uint256 traits = character[0];
        traits |= character[1] << 10;
        traits |= character[2] << 20;
        traits |= character[3] << 30;
        traits |= character[4] << 40;
        traits |= head[0] << 50;
        traits |= head[1] << 60;
        traits |= head[2] << 70;
        traits |= clothing[0] << 80;
        traits |= clothing[1] << 90;
        traits |= clothing[2] << 100;
        traits |= clothing[3] << 110;
        traits |= clothing[4] << 120;
        traits |= clothing[5] << 130;
        traits |= accessories[0] << 140;
        traits |= accessories[1] << 150;
        traits |= accessories[2] << 160;
        traits |= accessories[3] << 170;
        traits |= accessories[4] << 180;
        traits |= accessories[5] << 190;
        traits |= items[0] << 200;
        traits |= items[1] << 210;
        return traits;
    }

    /**
     * @notice Mints NFT if unique and attempts to remove a random trait
     * @param traitCombo Trait combo provided from _generateTraitCombo
     */
    function _storeNewCharacter(uint256 traitCombo) private {
        require(isUnique(traitCombo), "NFT trait combo already exists");
        _existMap[traitCombo] = true;
        totalSupply.increment();
        uint256 newCharId = totalSupply.current();
        Character memory newChar;
        newChar.traits = traitCombo;
        _characters[newCharId] = newChar;
        _removeRandomTrait(newCharId, traitCombo);
        _safeMint(msg.sender, newCharId);
    }

    /**
     * @notice Attempts to remove a random trait from availability
     * @param newCharId ID of newly generated NFT
     * @param traitCombo Trait combo provided from _generateTraitCombo
     * @dev Any trait id besides 0 or tribe ids can be removed
     */
    function _removeRandomTrait(uint256 newCharId, uint256 traitCombo) private {
        if (
            (removedTraits.length < 200 && newCharId % 4 == 0) ||
            (removedTraits.length < 400 && newCharId % 6 == 0) ||
            (removedTraits.length < 600 && newCharId % 8 == 0) ||
            (removedTraits.length < 800 && newCharId % 10 == 0)
        ) {
            uint256 randomIndex = _rngIndex(newCharId);
            uint16 randomTrait = _unpackUint10(traitCombo >> randomIndex);
            // Base character colors cannot be removed
            if (
                randomTrait != 0 &&
                randomTrait != 10 &&
                randomTrait != 22 &&
                randomTrait != 29 &&
                randomTrait != 37 &&
                randomTrait != 48 &&
                randomTrait != 59 &&
                randomTrait != 70 &&
                randomTrait != 82 &&
                randomTrait != 90 &&
                randomTrait != 101 &&
                randomTrait != 110
            ) {
                removedTraits.push(randomTrait);
                _removedTraitsMap[randomTrait] = true;
            }
        }
    }

    /**
     * @notice Simulate randomness
     * @param tokenId ID of newly generated NFT
     * @dev Randomness can be anticipated and exploited but is not crucial to NFT sale
     * @return Number from 1-21
     */
    function _rngIndex(uint256 tokenId) private view returns (uint256) {
        uint256 randomHash = uint256(keccak256(abi.encodePacked(tokenId, block.timestamp, block.difficulty)));
        return ((randomHash % 21) + 1) * 10;
    }

    /**
     * @notice Unpack trait id from trait list
     * @param traits Section within trait combo
     * @return Trait ID
     */
    function _unpackUint10(uint256 traits) private pure returns (uint16) {
        return uint16(traits) & 0x03FF;
    }

    /**
     * @notice Checks whether trait id is in range of lower/upper bounds
     * @param lower lower range-bound
     * @param upper upper range-bound
     * @return True if in range
     */
    function _isTraitInRange(
        uint256 trait,
        uint256 lower,
        uint256 upper
    ) private pure returns (bool) {
        return trait == EMPTY_TRAIT || (trait >= lower && trait <= upper);
    }
}
