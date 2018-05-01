const MyTokenFactory = artifacts.require('./MyTokenFactory.sol')

module.exports = function(deployer) {
    deployer.deploy(MyTokenFactory)
}
