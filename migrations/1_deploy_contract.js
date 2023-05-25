const SimpleStorage = artifacts.require("./New.sol");

module.exports = function(deployer) {
 deployer.deploy(SimpleStorage);
};