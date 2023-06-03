module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", //address CHANGE THIS IF NOT USING LOCAL HOST
      port: '3334', //port number CHANGE THIS
      network_id: '*',
      from: '0xbBf359CA690500312003763c73Fbc21Ce3A8987A', //contract owner address CHANGE THIS
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