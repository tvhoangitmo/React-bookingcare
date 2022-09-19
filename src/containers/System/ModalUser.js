import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter'

class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter()
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            // console.log('listen emitter from parent: ', data)
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        }
            // , () => {
            //     console.log('check state ', this.state)
            // }
        )
        //console.log('copy state: ', copyState)
        //console.log('event', event.target.value, id)
    }

    checkValideInput = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        let isValue = true
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValue = false
                alert('Missing parameter: ' + arrInput[i])
                break
            }
        }
        return isValue
    }

    handleAddNewUser = () => {
        let isValue = this.checkValideInput()
        if (isValue) {
            //call api create modal
            this.props.createNewUser(this.state)
        }
    }
    render() {
        //console.log('check child props', this.props)
        //console.log('check child open modal', this.props.isOpen)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body '>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleChangeInput(event, 'email') }}
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type='password'
                                onChange={(event) => { this.handleChangeInput(event, 'password') }}
                                value={this.state.password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Firstname</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleChangeInput(event, 'firstName') }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Lastname</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleChangeInput(event, 'lastName') }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleChangeInput(event, 'address') }}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.handleAddNewUser() }}
                    >Add new user</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);

