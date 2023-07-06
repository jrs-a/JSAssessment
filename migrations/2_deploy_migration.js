var CoffeeMachineErrorChecker = artifacts.require("CoffeeMachineErrorChecker");
module.exports = function(deployer) {
  deployer.deploy(CoffeeMachineErrorChecker);
}
