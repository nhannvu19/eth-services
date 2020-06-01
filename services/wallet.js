// Khai báo sử dụng thư viện hdkey
const HDKey = require('hdkey');
const BIP39 = require('bip39');
const ethUtil = require('ethereumjs-util');

function createHDAddress(index, bipVersion, extendedKey) {
  if (!index) {
    throw new Error('Index is required');
  }

  if (bipVersion == 'BIP32') {
    return useBip32(index, extendedKey);
  }
  else if (bipVersion == 'BIP44') {
    return useBip44(index, extendedKey);
  }
  else {
    throw new Error('BIP version is invalid');
  }
}

function useBip44(index, extendedKey) {
  let hdkey, addrNode, pubKey, address;
  let derivePath = `m/44'/60'/0'/0/${index}`;

  if (extendedKey) {
    if (extendedKey[2] != 'r') {
      throw new Error('Extended private key is required for BIP44');
    }

    hdkey = HDKey.fromExtendedKey(extendedKey);
  }
  else {
    hdkey = createNewHDKey();
  }

  addrNode = hdkey.derive(derivePath);
  pubKey = ethUtil.privateToPublic(addrNode.privateKey);

  console.log(`Public Key: 0x${addrNode.publicKey.toString('hex')}`);
  console.log(`Private Key: ${addrNode.privateKey.toString('hex')}`);
  console.log(`Extended Public Key: ${hdkey.publicExtendedKey}`);
  console.log(`Extended Private Key: ${hdkey.privateExtendedKey}`);

  address = ethUtil.publicToAddress(pubKey, true).toString('hex');
  return ethUtil.toChecksumAddress(`0x${address}`);
}

function useBip32(index, extendedKey) {
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
  createHDAddress: createHDAddress
}

