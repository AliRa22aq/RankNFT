// SPDX-License-Identifier: GPL-3.0

// Created by Al Razzaq
// Name of the project

pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract RankNFT is Ownable {
  
//   using Strings for uint256;
//   using Counters for Counters.Counter;
        uint constant DAY_IN_SECONDS = 86400;

  
  mapping(address => bool) private whitelisted;
  mapping(address => uint256) public membership;
  
  function getCurrentTime() view public returns(uint256) {
      return block.timestamp;
  }
  


      // Daily subscription
  function getSingleDayMembership() public payable {

      require(msg.value >= 0.01 ether, "not enough money sent");
      require(whitelisted[msg.sender] == true, "Not whitelisted, Please contact to Admin");

      membership[msg.sender] > block.timestamp ?
            membership[msg.sender] = membership[msg.sender] + 1*DAY_IN_SECONDS :
            membership[msg.sender] = block.timestamp + 1*DAY_IN_SECONDS;

      
  }     
      // Weekly subscription
  function getSevenDayMembership() public payable {

      require(msg.value >= 0.03 ether, "not enough money sent");
      require(whitelisted[msg.sender] == true, "Not whitelisted, Please contact to Admin");

      membership[msg.sender] > block.timestamp ?
            membership[msg.sender] = membership[msg.sender] + 7*DAY_IN_SECONDS :
            membership[msg.sender] = block.timestamp + 7*DAY_IN_SECONDS;
}


      // Monthly subscription
  function getOneMonthMembership() public payable {

      require(msg.value >= 0.05 ether, "not enough money sent");
      require(whitelisted[msg.sender] == true, "Not whitelisted, Please contact to Admin");

      membership[msg.sender] > block.timestamp ?
            membership[msg.sender] = membership[msg.sender] + 30*DAY_IN_SECONDS :
            membership[msg.sender] = block.timestamp + 30*DAY_IN_SECONDS;
}
      
      
    function checkActiveSubscription (address _address) public view returns (bool) {
    return membership[_address] > block.timestamp ;
  }
  
  function isWhitelisted(address _address) public view returns (bool) {
    return whitelisted[_address];
  }
  
  function whitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = true;
  }
  
  function removeWhitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = false;
  }
  
  
    // for testing
  function totalBalanceAvailable() public view returns(uint256) {
        return  address(this).balance;
    }
  
}