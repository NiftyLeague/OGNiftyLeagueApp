// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

interface INFTL is IERC20 {
    function burn(uint256 burnQuantity) external returns (bool);
}

contract NiftyLeagueCharacter is ERC721, Ownable, Pausable {
    using Strings for string;
    using Counters for Counters.Counter;

    struct Character {
        uint256 traits;
        string name;
    }
    struct CharacterTraits {
        // character
        uint8 tribe;
        uint8 skinColor;
        uint8 secondarySkinColor;
        uint8 eyeColor;
        uint8 secondaryEyeColor;
        //  head
        uint8 hair;
        uint8 mouth;
        uint8 beard;
        uint8 facemarks;
        uint8 misc;
        //  clothing
        uint8 top;
        uint8 outerwear;
        uint8 topPrint;
        uint8 bottom;
        uint8 footwear;
        uint8 belt;
        //  accessories
        uint8 hat;
        uint8 eyewear;
        uint8 piercings;
        uint8 wrists;
        uint8 hands;
        uint8 neckwear;
        //  items
        uint8 leftItem;
        uint8 rightItem;
    }

    /// @dev Mapping of created character structs from token ID
    mapping(uint256 => Character) private _characters;

    /// @notice Counter for number of minted characters
    Counters.Counter public totalSupply;

    /// @notice Max number of mintable characters
    uint256 public constant MAX_SUPPLY = 5000;

    /// @notice Special characters reserved for future giveaways
    uint256 public constant SPECIAL_CHARACTERS = 100;

    /// @notice Cost to change character name in NFTL
    uint256 public constant NAME_CHANGE_PRICE = 1000e18; // 1000 NFTL

    /// @dev Expected uint if no specific trait is selected
    uint256 private constant EMPTY_TRAIT = 0;

    /// @dev Mapping if name string is already used
    mapping(string => bool) private _nameReserved;

    /// @dev Mapping if character trait combination exist
    mapping(uint256 => bool) private _existMap;

    /// @dev Mapping if character trait has been removed
    mapping(uint256 => bool) private _removedTraitsMap;

    /// @dev Array initialized in order to return removed trait list
    uint256[] private removedTraits;

    /// @dev Nifty League NFTL token address
    address private _nftlAddress;

    /// @dev Trait options available per character class
    uint256[] private apeTraits;

    string arweaveGeneratorHash = "-eEz1VUXZE9EDaEyEe927S_TV53OGBPN4LXobDGkaWA";
    string ipfsGeneratorHash = "Qmc4sLXQPVyuGCi71Z2G7ezanhn9NjmyPwxAw2BFaCFsgT";

    event NameUpdated(uint256 indexed tokenId, string previousName, string newName);
    event CharacterGenerated(uint256 indexed tokenId, uint256 traits, address sender);
    event GeneratorUpdated(
        string previousArweaveHash,
        string newArweaveHash,
        string previousIpfsHash,
        string newIpfsHash
    );

    /**
     * @notice Construct the Nifty Leage NFTs
     * @param nftlAddress Address of verified Nifty League NFTL contract
     */
    constructor(address nftlAddress) ERC721("GameCharacter", "CHAR") {
        _nftlAddress = nftlAddress;
    }

    /**
     * @dev Base URI for computing {tokenURI}. Overrides ERC721 default.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://niftydudes.com/metadata/";
    }

    /**
     * @dev Triggers stopped state.
     * Requirements: The contract must not be paused.
     */
    function pauseMinting() external onlyOwner {
        _pause();
    }

    /**
     * @dev Returns to normal state.
     * Requirements: The contract must be paused.
     */
    function unpauseMinting() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Withdraw ether from this contract (Callable by owner)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
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
        validateTraits(character, head, clothing, accessories, items);
        uint256 traitCombo = _generateTraitCombo(character, head, clothing, accessories, items);
        _storeNewCharacter(traitCombo);
    }

    function validateTraits(
        uint256[5] memory char,
        uint256[5] memory head,
        uint256[6] memory cloth,
        uint256[6] memory acc,
        uint256[2] memory items
    ) internal view {
        require(char[0] > 0 && (char[0] < 7 || (char[0] < 10 && msg.sender == owner())), "Tribe incorrect");
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

        require(isAvailableTrait(char[1]), "Skin color unavailable");
        require(isAvailableTrait(char[2]), "Secondary Skin color unavailable");
        require(isAvailableTrait(char[3]), "Eye color unavailable");
        require(isAvailableTrait(char[4]), "Secondary eye color unavailable");
        require(isAvailableTrait(head[0]), "Hair unavailable");
        require(isAvailableTrait(head[1]), "Mouth unavailable");
        require(isAvailableTrait(head[2]), "Beard unavailable");
        require(isAvailableTrait(head[3]), "Facemarks unavailable");
        require(isAvailableTrait(head[4]), "Misc unavailable");
        require(isAvailableTrait(cloth[0]), "Top unavailable");
        require(isAvailableTrait(cloth[1]), "Outerwear unavailable");
        require(isAvailableTrait(cloth[2]), "Print unavailable");
        require(isAvailableTrait(cloth[3]), "Bottom unavailable");
        require(isAvailableTrait(cloth[4]), "Footwear unavailable");
        require(isAvailableTrait(cloth[5]), "Belt unavailable");
        require(isAvailableTrait(acc[0]), "Hat unavailable");
        require(isAvailableTrait(acc[1]), "Eyewear unavailable");
        require(isAvailableTrait(acc[2]), "Piercings unavailable");
        require(isAvailableTrait(acc[3]), "Wrist accessory unavailable");
        require(isAvailableTrait(acc[4]), "Hand accessory unavailable");
        require(isAvailableTrait(acc[5]), "Neckwear unavailable");
        require(isAvailableTrait(items[0]), "Left item unavailable");
        require(isAvailableTrait(items[1]), "Right item unavailable");
    }

    function _generateTraitCombo(
        uint256[5] memory character,
        uint256[5] memory head,
        uint256[6] memory clothing,
        uint256[6] memory accessories,
        uint256[2] memory items
    ) internal pure returns (uint256) {
        uint256 traits = character[0];
        traits |= character[1] << 8;
        traits |= character[2] << 16;
        traits |= character[3] << 24;
        traits |= character[4] << 32;
        traits |= head[0] << 40;
        traits |= head[1] << 48;
        traits |= head[2] << 56;
        traits |= head[3] << 64;
        traits |= head[4] << 72;
        traits |= clothing[0] << 80;
        traits |= clothing[1] << 88;
        traits |= clothing[2] << 96;
        traits |= clothing[3] << 104;
        traits |= clothing[4] << 112;
        traits |= clothing[5] << 120;
        traits |= accessories[0] << 128;
        traits |= accessories[1] << 136;
        traits |= accessories[2] << 144;
        traits |= accessories[3] << 152;
        traits |= accessories[4] << 160;
        traits |= accessories[5] << 168;
        traits |= items[0] << 176;
        traits |= items[1] << 184;
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
            uint256 randomTrait = uint256(uint8(traitCombo >> (randomIndex * 8)));
            if (randomTrait != 0) {
                removedTraits.push(randomTrait);
                _removedTraitsMap[randomTrait] = true;
            }
        }
    }

    function _rngIndex(uint256 id) internal view returns (uint256) {
        return (uint256(keccak256(abi.encodePacked(id, block.timestamp, block.difficulty))) % 19) + 1;
    }

    function getCharacterTraits(uint256 tokenId) external view returns (CharacterTraits memory _characterTraits) {
        require(_exists(tokenId), "nonexistent token");
        Character memory character = _characters[tokenId];
        _characterTraits.tribe = uint8(character.traits);
        _characterTraits.skinColor = uint8(character.traits >> 8);
        _characterTraits.secondarySkinColor = uint8(character.traits >> 16);
        _characterTraits.eyeColor = uint8(character.traits >> 24);
        _characterTraits.secondaryEyeColor = uint8(character.traits >> 32);
        _characterTraits.hair = uint8(character.traits >> 40);
        _characterTraits.mouth = uint8(character.traits >> 48);
        _characterTraits.beard = uint8(character.traits >> 56);
        _characterTraits.facemarks = uint8(character.traits >> 64);
        _characterTraits.misc = uint8(character.traits >> 72);
        _characterTraits.top = uint8(character.traits >> 80);
        _characterTraits.outerwear = uint8(character.traits >> 88);
        _characterTraits.topPrint = uint8(character.traits >> 96);
        _characterTraits.bottom = uint8(character.traits >> 104);
        _characterTraits.footwear = uint8(character.traits >> 112);
        _characterTraits.belt = uint8(character.traits >> 120);
        _characterTraits.hat = uint8(character.traits >> 128);
        _characterTraits.eyewear = uint8(character.traits >> 136);
        _characterTraits.piercings = uint8(character.traits >> 144);
        _characterTraits.wrists = uint8(character.traits >> 152);
        _characterTraits.hands = uint8(character.traits >> 160);
        _characterTraits.neckwear = uint8(character.traits >> 168);
        _characterTraits.leftItem = uint8(character.traits >> 176);
        _characterTraits.rightItem = uint8(character.traits >> 184);
    }

    function getRemovedTraits() external view returns (uint256[] memory) {
        return removedTraits;
    }

    function isAvailableTrait(uint256 trait) public view returns (bool) {
        return !_removedTraitsMap[trait];
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

    function isUnique(uint256 traitCombo) public view returns (bool) {
        return !_existMap[traitCombo];
    }

    function getName(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "nonexistent token");
        return _characters[tokenId].name;
    }

    function changeName(uint256 tokenId, string memory newName) external returns (string memory) {
        require(_exists(tokenId), "nonexistent token");
        require(_isApprovedOrOwner(_msgSender(), tokenId), "Caller is not owner nor approved");
        string memory prevName = _characters[tokenId].name;
        require(sha256(bytes(newName)) != sha256(bytes(prevName)), "New name and old name are equal");
        require(validateName(newName), "Name is not allowed");
        require(!isNameReserved(newName), "Name already reserved");

        INFTL(_nftlAddress).transferFrom(msg.sender, address(this), NAME_CHANGE_PRICE);
        if (bytes(_characters[tokenId].name).length > 0) {
            _toggleReserveName(_characters[tokenId].name, false);
        }
        _toggleReserveName(newName, true);
        _characters[tokenId].name = newName;
        INFTL(_nftlAddress).burn(NAME_CHANGE_PRICE);
        emit NameUpdated(tokenId, prevName, newName);
        return newName;
    }

    /**
     * @dev Reserves the name if isReserve is set to true, de-reserves if set to false
     */
    function _toggleReserveName(string memory str, bool isReserve) private {
        _nameReserved[_toLower(str)] = isReserve;
    }

    /**
     * @dev Check if name is already reserved
     */
    function isNameReserved(string memory nameString) public view returns (bool) {
        return _nameReserved[_toLower(nameString)];
    }

    /**
     * @dev Check for valid name string (Alphanumeric and spaces without leading or trailing space)
     */
    function validateName(string memory newName) public pure returns (bool) {
        bytes memory byteName = bytes(newName);
        if (byteName.length < 1 || byteName.length > 25) return false; // name cannot be longer than 25 characters
        if (byteName[0] == 0x20 || byteName[byteName.length - 1] == 0x20) return false; // reject leading and trailing space

        bytes1 lastChar = byteName[0];

        for (uint256 i; i < byteName.length; i++) {
            bytes1 currentChar = byteName[i];

            if (currentChar == 0x20 && lastChar == 0x20) return false; // reject double spaces

            if (
                !(currentChar >= 0x30 && currentChar <= 0x39) && //9-0
                !(currentChar >= 0x41 && currentChar <= 0x5A) && //A-Z
                !(currentChar >= 0x61 && currentChar <= 0x7A) && //a-z
                !(currentChar == 0x20) //space
            ) return false;

            lastChar = currentChar;
        }

        return true;
    }

    /**
     * @dev Converts strings to lowercase
     */
    function _toLower(string memory str) internal pure returns (string memory) {
        bytes memory bStr = bytes(str);
        bytes memory bLower = new bytes(bStr.length);
        for (uint256 i = 0; i < bStr.length; i++) {
            if ((uint8(bStr[i]) >= 65) && (uint8(bStr[i]) <= 90)) {
                bLower[i] = bytes1(uint8(bStr[i]) + 32);
            } else {
                bLower[i] = bStr[i];
            }
        }
        return string(bLower);
    }
}
