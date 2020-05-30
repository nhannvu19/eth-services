# A wallet service powered by Web3

This project is used to track Ethereum transactions of your wallet. It is also able to send ETH from your wallet to other addresses.

## Installation

First of all, please make sure you have MetaMask installed.
If not, please follow the instruction [https://tokenmarket.net/what-is/how-to-install-and-setup-metamask/]

In this project, I use Ropsten for Ethereum testnet, you can try others if you want. Besides, you also need to have some test Ether which we can get in these pages:

- Ropsten Ethereum Faucet: https://faucet.ropsten.be/
- MetaMask Faucet: https://faucet.metamask.io/

Finally, clone this project to your local machine and then execute

```
yarn install
```

## Usage

### Configuration

Open file `config/config.js` and update with your own wallet info.

### Tracking

Open terminal and run

```
node services/monitor.js
```

### Transfer ETH

Open Node CLI and include function SendEther

```
const sendEther = require('./services/transfer.js);
```

Then try sending ETH to another address

```
sendEther('0x1aee0fa072E0928348615075eD8d9E0e181f6094', '0.00000000244140625')
```

### Deploy ERC-20 smart contract

Place your own smart contract file (.sol) in `services/smart_contracts/contracts`

Please make sure you have correct SOLC version configured in `services/smart_contracts/truffle-config.js`

Update the migration files in `services/migrations/` in order to be matched with your smart contract file.

Finally, open terminal and then execute

```
truffle migrate --reset --network ropsten
```

## Contributing

https://medium.com/pixelpoint/track-blockchain-transactions-like-a-boss-with-web3-js-c149045ca9bf
https://viblo.asia/p/ethereum-su-dung-testnet-va-node-client-web3js-6J3ZgBPPKmB
https://medium.com/swlh/develop-test-and-deploy-your-first-ethereum-smart-contract-with-truffle-14e8956d69fc