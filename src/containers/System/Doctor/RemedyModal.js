import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './RemedyModal.scss'
import { toast } from "react-toastify"
class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imageBase64: '',
            diagnosis: ''
        }
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeDiagnosis = (event) => {
        let stateCopy = { ...this.state }
        stateCopy['diagnosis'] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.email
        })
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            //console.log('check base64: ', base64)
            let objUrl = URL.createObjectURL(file)
            // console.log(objUrl)
            this.setState({
                imageBase64: base64
            })
        }

    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {
        //console.log('check state ', this.state)
        let { isOpenModal, dataModal, isCloseModal, sendRemedy } = this.props
        return (
            <Modal
                isOpen={this.props.isOpenModal}
                size='lg'
                centered
                className={'booking-modal-container'}
            >
                <div className='modal-header'>
                    <h5 className='modal-title'>Медицинский счет/пецепт отправлен</h5>
                    <button type='button' className='close' aria-label='Close'>
                        <span aria-hidden="true" onClick={isCloseModal}>x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Электронная почта</label>
                            <input className='form-control' type='email'
                                value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Чек и Рецепт</label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Медицинская диагностика</label>
                            <input className='form-control' type='text'
                                onChange={(event) => this.handleOnChangeDiagnosis(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button color='primary' onClick={() => this.handleSendRemedy()}>Отправить</button>
                    <button color='secondary' onClick={isCloseModal}>Отмена</button>
                </ModalFooter>
            </Modal >
        )

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
