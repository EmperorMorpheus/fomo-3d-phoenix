// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Rounds.sol";
import "./Players.sol";

contract FomoPhoenix {
    address public owner;
    address public lastBuyer;
    uint256 public totalKeys;
    uint256 public pot;
    uint256 public diviePot;
    uint256 public totalReferralEarnings;
    uint256 public totalDividends;
    uint256 public roundNumber;
    uint256 public roundEndTime;
    uint256 public taxPercentage;
    uint256 public roundDuration;
    address payable public defaultRefAddress;
    address public noExpectationsWallet; // Address to receive 20% of the pot
    address public playerBookAddress;
    PlayersBook public playersBook;
    bool public prizeClaimed;
    uint256 public nextRoundsPot;
    uint256 public endSidePot;
    uint256 public nextRoundTaxRate;
    uint256 public diviePotTaxRate;
    uint256 public endSidePotTaxRate;
    // Custom formulas (You can modify these as per your requirements)
    uint256 public initialKeyPrice;
    uint256 public priceIncreaseRate;
    uint256 public priceIncreaseRateTwo;
    uint256 public affiliateRate;
    uint256 public potContributionRate;
    uint256 public timerExtension;
    uint256 public roundIntermission;
    //constant for the calcs

    uint256 private nonce = 0; // This nonce gets incremented on each request, ensuring every result is unique

    //mappings for the core game

    event KeyPurchased(address indexed buyer, uint256 amount);
    event PrizeClaimed(address indexed winner, uint256 amount);
    event Log(string message, uint256 value);
    modifier isHuman() {
        require(msg.sender == tx.origin, "No contracts");
        _;
    }
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }

    constructor(
        address payable _noExpectationsWallet,
        address _playerBookAddress,
        address payable _defaultRefAddress
    ) payable {
        owner = msg.sender;
        noExpectationsWallet = _noExpectationsWallet;
        prizeClaimed = true; // Set to true initially to allow the first round to be started
        startNewRound();
        roundNumber = 1;
        taxPercentage = 20; // 5% tax on each key purchase
        roundDuration = 5 minutes;
        roundEndTime = block.timestamp + roundDuration;
        initialKeyPrice = 1 ether; //this should be 10,000PLS per key on pulsechain
        priceIncreaseRate = 102;
        priceIncreaseRateTwo = 101;
        defaultRefAddress = _defaultRefAddress;
        affiliateRate = 10;
        potContributionRate = 50;
        roundIntermission = 1 hours;
        timerExtension = 30 seconds;
        playerBookAddress = _playerBookAddress;
        playersBook = PlayersBook(playerBookAddress);
        nextRoundsPot = 0;
        nextRoundTaxRate = 5;
        endSidePotTaxRate = 5;
        diviePotTaxRate = 10;
    }

    receive() external payable {}

    function startNewRound() private {
        require(prizeClaimed, "Previous round's prize must be claimed first");
        diviePot = 0;
        endSidePot = 0;
        pot = 0;
        lastBuyer = address(0);
        roundEndTime = block.timestamp + roundDuration;
        prizeClaimed = false; // Reset prizeClaimed for the new round
        totalKeys = 0;
        roundNumber++;
        pot = nextRoundsPot;
        //add round struct and add stats for round, and clear player keys and dividend
    }

    function calculateTotalPrice(uint256 numKeysToPurchase)
        public
        view
        returns (uint256)
    {
        // Initialize the current price and total price
        uint256 totalPrice = 0;
        uint256 currentPrice = calculateKeyPrice();

        // Add the price of each key to the total price
        if (totalKeys < 234) {
            for (uint256 i = 0; i < numKeysToPurchase; i++) {
                totalPrice += currentPrice;

                // Increase the price for the next key
                currentPrice = (currentPrice * priceIncreaseRate) / 100;
            }
            return totalPrice;
        } else if (totalKeys > 234 && totalKeys < 1000) {
            return currentPrice;
        } else {
            for (uint256 i = 0; i < numKeysToPurchase; i++) {
                totalPrice += currentPrice;

                // Increase the price for the next key
                currentPrice = (currentPrice * priceIncreaseRateTwo) / 100;
            }
        }
    }

    function calculateKeyPrice() public view returns (uint256) {
        if (pot == 0) {
            return initialKeyPrice;
        } else {
            // Calculate the price based on the previous key price and the price increase rate
            // return (initialKeyPrice * priceIncreaseRate) / 100;
            uint256 price = initialKeyPrice;
            for (uint256 i = 0; i < totalKeys; i++) {
                price = (price * priceIncreaseRate) / 100;
            }

            return price;
        }
    }

    function registerPlayer(
        uint256 referralCode,
        address payable affAddress,
        address payable playerAddress
    ) payable external isHuman {
        playersBook.registerPlayerInfo(
            referralCode,
            payable(affAddress),
            payable(playerAddress),
            roundNumber
        );
    }

    function buyKeys(uint256 numberOfKeys) external payable isHuman {
        uint256 totalPrice = calculateTotalPrice(numberOfKeys);
        require(
            msg.value == totalPrice,
            "Please send the right amount of Ether to purchase key(s)"
        );
        if (block.timestamp >= roundEndTime) {
            claimPrize(); // Automatically claim the prize and start the next round
        }
        require(block.timestamp < roundEndTime, "The round has ended");
        // require(msg.value > 0, "You must send some Ether to buy a key");
        //state

        uint256 potContribution = (potContributionRate * totalPrice) / 100;
        uint256 taxAmount = (totalPrice * taxPercentage) / 100;
        uint256 diviePotContribution = (totalPrice * diviePotTaxRate) / 100;
        uint256 affiliateFee = (totalPrice * affiliateRate) / 100;
        uint256 endSidePotContribution = (totalPrice * endSidePotTaxRate) / 100;
        uint256 nextRoundPotContribution = (totalPrice * nextRoundTaxRate) /
            100;
        totalKeys += numberOfKeys;
        uint256 dividends = calculateDividends(numberOfKeys);
        playersBook.addKeysBought(msg.sender, numberOfKeys);

        //airdrop update/calculations
        diviePot += diviePotContribution; // 1% of each transaction goes to the airdrop pot

        //update diviess
        playersBook.addDividendsEarned(msg.sender, dividends);
        totalDividends += dividends;

        playersBook.addTotalReferralEarnings(msg.sender, affiliateFee);
        


        // Update the pot and last buyer
        endSidePot += endSidePotContribution;
        nextRoundsPot += nextRoundPotContribution;
        pot += potContribution;
        lastBuyer = msg.sender;

        // Extend the timer for each key purchase

        roundEndTime += timerExtension; // 30 minutes extended to the timer for each key purchase

        //transfers
        payable(playersBook.getAffiliate(payable(msg.sender))).transfer(
            affiliateFee
        );
        payable(address(this)).transfer(potContribution);
        payable(address(this)).transfer(nextRoundPotContribution);
        payable(address(this)).transfer(endSidePotContribution);
        payable(address(this)).transfer(diviePotContribution);
        payable(noExpectationsWallet).transfer(taxAmount);

        // Emit event
        emit KeyPurchased(msg.sender, numberOfKeys);
    }

    function getTotalKeysBought() public view returns (uint256) {
        return totalKeys;
    }

    function getNumKeysBought(address keyHolderAddress)
        external
        view
        returns (uint256)
    {
        // Calculate the number of keys bought (excluding the current purchase)

        uint256 totalKeysBought = playersBook.getPlayerKeys(keyHolderAddress, roundNumber);
        return totalKeysBought;
    }
    
    function calculateDividends(uint256 numOfKeys)
        internal
        view
        returns (uint256)
    {
        if (totalKeys == 0) {
            return 0;
        }
        // Calculate the dividends based on the number of keys
        // The dividends are a percentage of the total pot proportional to the percentage of keys the user owns
        uint256 dividends = (diviePot * numOfKeys) / totalKeys;
        return dividends;
    }

    function claimSidePot() external isHuman {
        require(
            playersBook.getTotalPlayerKeys(msg.sender) != 0,
            "sorry fren, you have no keys, no divies available :("
        );
        require(block.timestamp >= roundEndTime, "The round has ended");

        if (block.timestamp >= roundEndTime) {
            claimPrize(); // Automatically claim the prize and start the next round
        }
        uint256 totalPlayerKeys = playersBook.getTotalPlayerKeys(msg.sender);
        uint256 endSidePotShare = (endSidePot * totalPlayerKeys) / 100;
        payable(address(msg.sender)).transfer(endSidePotShare);
    }

    function claimDividends() external isHuman {
        require(totalDividends >= 0, "There are no dividends to claim!");
        require(
            playersBook.getDividendsEarned(msg.sender) != 0,
            "You have no divies to claim :("
        );
        // Calculate the dividends for the caller
        uint256 dividends = playersBook.getDividendsEarned(msg.sender);

        // Subtract the dividends from the total dividends
        diviePot -= dividends;
        totalDividends -= dividends;

        playersBook.addClaimedDividends(msg.sender, dividends);
        // Transfer the dividends to the caller
        payable(msg.sender).transfer(dividends);
        playersBook.wipeDivies(msg.sender);
    }

    function setTotalTax(
        uint256 taxAmount,
        uint256 potFee,
        uint256 affiliateFee,
        uint256 endSidePotFee,
        uint256 diviePotFee
    ) external onlyOwner {
        taxPercentage = taxAmount;
        affiliateRate = affiliateFee;
        endSidePotTaxRate = endSidePotFee;
        potContributionRate = potFee;
        diviePotTaxRate = diviePotFee;
        endSidePotTaxRate = endSidePotFee;
    }

    function setPriceIncreaseRate(uint256 newRate, uint256 newRateTwo)
        external
        onlyOwner
    {
        priceIncreaseRate = newRate;
        priceIncreaseRateTwo = newRateTwo;
    }

    function setInitialPrice(uint256 price) external onlyOwner {
        initialKeyPrice = price;
    }

    function claimPrize() public isHuman {
        require(block.timestamp >= roundEndTime, "The round has not ended yet");
        require(
            !prizeClaimed,
            "Prize for the current round has already been claimed"
        );
        require(
            msg.sender == lastBuyer,
            "Only the last buyer can claim the prize"
        );

        // Calculate the amounts to send
        prizeClaimed = true;
        uint256 noExpectationsAmount = (pot * 20) / 100;
        uint256 winnerPrize = pot - noExpectationsAmount;

        // Reset the game for the next round
        startNewRound();

        // Send the prizes
        payable(noExpectationsWallet).transfer(noExpectationsAmount);
        payable(lastBuyer).transfer(winnerPrize);

        // Emit event
        emit PrizeClaimed(lastBuyer, winnerPrize);
    }

    function getCurrentTimeLeft() external view returns (uint256) {
        if (block.timestamp < roundEndTime) {
            return roundEndTime - block.timestamp;
        } else {
            return 0;
        }
    }

    function purchaseVanity(string memory vanity, address playerAddress)
        external
        payable
        isHuman
    {
        require(msg.value == 1 ether, "The price is 1 ETH");
        require(msg.sender == playerAddress, "You cannot buy vanity names for a different address, 1 ETH/vanity");
        payable(defaultRefAddress).transfer(1 ether);
        playersBook.purchaseVanityName(vanity, playerAddress);
    }

    function forceStartNewRound() external onlyOwner {
        prizeClaimed = true;
        startNewRound();
    }

    function setRoundTime(uint256 duration) external onlyOwner {
        roundEndTime = block.timestamp + duration;
    }

    function setPlayerBookAddress(address playerBook) external onlyOwner {
        playerBookAddress = playerBook;
    }
}
