import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from '../../images/logo.png'
import loader from '../../images/loader.gif'
import {
    Alert,
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardImg,
    CardFooter,
    Container,
    Col,
    Form,
    FormGroup,
    Input,
    Row,
    Button
} from 'reactstrap'


class Home extends Component {
    constructor(props, context) {
        super(props)

        this.web3 = context.drizzle.web3
        this.contracts = context.drizzle.contracts
        this.events = context.drizzle.events
        this.handleDeployToken = this.handleDeployToken.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.onDismiss = this.onDismiss.bind(this)


        this.state = {
            tokenName: '',
            tokenSymbol: '',
            tokenInitialSupply: '',
            tokenAddress: '',
            receipt: '',
            error: '',
            visible: true,
            sendingMessage: '',
            successMessage: ''
        }
    }

    async handleDeployToken() {
        if (!this.state.tokenName || !this.state.tokenSymbol) {
            this.setState({ visible: true })
            this.setState({ error: 'Please provide all values.' })
        } else {
            this.setState({ error: '' })
            this.setState({ visible: true })
            this.setState({ sendingMessage: 'Transaction Pending - Confirm through Metamask' })

            try {
                const nonce = await this.web3.eth.getTransactionCount(this.props.accounts[0])
                this.setState({ receipt: await this.contracts.MyTokenFactory.methods.create(this.state.tokenName, this.state.tokenSymbol, this.state.tokenInitialSupply).send({ nonce: nonce }) })
                this.setState({ tokenAddress: this.state.receipt.events.ContractInstantiation.returnValues.instantiation })
                this.setState({ sendingMessage: '' })
                this.setState({ successMessage: 'Token deployed!' })
            } catch (error) {
                console.log(error)
                this.setState({ sendingMessage: '' })
                this.setState({ error: 'Transaction failed.' })
            }
        }
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    onDismiss() {
        this.setState({ visible: false })
    }

    render() {

        return (
            <Container className="text-center">
                <Row>
                    <Col md="12">
                        <Card >
                            <CardImg src={logo} className="center-block img-responsive" alt="drizzle-logo" id="logo" />
                            <CardBody>
                                <CardTitle>
                                    My Token Deployer
                                </CardTitle>
                                <CardText>
                                    Simply select your Token name and symbol and click deploy!
                                </CardText>
                                <CardText>
                                    My deploying account: {this.props.accounts[0]}
                                </CardText>
                                <Form className="pure-form pure-form-stacked">
                                    <FormGroup>
                                        <Input
                                            name="tokenName"
                                            type="text"
                                            value={this.state.tokenName}
                                            onChange={this.handleInputChange}
                                            placeholder="Token Name"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            name="tokenSymbol"
                                            type="text"
                                            maxLength="3"
                                            value={this.state.tokenSymbol}
                                            onChange={this.handleInputChange}
                                            placeholder="Token Symbol"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            name="tokenInitialSupply"
                                            type="text"
                                            maxLength="3"
                                            value={this.state.tokenInitialSupply}
                                            onChange={this.handleInputChange}
                                            placeholder="Token Initial Supply"
                                        />
                                    </FormGroup>
                                    {this.state.error &&
                                        <Alert
                                            color="danger"
                                            isOpen={this.state.visible}
                                            toggle={this.onDismiss}>
                                            {this.state.error}
                                        </Alert>
                                    }
                                    {this.state.sendingMessage &&
                                        <Alert
                                            color="light"
                                            isOpen={this.state.visible}>
                                            {this.state.sendingMessage}
                                            <div className="loader">
                                                <img src={loader} className="img-fluid" alt="" id="loader"></img>
                                            </div>
                                        </Alert>
                                    }
                                    {this.state.successMessage &&
                                        <Alert
                                            color="success"
                                            isOpen={this.state.visible}
                                            toggle={this.onDismiss}>
                                            {this.state.successMessage}
                                        </Alert>
                                    }
                                    <Button color="primary" className="pure-button" type="button" onClick={this.handleDeployToken}>Deploy my Token!</Button>
                                </Form>

                            </CardBody>
                            <CardFooter className="text-muted">
                                <p><strong>My Token contract address</strong>: {this.state.tokenAddress} </p>
                                <p><strong>Transaction Hash</strong>: {this.state.receipt.transactionHash}</p>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

Home.contextTypes = {
    drizzle: PropTypes.object
}

export default Home
