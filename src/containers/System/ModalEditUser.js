import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import { emitter } from '../../utils/emitter'
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        console.log('curren user: ', this.props.currenUser)
        let user = this.props.currenUser
        //let {user} = this.props
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
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

    handleSaveUser = () => {
        let isValue = this.checkValideInput()
        if (isValue) {
            //call api create modal
            this.props.editUser(this.state)
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
                <ModalHeader toggle={() => { this.toggle() }}>Edit user's information</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body '>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleChangeInput(event, 'email') }}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type='password'
                                onChange={(event) => { this.handleChangeInput(event, 'password') }}
                                value={this.state.password}
                                disabled
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
                        onClick={() => { this.handleSaveUser() }}
                    >Save changes</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

