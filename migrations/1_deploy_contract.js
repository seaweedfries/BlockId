const mintNFT = artifacts.require("./mintNFT.sol");

module.exports = function(deployer) {
 deployer.deploy(mintNFT);
};