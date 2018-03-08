require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3();
const WalletProvider = require("truffle-hdwallet-provider");
const Wallet = require('ethereumjs-wallet');

var rinkebyPrivateKey = new Buffer(process.env["RINKEBY_PRIVATE_KEY"], "hex");
var rinkebyWallet = Wallet.fromPrivateKey(rinkebyPrivateKey);
var rinkebyProvider = new WalletProvider(rinkebyWallet, "https://rinkeby.infura.io/");

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777
    },
    rinkeby: {
      provider: rinkebyProvider,
      // You can get the current gasLimit by running
      // truffle deploy --network rinkeby
      // truffle(rinkeby)> web3.eth.getBlock("pending", (error, result) =>
      //   console.log(result.gasLimit))
      gas: 6721975,
      gasPrice: web3.toWei("50", "gwei"),
      network_id: "2",
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  }
};
