module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: '3334',
      network_id: '*',
      from: '0x8519EFB74800372022094790175dB23f8Fe751c5',
      gas: 0
    }
  },
  contracts_build_directory: './src/abi/',
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};