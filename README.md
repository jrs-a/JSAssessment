# DegenToken
This project demonstrates a smart contract that is deployed on the Avalance Fuji Testnet. The contract was tested using [Remix IDE](https://remix.ethereum.org/) from its contract address when it was deployed on the testnet.

## Description
This smart contract is a fork of [this starter template](https://github.com/Metacrafters/DegenToken). This contract has the functions `mint()`, `burn()`, `redeem()` items from the store within the contract. And also `transfer()` and `balanceOf()` which are built in functions of the contract. The `redeem()` works by reducing the amount of tokens based on the price of the item ID that was redeemed, and store that ID on an array `playerInventory`. The items in the store were hardcoded into the contract and declared in the constructor. This contract was written using Solidity, deployed to the [Avalance Fuji Testnet](https://testnet.snowtrace.io/address/0xbb6ad282879b016a27ae48ccc52201634814b063), and tested using the Remix IDE.

## Getting Started
Clone this repository using the clone function of the Remix IDE. Compile the contract `DegenToken.sol`, and then deploy to the Avalance Fuji Testnet by setting up Metamask to be connected to it and choosing the `Injected provider` option on the environment before clicking the deploy button. Get to the transaction details by clicking the success notification and copy the contract address from those details. Paste the contract details on Remix IDE `AtAddress` to test the contract.

## Reminders
- You must have 2 AVAX tokens on your account. You can get that from [here](https://core.app/tools/testnet-faucet)
