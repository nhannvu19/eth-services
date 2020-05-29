let Web3 = require('web3');
let web3 = new Web3();
let config = require('../config/config');

web3.setProvider(new web3.providers.WebsocketProvider(config.wssProvider));

const subscription = web3.eth.subscribe('pendingTransactions');
const web3Http = new Web3(`https://ropsten.infura.io/v3/${config.infura.ropsten.projectId}`);

async function getConfirmations(txHash) {
  try {
    const transaction = await web3Http.eth.getTransaction(txHash)
    const currentBlock = await web3.eth.getBlockNumber();

    return transaction.blockNumber === null ? 0 : currentBlock - transaction.blockNumber;
  }
  catch (err) {
    console.log(err);
  }
}

function confirmEtherTransaction(txHash, confirmations) {
  setTimeout(async () => {
    const txConfirmations = await getConfirmations(txHash);

    console.log(`Transaction hash ${txHash} has ${txConfirmations} confirmation(s)`);

    if (txConfirmations >= confirmations) {
      console.log(`Transaction hash ${txHash} has been successfully confirmed. Calling API in order to credit user`);
      return;
    }

    confirmEtherTransaction(txHash, confirmations);
  }, 20 * 1000);
}

subscription.on('data', async (txHash) => {
  try {
    let transaction;

    while (!transaction) {
      transaction = await web3Http.eth.getTransaction(txHash);
    }

    if (transaction.to == '0x1aee0fa072E0928348615075eD8d9E0e181f6094') {
      let ethAmount = web3.utils.fromWei(tx.value, 'ether');

      console.log(`\nFound incoming Ether transaction from ${transaction.from} to ${transaction.to}`);
      console.log(`Transaction amount is: ${ethAmount}`);
      console.log(`Transaction hash is ${txHash}\n`);
  
      confirmEtherTransaction(txHash, 5);
    }
  }
  catch(error) {
    console.log(`Subscription Error: ${error}`);
    // subscription.unsubscribe()
  }
});
