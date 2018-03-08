const tokenFactory = artifacts.require('MyTokenFactory');
const myToken = artifacts.require('MyToken')
const utils = require('./helpers/utils')

contract('MyTokenFactory', accounts => {
    //deploy contracts
    let factoryInstance
    const owner = accounts[0]
    const tokenName = 'MyToken'
    const tokenSymbol = "MTS"
    const INITIAL_SUPPLY = 1e+22

    beforeEach(async () => {
      // [accounts[0], accounts[1]], requiredConfirmations, dailyLimit
      factoryInstance = await tokenFactory.new()
      assert.ok(factoryInstance)
    })

  it('Deploys and gives Tokens to msg.sender', async () => {
    //Create Factory Contract
    const token = await factoryInstance.create(tokenName, tokenSymbol, {from: owner})
    const tokenAddress = utils.getParamFromTxEvent(token, 'instantiation', null, 'ContractInstantiation')

    //Check owner has instantiation of token contract
    const tokenCount = await factoryInstance.getInstantiationCount(owner)
    const tokenAddressConfirmation = await factoryInstance.instantiations(owner, tokenCount.sub(1).toNumber())

    //check instantiaton is same as token address
    assert.equal(tokenAddress, tokenAddressConfirmation)
    assert.ok(factoryInstance.isInstantiation(tokenAddress))

    //get token instance at address
    const tokenInstance = myToken.at(tokenAddress)

    //get variables from token instance
    const name = await tokenInstance.name()
    const symbol = await tokenInstance.symbol()
    const balanceOwner = await tokenInstance.balanceOf(owner)

    //check they are all the same
    assert.equal(name, tokenName)
    assert.equal(symbol, tokenSymbol)
    assert.equal(balanceOwner, INITIAL_SUPPLY)
  })
})
