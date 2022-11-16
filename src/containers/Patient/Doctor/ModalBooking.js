import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalBooking.scss'
import ProfileDoctor from './ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../components/Input/DatePicker';
import * as actions from '../../../store/actions'
import { saveInforPatient } from '../../../services/userService';
import { toast } from "react-toastify"
class ModalBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            birthday: '',
            phone: '',
            email: '',
            address: '',
            reason: '',
            gender: '',
            timeType: '',

            genderArr: [],
        }
    }
    async componentDidMount() {
        // let infor = await getInforDoctor(this.props.doctorId)
        // console.log(infor)
        this.props.getGenderStart()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let genderArr = this.props.genderRedux
        if (prevProps.genderRedux != this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
                // gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : ''
            })
        }
    }

    handleChangeInputModal = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
        console.log(this.state.name)
    }

    handleOnChangeDatePicker = (date) => {
        console.log('check date selected ', date)
        this.setState({
            birthday: date[0]
        })
    }

    handleSaveInforPatient = async () => {
        // (!data.email || !data.doctorId || !data.date || !data.timeType)
        let date = new Date(this.state.birthday).getTime()
        let res = await saveInforPatient({
            name: this.state.name,
            birthday: date,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            gender: this.state.gender,
            doctorId: this.props.doctorId,
            date: this.props.dataTime.date,
            dataTime: this.props.dataTime,
            timeType: this.props.dataTime.timeType,

            firstName: this.props.firstName,
            lastName: this.props.lastName,
            language: this.props.language

        })
        console.log(res)

        if (res && res.errCode === 0) {
            toast.success("Save patient's infor success")
            this.props.isCloseModal()
        } else {
            toast.error("Saved failed")
            console.log("Error ", res)
        }

    }

    render() {
        //console.log('check state ', this.state)
        let { genderArr } = this.state
        let { language } = this.props
        let doctorId = ''
        if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
            doctorId = this.props.dataTime.doctorId
        }
        return (
            <Modal
                isOpen={this.props.isOpenModal}
                size='lg'
                centered
                className={'booking-modal-container'}
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='patient.modal-booking.title' /></span>
                        <span className='right'
                            onClick={this.props.isCloseModal}
                        ><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                dataTime={this.props.dataTime}
                                isShowProfileDoctor={false}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group' >
                                <label><FormattedMessage id='patient.modal-booking.name' /></label>
                                <input className='form-control'
                                    onChange={(event) => this.handleChangeInputModal(event, 'name')}
                                    value={this.state.name}
                                />
                            </div>
                            <div className='col-6 form-group' >
                                <label><FormattedMessage id='patient.modal-booking.phone' /></label>
                                <input className='form-control'
                                    value={this.state.phone}
                                    onChange={(event) => this.handleChangeInputModal(event, 'phone')}
                                />
                            </div>
                            <div className='col-6 form-group' >
                                <label><FormattedMessage id='patient.modal-booking.email' /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleChangeInputModal(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group' >
                                <label><FormattedMessage id='patient.modal-booking.address' /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleChangeInputModal(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group' >
                                <label><FormattedMessage id='patient.modal-booking.reason' /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleChangeInputModal(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group' >
                                <label><FormattedMessage id='patient.modal-booking.birthday' /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className='form-control'
                                    value={this.state.birthday[0]}
                                    placeholder={'Chọn ngày sinh'}
                                />
                            </div>
                            <div className='col-6 form-group' >
                                <label><FormattedMessage id='patient.modal-booking.gender' /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.handleChangeInputModal(event, 'gender') }}
                                    value={this.state.gender}
                                    placeholder='Chon gioi tinh'
                                >
                                    {genderArr && genderArr.length > 0 &&
                                        genderArr.map((item, index) => {
                                            //console.log('a ', item)
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : (language === LANGUAGES.EN ? item.valueEn : item.valueRu)}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={() => this.handleSaveInforPatient()}
                        >
                            <FormattedMessage id='patient.modal-booking.save' />
                        </button>
                        <button className='btn-boongking-confirm'
                            onClick={this.props.isCloseModal}
                        >
                            <FormattedMessage id='patient.modal-booking.cancel' />
                        </button>
                    </div>
                </div>
            </Modal >
        )

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
