// Khai báo sử dụng thư viện web3js
const Web3 = require('web3');
const web3 = new Web3();
const config = require('../config/config');
const HDKey = require('hdkey');
const BIP39 = require('bip39');
const ethUtil = require('ethereumjs-util');

web3.setProvider(new web3.providers.WebsocketProvider(config.wssProvider));

function createAddress() {
  return web3.eth.accounts.create();
}

function createHDAddress(index, extendedKey) {
  if (!index) {
    throw new Error('Index is required');
  }

  let hdkey, addrNode, pubKey, address;
  let derivePath = `m/0/0/${index}`;

  if (extendedKey) {
    hdkey = HDKey.fromExtendedKey(extendedKey);
    addrNode = hdkey.derive(derivePath);
    pubKey = addrNode.publicKey;

    console.log(`Public Key: 0x${addrNode.publicKey.toString('hex')}`);
  }
  else {
    hdkey = createNewHDKey();
    addrNode = hdkey.derive(derivePath);
    pubKey = ethUtil.privateToPublic(addrNode.privateKey);

    console.log(`Public Key: 0x${addrNode.publicKey.toString('hex')}`);
    console.log(`Private Key: ${addrNode.privateKey.toString('hex')}`);
    console.log(`Extended Public Key: ${hdkey.publicExtendedKey}`);
    console.log(`Extended Private Key: ${hdkey.privateExtendedKey}`);
  }

  address = ethUtil.publicToAddress(pubKey, true).toString('hex');
  return ethUtil.toChecksumAddress(`0x${address}`);
}

function createNewHDKey() {
  const mnemonic = BIP39.generateMnemonic();
  const seed = BIP39.mnemonicToSeedSync(mnemonic);

  console.log(`Mnemonic: ${mnemonic}`);
  return HDKey.fromMasterSeed(seed);
}

module.exports = {
  createAddress: createAddress,
  createHDAddress: createHDAddress
}

