const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    private: {
      provider: () => new HDWalletProvider("pass12345", "http://127.0.0.1:3334"),
      network_id: '12345',
      gas: 0
    }
  }
};