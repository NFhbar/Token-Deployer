require('dotenv').config()
require('babel-register')({
    ignore: /node_modules\/(?!zeppelin-solidity\/test\/helpers)/
})
require('babel-polyfill')
const Web3 = require('web3')
const web3 = new Web3()
const WalletProvider = require('truffle-wallet-provider')
const Wallet = require('ethereumjs-wallet')

const rinkebyPrivateKey = new Buffer(process.env['RINKEBY_PRIVATE_KEY'], 'hex')
const rinkebyWallet = Wallet.fromPrivateKey(rinkebyPrivateKey)
const rinkebyProvider = new WalletProvider(rinkebyWallet, 'https://rinkeby.infura.io/')

module.exports = {
    migrations_directory: './migrations',
    networks: {
        development: {
            host: 'localhost',
            port: 9545,
            network_id: '*' // Match any network id
        },
        coverage: {
            host: 'localhost',
            network_id: '*',
            port: 9545,         // <-- If you change this, also set the port option in .solcover.js.
            gas: 0xfffffffffff, // <-- Use this high gas value
            gasPrice: 0x01      // <-- Use this low gas price
        },
        ganache: {
            host: '127.0.0.1',
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
            gasPrice: web3.toWei('50', 'gwei'),
            network_id: '4',
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 500
        }
    }
}
