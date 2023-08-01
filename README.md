# Minting a Token
This solidity project demonstrates the minting of a token where the functions `mint()` and `burn()` are implemented.

## Description
This program is written in solidity for the purpose of minting a token. This program has the `mint()` and `burn()` functions both of which accepts an address and value to mint or burn. The program also has a conditional to make sure that it doesn't burn more than it currently has.

## Getting Started
The [Remix IDE](remix.ethereum.og) was used to run the program.
1. Create a new file under the contracts and paste the contents of MyToken.sol and save it with the similar filename. Do the same as well for the deploy.js file under the scripts folder.
2. Compile the file by going to the file of MyToken.sol and clicking on the 'compile' button on the left side.
3. Deploy the contract by clicking on the 'deploy and run transactions' button on the left hand navigation bar and clicking on 'deploy'.
4. Test the `mint()` and `burn()` functions by supplying the address and value on their respective fields and clicking on 'transact' button.
