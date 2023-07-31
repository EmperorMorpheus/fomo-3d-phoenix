// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
interface IRounds {
     struct Round {
        uint256 totalPot; // Total amount in the main pot for this round
        uint256 totalSidePot; // Total amount in the side pot for this round
        uint256 totalPlayers; // Total number of players in this round
        uint256 totalKeys; // Total number of keys bought in this round
        uint256 totalNextRoundPot; // Total amount reserved for the next round's pot
        uint256 totalDividendPot; // Total amount in the dividend pot for this round
        uint256 totalEarned; // Total amount earned (e.g., by the contract or players) in this round
    }
    function updateRoundPot(uint256 roundNumber, uint256 roundPot) external;
    function updateRoundSidePot(uint256 roundNumber, uint256 roundSidePot) external;
    function updateTotalPlayers(uint256 roundNumber, uint256 totalPlayers) external;
    function updateTotalKeys(uint256 roundNumber, uint256 totalKeys) external;
    function updateNextRoundPot(uint256 roundNumber, uint256 totalNextRoundPot) external;
    function updateTotalDividendsPot(uint256 roundNumber, uint256 totalDividendPot) external;
    function updateTotalEarned(uint256 roundNumber, uint256 totalEarned) external;
}
contract Rounds {
    struct Round {
        uint256 totalPot; // Total amount in the main pot for this round
        uint256 totalSidePot; // Total amount in the side pot for this round
        uint256 totalPlayers; // Total number of players in this round
        uint256 totalKeys; // Total number of keys bought in this round
        uint256 totalNextRoundPot; // Total amount reserved for the next round's pot
        uint256 totalDividendPot; // Total amount in the dividend pot for this round
        uint256 totalEarned; // Total amount earned (e.g., by the contract or players) in this round
    }
    address allowedContractAddress;
    address owner;

    mapping (uint256=> Round) public rounds;

    constructor(address _allowedContractAddress, address _owner){
        allowedContractAddress = _allowedContractAddress;
        owner = _owner;
    }

     modifier onlyAllowedContract() {
    require(msg.sender == allowedContractAddress || msg.sender == owner, "Caller is not the allowed contract");
    _;
    }
    function getRound(uint256 roundNumber) public view onlyAllowedContract returns(Round memory){
        Round memory round = rounds[roundNumber];
        return round;
    }

    function updateRoundPot(uint256 roundNumber, uint256 roundPot) onlyAllowedContract public {
        rounds[roundNumber].totalPot += roundPot;
    }
    function updateRoundSidePot(uint256 roundNumber, uint256 roundSidePot) onlyAllowedContract public {
        rounds[roundNumber].totalSidePot += roundSidePot;
    }
    function updateTotalPlayers(uint256 roundNumber, uint256 player) onlyAllowedContract public {
        rounds[roundNumber].totalPlayers += player;
    }
    function updateTotalKeys(uint256 roundNumber, uint256 playerKeys) onlyAllowedContract public {
        rounds[roundNumber].totalKeys += playerKeys;
    }
    function updateNextRoundPot(uint256 roundNumber, uint256 nextRoundPot) onlyAllowedContract public {
        rounds[roundNumber].totalNextRoundPot += nextRoundPot;
    }
    function updateTotalDividendPot(uint256 roundNumber, uint256 diviePot) onlyAllowedContract public {
        rounds[roundNumber].totalDividendPot += diviePot;
    }
    function updateTotalEarned(uint256 roundNumber, uint256 totalDivsEarned) onlyAllowedContract public {
        rounds[roundNumber].totalEarned += totalDivsEarned;
    } 
}
