pragma solidity ^0.4.18;

import "./Factory.sol";
import "./MyToken.sol";

/// @title MyToken Factory - Allows creation of custom token.
/// @author Nicolas frega - <nicolas.frega@srax.com>

contract MyTokenFactory is Factory {

    /*
     * Public functions
     */
    /// @dev Allows verified creation of custom token.
    /// @param _name String for token name.
    /// @param _symbol String for token symbol.
    /// @return Returns token address.
    function create(string _name, string _symbol)
        public
        returns (address tokenAddress)
    {
        tokenAddress = new MyToken(_name, _symbol, msg.sender);
        register(tokenAddress);
    }
}
