# Supply Chain using Smart Contracts
- this is a simple interface that imitates real-life scenarios of handling blockchain transaction on the Ethereum network. 

### 3 main functionality:
- creating item (only by owner of the contract)
- accepting payments for the particular item requested from the user
- deliver items to users.

## Ideal Case of Scenario
1) Generate an item, with user's choice of an identifier name, also the price of the item in Wei.
2) Metamask pop-up, to confirm the transaction cost, with the gas fee included. 
3) Pop-up Alert, notifing item has been created, with an address of the item.
4) Make transaction from your wallet account in Metamask, to the address of the item, with the price in Wei.
5) Once transaction payment is completed, a pop-up alert should notify you that the item is ready to be delivered. 

## Development Steps
- Created Item Manager smart contracts on Remix with pragma solidity ^0.6.0
- Do unit testing for transaction handling 
- Once test completed, begin shifting smart contracts to truffle development
- Used "truffle unbox react" for generating UI interface
- Migrate smart contracts onto truffle develop
- Imported first account from truffle dev into Metamask for transaction handling
- Conducted hands-on testing on the Truffle development testnet (https://127.0.0.1:8545), with unit testing with "truffle test"
