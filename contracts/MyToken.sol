pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

/**
 * @title MyToken
 * @dev MyToken, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `StandardToken` functions.
 */
contract MyToken is StandardToken {

  string public name;
  string public symbol;
  uint8 public constant decimals = 18;

  uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
   function MyToken(string _name, string _symbol, address _owner)
      public
  {
      name = _name;
      symbol = _symbol;
      totalSupply_ = INITIAL_SUPPLY;
      balances[_owner] = INITIAL_SUPPLY;
      Transfer(0x0, _owner, INITIAL_SUPPLY);
   }

}
