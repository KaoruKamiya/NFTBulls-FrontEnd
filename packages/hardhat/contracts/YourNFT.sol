pragma solidity >=0.6.0 <0.8.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract YourNFT is ERC721 {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  mapping(uint256 => bool) TokenExists;

  constructor() public ERC721("YourCollectible", "YCB") {
    mintItem();
  }


  function mintItem()
      public
      returns (uint256)
  {
      uint256 id = _tokenIds.current();
      require(!TokenExists[id],"Token exists!");

      _tokenIds.increment();
      _mint(msg.sender, id);
      TokenExists[id] = true;

      return id;
  }
}