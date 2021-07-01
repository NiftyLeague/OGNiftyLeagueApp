// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

contract AllowedTraitsStorage is Ownable {
    /// @dev Mapping if trait is allowed for selected tribe
    mapping(uint256 => mapping(uint256 => bool)) private _tribeTraitAllowed;

    constructor() {}

    /**
     * @notice Set allowed on a given a list of traits
     * @param tribe Tribe ID
     * @param traits List of traits to set for tribe
     * @param allowed Bool if the trait list should be made allowed or not
     * @dev Limited to list length of 16 due to stack size limitations
     */
    function setTraitsAllowedOnTribe(
        uint256 tribe,
        uint256[] memory traits,
        bool allowed
    ) external onlyOwner {
        require(tribe > 0 && tribe < 10, "Invalid tribe provided");
        for (uint256 i = 0; i < traits.length; i++) {
            _toggleTraitAllowed(tribe, traits[i], allowed);
        }
    }

    /**
     * @notice Toggle trait allowed on and off for a tribe
     * @param tribe Tribe ID
     * @param trait Trait ID
     * @param allowed Bool if the trait should be made allowed or not
     * @dev Defaults to false if never set
     */
    function _toggleTraitAllowed(
        uint256 tribe,
        uint256 trait,
        bool allowed
    ) private {
        _tribeTraitAllowed[tribe][trait] = allowed;
    }

    /**
     * @notice Check if trait is allowed for a tribe
     * @param tribe Tribe ID
     * @param trait Trait ID
     */
    function isAllowedTrait(uint256 tribe, uint256 trait) public view returns (bool) {
        return _tribeTraitAllowed[tribe][trait];
    }
}
