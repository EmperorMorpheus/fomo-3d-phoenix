// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Utilities.sol";

interface IPlayersBook {

      struct Player {
        uint256 referralCode;
        address payable affiliate;
        string[] vanityNames; // Changed from string to string[]
        uint256 keysOwned;        // New field
        uint256 dividendsClaimed;
        uint256 dividendsEarned;  // New field
    }

    event PlayerRegistered(address indexed player, address indexed affiliate, uint256 playerId);
    event VanityNamePurchased(address indexed player, string vanityName);

    // Function to register a player with a specified affiliate
    function registerPlayerInfo(uint refCode, address payable affAddress, address payable playerAddress) external payable;

    // Function to purchase a vanity name
    function purchaseVanityName(string memory vanityName, address payable playerAddress) external payable;

    // Function to get the affiliate ID of a player
    function getAffiliateId(address player) external view returns (uint256);

    // Function to get the affiliate address of a player
    function getAffiliate(address player) external view returns (address);

    // Function to get the vanity names of a player
    function getVanityNames(address player) external view returns (string[] memory);

    // Function to get the top 10 players
    function getPlayers(uint256 startIndex, uint256 count) external view returns (address[] memory);

    // Function to get the player details
    function getPlayer(address playerAddress) external view returns (Player memory);

    // Function to add a vanity name to a player
    function addVanityName(address playerAddress, string memory vanityName) external;

    function wipeDivies(address playerAddress) external;
    function addDividendsEarned(address playerAddress, uint256 playersDivies) external;
    function getTotalPlayerKeys(address playerAddress) external view returns(uint256);
    function addKeysBought(address playerAddress, uint256 playerKeys) external;
    function getPlayersReferralCode(address playerAddress) external view returns(uint256);
    function clearPlayerHistory() external payable;
    function getDividendsEarned(address playerAddress) external view returns (address);
    
    function getPlayerKeys(address playerAddress, uint256 currentRound) external view returns(uint256);
    function addClaimedDividends(address playerAddress, uint256 playerDivies) external;
}


contract PlayersBook {
    struct Player {
        uint256 referralCode;
        address payable affiliate;
        string[] vanityNames; // Changed from string to string[]
        uint256 keysOwned;        // New field
        uint256 dividendsClaimed;
        uint256 dividendsEarned;  // New field
        uint256 round;
    }

    address allowedContractAddress;
    address payable payAddress;
    address payable[] public playerAddresses; // Add this line to store the addresses of all players
    mapping (address=> Player) public players;

    mapping(address => bool) public isPlayerAdded;
    uint256 internal nextId = 1;
    address owner;

    constructor(address _owner, address payable _payAddress) {
        allowedContractAddress;
        owner = _owner;
        payAddress = _payAddress;
    }
    modifier onlyAllowedContract() {
    require(msg.sender == allowedContractAddress || msg.sender == owner, "Caller is not the allowed contract");
    _;
    }
    event PlayerRegistered(address indexed player, address indexed affiliate, uint256 playerId);
    event VanityNamePurchased(address indexed player, string vanityName);

    // Function to register a player with a specified affiliate
    // Function to register a player with a specified affiliate
    function setAllowedContractAddress(address contractAddress) external onlyAllowedContract{
        allowedContractAddress = contractAddress;
    }
    function registerPlayerInfo(uint256 refCode, address payable affAddress, address payable playerAddress, uint256 currentRound) external onlyAllowedContract(){
        require(playerAddress != affAddress, "cannot refer yourself kek");

        uint256 defaultRefCode = refCode;
        address payable affiliateAddress = affAddress;
        if (affAddress == address(0)){
            affiliateAddress = payable(payAddress);
        } else if (refCode == 0) {
            defaultRefCode = 555;
        }
        
        if (!isPlayerAdded[playerAddress]){
        players[playerAddress] = Player(refCode, affiliateAddress, new string[](0), 0, 0, 0, currentRound);
        playerAddresses.push(payable(playerAddress));
        isPlayerAdded[playerAddress] = true;
        emit PlayerRegistered(playerAddress, players[playerAddress].affiliate, refCode);
        }

        players[playerAddress].affiliate = affAddress;

    }
    // Function to purchase a vanity name
    function purchaseVanityName(string memory vanityName, address playerAddress) external onlyAllowedContract{
        require(players[playerAddress].referralCode != 0, "Player not registered");
        players[playerAddress].vanityNames.push(vanityName); // Add the new vanity name to the array
        emit VanityNamePurchased(msg.sender, vanityName);
    }

    // Function to get the refer ID of a player
    function getPlayersReferralCode(address player) external view returns (uint256) {
        return players[player].referralCode;
    }

    // Function to get the affiliate address of a player
    function getAffiliate(address player) external view returns (address) {
        return players[player].affiliate;
    }

    // Function to get the vanity names of a player
    function getVanityNames(address player) external view returns (string[] memory) {
        return players[player].vanityNames;
    }
    // Function to get the top 10 players
   function getPlayers(uint256 startIndex, uint256 count) external view returns (address[] memory) {
    require(startIndex < playerAddresses.length, "Start index out of bounds");

    // The number of players to return is the minimum of count and the total number of remaining players
    uint256 numPlayersToReturn = count < playerAddresses.length - startIndex ? count : playerAddresses.length - startIndex;

    // This array will store the requested players
    address[] memory requestedPlayers = new address[](numPlayersToReturn);

    for (uint256 i = 0; i < numPlayersToReturn; i++) {
        requestedPlayers[i] = playerAddresses[startIndex + i];
    }

    return requestedPlayers;
    }

    function getPlayerKeys(address playerAddress, uint256 currentRound) public view returns (uint256) {
        Player memory player = players[playerAddress];
        if (player.round != currentRound) {
            return 0; // If the player's round doesn't match the current round, return 0 keys
        }
        return player.keysOwned;
    }

   
   function getPlayer(address playerAddress) public view returns (Player memory) {
    return players[playerAddress];
    }
    function addVanityName(address playerAddress, string memory vanityName) public onlyAllowedContract {
        players[playerAddress].vanityNames.push(vanityName);
    }

    
    function addClaimedDividends(address playerAddress, uint256 playerDivies) public onlyAllowedContract {
        players[playerAddress].dividendsClaimed += playerDivies;
    }

    function getDividendsEarned(address playerAddress) public view returns (uint256) {
      return players[playerAddress].dividendsEarned;
    }
    
    function addDividendsEarned(address playerAddress, uint256 dividendAmt) public onlyAllowedContract {
        players[playerAddress].dividendsEarned += dividendAmt; 
    }

    function wipeDivies(address playerAddress) public onlyAllowedContract{
        players[playerAddress].dividendsEarned = 0;
    }
    function getTotalPlayerKeys(address playerAddress) external view returns(uint256) {
        return players[playerAddress].keysOwned;
    }
     
     function addKeysBought(address playerAddress, uint256 playerKeys) public onlyAllowedContract {
        players[playerAddress].keysOwned += playerKeys; 
    }
    
}
