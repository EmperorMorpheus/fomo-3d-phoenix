const FomoPhoenix = artifacts.require("FomoPhoenix");

module.exports = function (deployer, network, addresses) {
    const noExpectationsWallet = addresses[0];
    const playerBookAddress = addresses[1];
    const defaultRefAddress = addresses[0];
    deployer.deploy(FomoPhoenix,noExpectationsWallet, playerBookAddress, defaultRefAddress);
};
