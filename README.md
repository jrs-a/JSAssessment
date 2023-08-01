# Smart Contract Frontend
This project demonstrates a frontend in NuxtJS for a smart contract written in Solidity.

## Description
This project extends this [starter template](https://github.com/MetacrafterChris/SCM-Starter). The project is capable of depositing and withdawing 1 ETH each time, with the extended functionality of displaying the transaction history on the page. The account balance is also shown and immediately updated on the page whenever there is a transaction. The frontend uses NuxtJS and Tailwind. The smart contract is written using Solidity.

## Getting Started
After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at `http://localhost:3000/`

### Some reminders
1. Make sure to import the first private key to metamask from the terminal shown after running `npx hardhat node`.
2. Make sure that you are using the localhost as the network in metamask. If not, create a new one and set the RPC URL: `http://127.0.0.1:8545/`, Chain ID: `31337`, and the Currency symbol: `ETH`
3. Make sure that the imported account is connected to the localhost. Disconnect the other accounts if necessary.
4. `Clear activity tab data` whenever you are starting a new session.