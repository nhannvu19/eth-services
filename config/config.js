// Định nghĩa network và WSS của network
const INFURA = {
  ropsten: {
    testnet: 'wss://ropsten.infura.io/ws/v3/a5ffbd86e1b342afa72e4ab48715e0f9',
    projectId: 'a5ffbd86e1b342afa72e4ab48715e0f9'
  }
}

// Định nghĩa mainAccount/currentAccount/fromAccount
const METAMASK = {
  address: '0x2a6B67dE8D6C6364C05D187B4f5Ff9Db6228979B',
  privateKey: 'dd585659e015dba06439a322ace46ab63f775497be194ca32aa938d100821986'
}

const NETWORK = 'ropsten';

module.exports = {
  infura: INFURA,
  network: NETWORK,
  metamask: METAMASK,
  wssProvider: INFURA[NETWORK].testnet
}
