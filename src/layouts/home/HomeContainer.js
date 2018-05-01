import Home from './Home'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
    return {
        drizzleStatus: state.drizzleStatus,
        accounts: state.accounts,
        MyTokenFactory: state.contracts.MyTokenFactory
    }
}

const HomeContainer = drizzleConnect(Home, mapStateToProps)

export default HomeContainer
