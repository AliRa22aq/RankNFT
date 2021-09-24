const RankNFT = artifacts.require("RankNFT");

module.exports = function (deployer) {
  deployer.deploy(RankNFT);
};
