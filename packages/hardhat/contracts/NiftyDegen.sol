// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./NameableCharacter.sol";
import "./AllowedTraitsStorage.sol";

import "hardhat/console.sol";

contract NiftyDegen is NameableCharacter {
    using Counters for Counters.Counter;

    /// @notice Counter for number of minted characters
    Counters.Counter public totalSupply;

    /// @notice Max number of mintable characters
    uint256 public constant MAX_SUPPLY = 5000;

    /// @notice Special characters reserved for future giveaways
    uint256 public constant SPECIAL_CHARACTERS = 100;

    /// @dev Available traits storage address
    address internal immutable _storageAddress;

    string arweaveGeneratorHash = "-eEz1VUXZE9EDaEyEe927S_TV53OGBPN4LXobDGkaWA";
    string ipfsGeneratorHash = "Qmc4sLXQPVyuGCi71Z2G7ezanhn9NjmyPwxAw2BFaCFsgT";

    event GeneratorUpdated(
        string previousArweaveHash,
        string newArweaveHash,
        string previousIpfsHash,
        string newIpfsHash
    );

    /**
     * @notice Construct the Nifty League NFTs
     * @param nftlAddress Address of verified Nifty League NFTL contract
     * @param storageAddress Address of verified Allowed Traits Storage
     */
    constructor(address nftlAddress, address storageAddress) NiftyLeagueCharacter(nftlAddress, "NiftyDegen", "DEGEN") {
        _storageAddress = storageAddress;
    }

    /**
     * @dev Base URI for computing {tokenURI}. Overrides ERC721 default.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://niftydudes.com/metadata/";
    }

    /**
     * @dev Gets current NFT Price
     */
    function getNFTPrice() public view returns (uint256) {
        uint256 currentSupply = totalSupply.current();
        require(
            currentSupply < MAX_SUPPLY - SPECIAL_CHARACTERS || (_msgSender() == owner() && currentSupply < MAX_SUPPLY),
            "Sale has already ended"
        );

        if (currentSupply >= 4900) {
            return 0; // 4900 - 5000 free special giveaway characters
        } else if (currentSupply >= 4750) {
            return 1250000000000000000; // 4750 - 4900 1.25 ETH
        } else if (currentSupply >= 4250) {
            return 1000000000000000000; // 4250 - 4750 1.0 ETH
        } else if (currentSupply >= 3250) {
            return 750000000000000000; // 3250 - 4250 0.75 ETH
        } else if (currentSupply >= 2250) {
            return 500000000000000000; // 2250 - 3250 0.5 ETH
        } else if (currentSupply >= 1250) {
            return 250000000000000000; // 1250 - 2250 0.25 ETH
        } else if (currentSupply >= 500) {
            return 100000000000000000; // 500 - 1250 0.1 ETH
        } else {
            return 50000000000000000; // 0 - 500 0.05 ETH
        }
    }

    function purchase(
        uint256[5] memory character,
        uint256[5] memory head,
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

    function _validateTraits(
        uint256[5] memory char,
        uint256[5] memory head,
        uint256[6] memory cloth,
        uint256[6] memory acc,
        uint256[2] memory items
    ) private view {
        uint256 tribe = char[0];
        require(tribe > 0 && (tribe < 7 || (tribe < 10 && msg.sender == owner())), "Tribe incorrect");
        require(char[1] == EMPTY_TRAIT || (char[1] >= 10 && char[1] < 75), "Skin color incorrect");
        require(char[2] == EMPTY_TRAIT || (char[2] >= 75 && char[2] < 135), "Secondary skin color incorrect");
        require(char[3] == EMPTY_TRAIT || (char[3] >= 135 && char[3] < 144), "Eye color incorrect");
        require(char[4] == EMPTY_TRAIT || (char[4] >= 144 && char[4] < 200), "Secondary eye color incorrect");
        require(head[0] == EMPTY_TRAIT || (head[0] >= 200 && head[0] < 204), "Hair incorrect");
        require(head[1] == EMPTY_TRAIT || (head[1] >= 204 && head[1] < 205), "Mouth incorrect");
        require(head[2] == EMPTY_TRAIT || (head[2] >= 205 && head[2] < 207), "Beard incorrect");
        require(head[3] == EMPTY_TRAIT || (head[3] >= 207 && head[3] < 208), "Facemarks incorrect");
        require(head[4] == EMPTY_TRAIT || (head[4] >= 208 && head[4] < 210), "Misc incorrect");
        require(cloth[0] == EMPTY_TRAIT || (cloth[0] >= 210 && cloth[0] < 218), "Top incorrect");
        require(cloth[1] == EMPTY_TRAIT || (cloth[1] >= 218 && cloth[1] < 226), "Outerwear incorrect");
        require(cloth[2] == EMPTY_TRAIT || (cloth[2] >= 226 && cloth[2] < 228), "Print incorrect");
        require(cloth[3] == EMPTY_TRAIT || (cloth[3] >= 228 && cloth[3] < 239), "Bottom incorrect");
        require(cloth[4] == EMPTY_TRAIT || (cloth[4] >= 239 && cloth[4] < 244), "Footwear incorrect");
        require(cloth[5] == EMPTY_TRAIT || (cloth[5] >= 244 && cloth[5] < 245), "Belt incorrect");
        require(acc[0] == EMPTY_TRAIT || (acc[0] >= 245 && acc[0] < 276), "Hat incorrect");
        require(acc[1] == EMPTY_TRAIT || (acc[1] >= 276 && acc[1] < 285), "Eyewear incorrect");
        require(acc[2] == EMPTY_TRAIT || (acc[2] >= 285 && acc[2] < 286), "Piercings incorrect");
        require(acc[3] == EMPTY_TRAIT || (acc[3] >= 286 && acc[3] < 287), "Wist accessory incorrect");
        require(acc[4] == EMPTY_TRAIT || (acc[4] >= 287 && acc[4] < 289), "Hand accessory incorrect");
        require(acc[5] == EMPTY_TRAIT || (acc[5] >= 289 && acc[5] < 292), "Neckwear incorrect");
        require(items[0] == EMPTY_TRAIT || (items[0] >= 292 && items[0] < 294), "Left item incorrect");
        require(items[1] == EMPTY_TRAIT || (items[1] >= 294 && items[1] < 296), "Right item incorrect");

        require(isAvailableAndAllowedTrait(tribe, char[1]), "Skin color unavailable");
        require(isAvailableAndAllowedTrait(tribe, char[2]), "Secondary Skin color unavailable");
        require(isAvailableAndAllowedTrait(tribe, char[3]), "Eye color unavailable");
        require(isAvailableAndAllowedTrait(tribe, char[4]), "Secondary eye color unavailable");
        require(isAvailableAndAllowedTrait(tribe, head[0]), "Hair unavailable");
        require(isAvailableAndAllowedTrait(tribe, head[1]), "Mouth unavailable");
        require(isAvailableAndAllowedTrait(tribe, head[2]), "Beard unavailable");
        require(isAvailableAndAllowedTrait(tribe, head[3]), "Facemarks unavailable");
        require(isAvailableAndAllowedTrait(tribe, head[4]), "Misc unavailable");
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

    function _generateTraitCombo(
        uint256[5] memory character,
        uint256[5] memory head,
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
        traits |= head[3] << 80;
        traits |= head[4] << 90;
        traits |= clothing[0] << 100;
        traits |= clothing[1] << 110;
        traits |= clothing[2] << 120;
        traits |= clothing[3] << 130;
        traits |= clothing[4] << 140;
        traits |= clothing[5] << 150;
        traits |= accessories[0] << 160;
        traits |= accessories[1] << 170;
        traits |= accessories[2] << 180;
        traits |= accessories[3] << 190;
        traits |= accessories[4] << 200;
        traits |= accessories[5] << 210;
        traits |= items[0] << 220;
        traits |= items[1] << 230;
        return traits;
    }

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
        emit CharacterGenerated(newCharId, traitCombo, msg.sender);
    }

    function _removeRandomTrait(uint256 newCharId, uint256 traitCombo) private {
        if (
            removedTraits.length < 100 ||
            (removedTraits.length < 250 && newCharId % 2 == 0) ||
            (removedTraits.length < 350 && newCharId % 3 == 0) ||
            (removedTraits.length < 450 && newCharId % 4 == 0)
        ) {
            uint256 randomIndex = _rngIndex(newCharId);
            uint16 randomTrait = _unpackUint10(traitCombo >> randomIndex);
            if (randomTrait != 0) {
                removedTraits.push(randomTrait);
                _removedTraitsMap[randomTrait] = true;
            }
        }
    }

    function _rngIndex(uint256 id) private view returns (uint256) {
        uint256 randomHash = uint256(keccak256(abi.encodePacked(id, block.timestamp, block.difficulty)));
        return ((randomHash % 23) + 1) * 10;
    }

    function _unpackUint10(uint256 traits) private pure returns (uint16) {
        return uint16(traits) & 0x03FF;
    }

    function getCharacterTraits(uint256 tokenId) external view returns (CharacterTraits memory _characterTraits) {
        require(_exists(tokenId), "nonexistent token");
        Character memory character = _characters[tokenId];
        _characterTraits.tribe = _unpackUint10(character.traits);
        _characterTraits.skinColor = _unpackUint10(character.traits >> 10);
        _characterTraits.secondarySkinColor = _unpackUint10(character.traits >> 20);
        _characterTraits.eyeColor = _unpackUint10(character.traits >> 30);
        _characterTraits.secondaryEyeColor = _unpackUint10(character.traits >> 40);
        _characterTraits.hair = _unpackUint10(character.traits >> 50);
        _characterTraits.mouth = _unpackUint10(character.traits >> 60);
        _characterTraits.beard = _unpackUint10(character.traits >> 70);
        _characterTraits.facemarks = _unpackUint10(character.traits >> 80);
        _characterTraits.misc = _unpackUint10(character.traits >> 90);
        _characterTraits.top = _unpackUint10(character.traits >> 100);
        _characterTraits.outerwear = _unpackUint10(character.traits >> 110);
        _characterTraits.topPrint = _unpackUint10(character.traits >> 120);
        _characterTraits.bottom = _unpackUint10(character.traits >> 130);
        _characterTraits.footwear = _unpackUint10(character.traits >> 140);
        _characterTraits.belt = _unpackUint10(character.traits >> 150);
        _characterTraits.hat = _unpackUint10(character.traits >> 160);
        _characterTraits.eyewear = _unpackUint10(character.traits >> 170);
        _characterTraits.piercings = _unpackUint10(character.traits >> 180);
        _characterTraits.wrists = _unpackUint10(character.traits >> 190);
        _characterTraits.hands = _unpackUint10(character.traits >> 200);
        _characterTraits.neckwear = _unpackUint10(character.traits >> 210);
        _characterTraits.leftItem = _unpackUint10(character.traits >> 220);
        _characterTraits.rightItem = _unpackUint10(character.traits >> 230);
    }

    function isAvailableAndAllowedTrait(uint256 tribe, uint256 trait) public view returns (bool) {
        AllowedTraitsStorage traitsStorage = AllowedTraitsStorage(_storageAddress);
        return isAvailableTrait(trait) && traitsStorage.isAllowedTrait(tribe, trait);
    }

    function setGeneratorHashes(string memory newArweave, string memory newIpfs) external onlyOwner {
        string memory prevArweave = arweaveGeneratorHash;
        string memory prevIpfs = ipfsGeneratorHash;

        arweaveGeneratorHash = newArweave;
        ipfsGeneratorHash = newIpfs;

        emit GeneratorUpdated(prevArweave, newArweave, prevIpfs, newIpfs);
    }

    function getArweaveImgHash() external pure returns (string memory) {
        return "QRz8SYEKUXPl6b13pIKizKb7jji1v95RKmlUGqspuMQ";
    }

    function getIpfsImgHash() external pure returns (string memory) {
        return "QmNWdHPzZ2qcd1JJXuZZGUzeqExzLfSSMrgJMoNWf1fQgs";
    }

    function getArweaveGeneratorHash() external view returns (string memory) {
        return arweaveGeneratorHash;
    }

    function getIpfsGeneratorHash() external view returns (string memory) {
        return ipfsGeneratorHash;
    }
}
