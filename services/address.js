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

// WIP
function createHDAddress(userId, extendedKey) {
  let hdkey, derivePath, addrNode, pubKey, address;

  if (!userId) {
    throw new Error('User ID is required');
  }

  if (extendedKey) {
    hdkey = HDKey.fromExtendedKey(extendedKey);

    derivePath = hdkey.privateKey ? `m/44'/60'/0'/0/${userId}` : `m/44/60/0/0/${userId}`
    addrNode = hdkey.derive(derivePath);
    console.log(addrNode)
    pubKey = addrNode.publicKey;
  }
  else {
    hdkey = createNewHDKey();
    addrNode = hdkey.derive(`m/44'/60'/0'/0/${userId}`);

    console.log(`Public Key: ${addrNode.publicKey.toString('hex')}`);
    console.log(`Private Key: ${addrNode.privateKey.toString('hex')}`);
    console.log(`Extended Public Key: ${hdkey.publicExtendedKey}`);
    console.log(`Extended Private Key: ${hdkey.privateExtendedKey}`);

    pubKey = ethUtil.privateToPublic(addrNode.privateKey);
  }

  address = ethUtil.publicToAddress(pubKey, true).toString('hex');
  return ethUtil.toChecksumAddress(`0x${address}`);
}

function createNewHDKey() {
  const mnemonic = BIP39.generateMnemonic();
  const seed = BIP39.mnemonicToSeedSync(mnemonic);

  return HDKey.fromMasterSeed(seed);
}

module.exports = {
  createAddress: createAddress,
  createHDAddress: createHDAddress
}

