import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemery } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import './ManagePatient.scss'
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }
    async componentDidMount() {

        this.getDataPatient()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })

        if (res && res.data) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    handleConfirmBooking = (item) => {
        let doctor = this.props.user
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.User.email,
            date: item.date,
            timeType: item.timeType,
            namePatient: item.User.firstName,
            firstNameDoctor: doctor.firstName,
            lastNameDoctor: doctor.lastName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
        //console.log(data)
    }

    sendRemedy = async (data) => {
        console.log(data)
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemery({
            email: data.email,
            imageBase64: data.imageBase64,
            diagnosis: data.diagnosis,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            date: dataModal.date,
            timeType: dataModal.timeType,
            language: this.props.language,
            namePatient: dataModal.namePatient,
            firstNameDoctor: dataModal.firstNameDoctor,
            lastNameDoctor: dataModal.lastNameDoctorб
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success("Send remery successfully")
            this.getDataPatient()
            this.handleCloseModalBooking()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error("Send failed")
        }

    }
    handleCloseModalBooking = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }
    render() {
        let { dataPatient } = this.state
        let { language } = this.props
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'><FormattedMessage id='manage-patient.title' /></div>
                        <div className='manage-patinet-body row'>
                            <div className='col-4 form-group'>
                                <label><FormattedMessage id='manage-patient.choose-date' /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className='form-control'
                                    value={this.state.currentDate}
                                //minDate={yesterday}
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th><FormattedMessage id="manage-patient.stt" /></th>
                                            <th><FormattedMessage id="manage-patient.time" /></th>
                                            <th><FormattedMessage id="manage-patient.name" /></th>
                                            <th><FormattedMessage id="manage-patient.gender" /></th>
                                            <th><FormattedMessage id="manage-patient.address" /></th>
                                            <th><FormattedMessage id="manage-patient.actions" /></th>
                                        </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let gender = language === LANGUAGES.VI ? item.User.genderData.valueVi : (language === LANGUAGES.EN ? item.User.genderData.valueEn : item.User.genderData.valueRu)
                                                let time = language === LANGUAGES.VI ? item.timeData.valueVi : (language === LANGUAGES.EN ? item.timeData.valueEn : item.timeData.valueRu)
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.User.firstName}</td>
                                                        <td>{gender}</td>
                                                        <td>{item.User.address}</td>
                                                        <td>
                                                            <button
                                                                className='btn-confirm-booking'
                                                                onClick={() => this.handleConfirmBooking(item)}>
                                                                <FormattedMessage id="manage-patient.confirm" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan={6} style={{ textAlign: 'center' }}>No data</td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={this.state.isOpenRemedyModal}
                        dataModal={this.state.dataModal}
                        isCloseModal={this.handleCloseModalBooking}
                        sendRemedy={this.sendRemedy}
                    // dataTime={this.state.dataTime}
                    // doctorId={this.props.doctorId}
                    // firstName={this.props.firstName}
                    // lastName={this.props.lastName}
                    />
                </LoadingOverlay>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
