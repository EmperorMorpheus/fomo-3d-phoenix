const PlayersBook = artifacts.require("PlayersBook");

module.exports = function (deployer, network, addresses) {
    owner = addresses[0];
    payAddress = addresses[1];
    console.log(addresses);
    deployer.deploy(PlayersBook, owner, payAddress);
};
