// SPDX-License-Identifier: GPL-3.0

// Created by Al Razzaq
// Name of the project

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Fiverr is Ownable {
    
    using SafeMath for uint256;
  
//*********** Variables *****************

  uint constant DAY_IN_SECONDS = 86400;
  address constant private developer = 0xdD870fA1b7C4700F2BD7f44238821C26f7392148;
  
  uint private costOfSixMonthMemmbership =  0.7 ether;
  uint private costOfOneDayMemmbership =  0.15 ether;
  uint private costOfSevenDaysMemmbership =  0.06 ether;
  uint private costOfOneMonthMemmbership =  0.02 ether;
  
  address[] private whitelistedUsers;


//*********** Mappings *****************

  mapping(address => uint256) private whitelisted;
  mapping(address => uint256) public membership;
  

//*********** Events *****************
  event AmountChanged(address account);
  event MembershipAssigned(address account, uint duration);

  event WhiteListed(address account, uint duration);
  event BlackListed(address account);
  event PaymentReleased(address to, uint256 amount);
  event PaymentReceived(address from, uint256 amount);
  
  

  function setCostOfMemmbership(uint256 _days, uint256 _amount) public onlyOwner{
      require(_days == 1 || _days == 7 || _days == 30 || _days == 180);
      
      if(_days == 1){
        costOfOneDayMemmbership = _amount;
      }
      if(_days == 7){
        costOfSevenDaysMemmbership = _amount;
      }
      if(_days == 30){
        costOfOneMonthMemmbership = _amount;
      }
      if(_days == 180){
        costOfSixMonthMemmbership = _amount;
      }
      
  }
  
  function getCostOfMemmbership(uint256 _days) view public returns(uint) {
      require(_days == 1 || _days == 7 || _days == 30 || _days == 180);
      
      if(_days == 1){
        return costOfOneDayMemmbership;
      }
      if(_days == 7){
        return costOfSevenDaysMemmbership;
      }
      if(_days == 30){
        return costOfOneMonthMemmbership;
      }
      if(_days == 180){
        return costOfSixMonthMemmbership;
      }
      else {
          return 0;
      }

  }
 
  function getCurrentTime() view public returns(uint256) {
      return block.timestamp;
  }





  function assignMembership(address _user, uint256 _days) internal {

    whitelistUser(_user, _days);

    if(membership[_user] > block.timestamp){
        membership[_user] = membership[_user].add(DAY_IN_SECONDS.mul(_days));
        emit MembershipAssigned(_user, membership[_user]);
    }
    else{
        membership[_user] = block.timestamp.add(DAY_IN_SECONDS.mul(_days));
        emit MembershipAssigned(_user, membership[_user]);

    }

   distributeEquity();
            
}

  function whitelistUser(address _user, uint256 _days) internal {

    if(whitelisted[_user] > block.timestamp){
        whitelisted[_user] = whitelisted[_user].add(DAY_IN_SECONDS.mul(_days));
        emit WhiteListed(_user, whitelisted[_user]);
    }
    else {
        whitelistedUsers.push(_user);
        whitelisted[_user] = block.timestamp.add(DAY_IN_SECONDS.mul(_days));
        emit WhiteListed(_user, whitelisted[_user]);

    }
    
  }

  function blacklistUser(address _user) internal {
    delete whitelisted[_user];
    delete membership[_user];
    emit BlackListed(_user);
  }



      // one minute subscription
  function getSingleMinuteMembership() public payable {

    //   require(msg.value >= 0.01 ether, "not enough money sent");
    //   require(whitelisted[msg.sender] > block.timestamp, "Not whitelisted, Please contact to Admin");

    if(whitelisted[msg.sender] > block.timestamp){
        whitelisted[msg.sender] = whitelisted[msg.sender].add(60);
        emit WhiteListed(msg.sender, whitelisted[msg.sender]);
    }
    else {
        whitelistedUsers.push(msg.sender);
        whitelisted[msg.sender] = block.timestamp.add(60);
        emit WhiteListed(msg.sender, whitelisted[msg.sender]);

    }      
      membership[msg.sender] > block.timestamp ?
            membership[msg.sender] = membership[msg.sender].add(60) :
            membership[msg.sender] = block.timestamp.add(60);
            

      distributeEquity();

  }    

      // Daily subscription
  function getSingleDayMembership() public payable {

      require(msg.value >= costOfOneDayMemmbership, "not enough money sent");
      require(whitelisted[msg.sender] > block.timestamp, "Not whitelisted, Please contact to Admin");

    assignMembership(msg.sender, 1);

  }     
   
      // Weekly subscription
  function getSevenDayMembership() public payable {

      require(msg.value >= costOfSevenDaysMemmbership, "not enough money sent");
      require(whitelisted[msg.sender] >block.timestamp, "Not whitelisted, Please contact to Admin");
      
      assignMembership(msg.sender, 7);

}

      // Monthly subscription
  function getOneMonthMembership() public payable {

      require(msg.value >= costOfOneMonthMemmbership, "not enough money sent");
      require(whitelisted[msg.sender] >block.timestamp, "Not whitelisted, Please contact to Admin");

         assignMembership(msg.sender, 30);

}

      // Six Monthl subscription
  function getSixMonthMembership() public payable {

      require(msg.value >= costOfSixMonthMemmbership, "not enough money sent");
      require(whitelisted[msg.sender] > block.timestamp, "Not whitelisted, Please contact to Admin");

      assignMembership(msg.sender, 180);

}


  function isWhitelisted(address _address) public view returns (bool) {
    return whitelisted[_address] > block.timestamp;
  }
  
  function isMember(address _address) public view returns (bool) {
    return membership[_address] > block.timestamp;
  }
  
  
  function whitelistedPeriod(address _address) public view returns (uint) {
    return whitelisted[_address];
  }
  
 
 
 
  function whitelistUsers(address[] memory _users, uint256 _days) public onlyOwner {
      
    if(_users.length == 1){
        whitelistUser(_users[0], _days);
    }
    else {
        for(uint i = 0; i < _users.length; i++){
            whitelistUser(_users[i], _days);
        }
    }
  }
  

  function blacklistUsers(address[] memory _users) public onlyOwner {
      
    if(_users.length == 1){
        blacklistUser(_users[0]);
    }
    else {
        for(uint i = 0; i < _users.length; i++){
        blacklistUser(_users[i]);
        }
    }
  }
  
  
  function listOfwhitelistedUsers() public returns(address[] memory){
      
    address[] memory allWhitelistedUsers = whitelistedUsers;

    whitelistedUsers = new address[](0);
      
    for(uint i = 0; i < allWhitelistedUsers.length; i++){
        if( whitelistedPeriod(allWhitelistedUsers[i]) >  block.timestamp){
            whitelistedUsers.push(allWhitelistedUsers[i]);
        }
    }
      
      return whitelistedUsers;
  }
  
  
  function totalBalanceAvailable() public view returns(uint256) {
        return  address(this).balance;
    }
    
    
  function withdraw() public onlyOwner {
      distributeEquity();
  }
 
    
  function distributeEquity() internal {
        
        uint256 totalamount =  address(this).balance;
        require(totalamount > 0, "balance is nill");

        address owner = owner();
        
        // distribute owner's 85% cut
        uint256 ownersCut =  totalamount.mul(85).div(100);     
        // balance[owner] = balance[owner].add(ownersCut);
        bool sentOwner = payable(owner).send(ownersCut);
        require(sentOwner, "Failed to send Ether");
        emit PaymentReleased(owner, ownersCut);
        
        // pay developer remaining 15%
        uint developersCut = totalamount.sub(ownersCut);
        bool sentDeveloper = payable(developer).send(developersCut);
        require(sentDeveloper, "Failed to send Ether");
        emit PaymentReleased(developer, developersCut);
        
    }
  
}