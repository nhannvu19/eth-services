// Khai báo sử dụng thư viện web3js và ethereumjs-tx
let EthTx = require('ethereumjs-tx');
let Web3 = require('web3');
let web3 = new Web3();
let config = require('../config/config');

web3.setProvider(new web3.providers.WebsocketProvider(config.wssProvider));

function toHex(num) {
  return web3.utils.toHex(num);
}

async function getNonce(address) {
  return await web3.eth.getTransactionCount(address);
}

async function getRawTx(fromAddress, toAddress, amount, gasLimit) {
  let nonce = await getNonce(fromAddress);
  let gasPrice = await web3.eth.getGasPrice();
  let weiAmount = web3.utils.toWei(amount, 'ether');

  return {
    from:     fromAddress,
    to:       toAddress,
    nonce:    nonce,
    gasPrice: toHex(gasPrice),
    gasLimit: toHex(gasLimit),
    value:    toHex(weiAmount),
    data:     '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675'
  }
}

async function SendEther(toAddress, amount) {
  let fromAddress = config.metamask.address;
  let rawTx = await getRawTx(fromAddress, toAddress, amount, 30400);
  let signedTx = new EthTx.Transaction(rawTx, { 'chain': config.network });
  let privateKey = Buffer.from(config.metamask.privateKey, 'hex');

  signedTx.sign(privateKey);

  let serializedTx = signedTx.serialize();
  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
}

module.exports = SendEther;
