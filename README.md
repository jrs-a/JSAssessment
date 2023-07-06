# Implementing Error and Functions in Solidity
This is a solidity project where I implement `require()`, `assert()`, and `revert()` functionalities in a smart contract.

For demonstration and learning purposes, this is a project for a coffee maker where it does error handling on user input using the said functionalities so that it doesn't overflow beyond the specified amount!

## Prerequisites

1. Install [Node.js](https://nodejs.org)

   Download and install from the official site.

2. Install [Truffle](https://github.com/trufflesuite/truffle)

   ```bash
   npm install -g truffle
   ```


## Development

1. Initialize Truffle in your project folder

   ```bash
   truffle init
   ```

   After initialization, you will find two folders called `contracts` and `migrations`. Contracts go in the `contracts` folder while contract deployment settings go in `migrations`.

2. Write your contract inside the `contracts` folder

3. Prepare the migration

   "2_deploy_migration.js" in `migrations` contains the following code:

   ```javascript
   var CoffeeMachineErrorChecker = artifacts.require("CoffeeMachineErrorChecker");
   module.exports = function(deployer) {
     deployer.deploy(CoffeeMachineErrorChecker);
   }
   ```


## Compile and Migrate the Contract

1. Start Truffle console in development mode

   ```bash
   truffle develop
   ```

   In the Truffle console, execute

   ```bash
   compile
   migrate
   ```
   If you want to remigrate existing contracts, run `migrate --reset` instead of simply `migrate`.

2. Test the contract

   In the interactive Truffle console, run the following commands:

   ```javascript
   let coffee = await CoffeeMachineErrorChecker.<function name here>()
   coffee.testRequire(<your input here>)
   coffee.testRevert(<your input here>)
   coffee.testAssert()
   ```
