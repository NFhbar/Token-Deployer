pragma solidity ^0.4.21;

import "./Factory.sol";
import "./MyToken.sol";

/// @title MyToken Factory - Allows creation of custom token.
/// @author Nicolas frega - <frega.nicolas@gmail.com>

contract MyTokenFactory is Factory {

    /*
     * Public functions
     */
    /// @dev Allows verified creation of custom token.
    /// @param _name String for token name.
    /// @param _symbol String for token symbol.
    /// @return Returns token address.
    function create(string _name, string _symbol, uint256 _initialSupply)
        public
        returns (address tokenAddress)
    {
        tokenAddress = new MyToken(_name, _symbol, msg.sender, _initialSupply);
        register(tokenAddress);
    }
}
