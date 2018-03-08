# Token Deployer

A factory contract that deploys an erc20 token and assigns the initial balance to the sender.
Build using [Truffle Drizzle](http://truffleframework.com/blog/drizzle-reactive-ethereum-data-for-front-ends),
[zeppelin-solidity](https://github.com/OpenZeppelin/zeppelin-solidity).

## To run locally
Install:
[Metamask](https://metamask.io/#how-it-works) & 
[Ganache](http://truffleframework.com/ganache/)

1. Run Ganache
2. Deploy MyTokenFactory to ganache: ```truffle deploy --network [network]```
3. Run local front-end: ```npm run start```
4. Using Metamask Custom RPC option connect to Private Ganache Network:
5. RPC Server: HTTP://127.0.0.1:7545
6. Network ID: 5777
7. Import your Ganache account into Metamask using private key
8. Ready to deploy! Fill in token name and symbol and click.

## Serves the front-end on http://localhost:3000
npm run start

## Run Jest outside of the development console for front-end component tests.
npm run test

## Production build
npm run build

## deploy
To deploy:
```
truffle deploy --network [network]
```

## Issues

# Wrong Contract Address
When migrating
```
Error: Attempting to run transaction which calls a contract function, but recipient address 0x8cdaf0cd259887258bc13a92c0a6da92698644c0 is not a contract address
```
Solution: delete contents of /build/contracts and recompile.

# Jest test failing 872
https://github.com/reactstrap/reactstrap/issues/872

Quick fix: revert to "reactstrap": "5.0.0-beta". It has older react-popper version.

# Metamask does not support WS - Web1.0 Support
```
Error: The current provider doesn't support subscriptions: MetamaskInpageProvider
```
https://github.com/MetaMask/metamask-extension/issues/2350


## License
[MIT](https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/LICENSE)
