import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils';
import localization from 'moment/locale/vi'
import moment from 'moment';
import { getScheduleDoctorByDate, getAllPatientForDoctor } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import ModalBooking from './ModalBooking'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allTime: [],
            isOpenModal: false,
            dataTime: {},
            bookingDoctorInDate: []
        }
    }

    async componentDidMount() {
        let { language } = this.props
        let allDays = this.setArrDays(language)
        if (this.props.doctorId) {
            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value)
            this.setState({
                allTime: res.data ? res.data : []
            })
            let res2 = await getAllPatientForDoctor({
                doctorId: this.props.doctorId,
                date: allDays[0].value
            })
            this.setState({
                bookingDoctorInDate: res2.data ? res2.data : []
            })
        }

        if (allDays && allDays.length > 0) {
            this.setState({
                allDays: allDays,
            })
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.setArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let allDays = this.setArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value)
            this.setState({
                allTime: res.data ? res.data : []
            })
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                object.label = this.capitalizeFirstLetter(labelVi)
            }
            if (language === LANGUAGES.EN) {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            }
            if (language === LANGUAGES.RU) {
                object.label = moment(new Date()).add(i, 'days').locale('ru').format('dd - DD/MM')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(object)
        }

        return allDays
    }

    handleOnChangeSelect = async (event) => {
        console.log(this.props.doctorId)
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            let allTime = []
            if (res && res.errCode === 0) {
                allTime = res.data
                this.setState({
                    allTime: allTime
                })
            }
        }
    }

    handleOpenModalBooking = (time) => {
        this.setState({
            isOpenModal: true,
            dataTime: time
        })
    }

    handleCloseModalBooking = () => {
        this.setState({
            isOpenModal: false
        })
    }

    render() {
        let allDays = this.state.allDays
        let allTime = this.state.allTime
        let language = this.props.language
        let { bookingDoctorInDate } = this.state
        return (
            <React.Fragment>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    )
                                })

                            }
                        </select>
                    </div>
                    <div className='all-slected-time'>
                        <div className='text-calendar'>
                            <i className="far fa-calendar-alt"></i><span><FormattedMessage id='patient.detail-doctor.schedule' /></span>
                        </div>
                        <div className='time-content'>

                            {allTime && allTime.length > 0 ?
                                <React.Fragment>
                                    <div className='schedule-content'>
                                        {allTime.map((item, index) => {
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => this.handleOpenModalBooking(item)}
                                                >
                                                    {language === LANGUAGES.VI ? item.timeTypeData.valueVi : (language === LANGUAGES.EN ? item.timeTypeData.valueEn : item.timeTypeData.valueRu)}
                                                </button>
                                            )
                                        })}


                                    </div>
                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id='patient.detail-doctor.choose' />
                                            <i className="far fa-hand-point-up"></i>
                                            <FormattedMessage id='patient.detail-doctor.free-book' /></span>
                                    </div>
                                </React.Fragment>
                                :
                                <div className='no-schedule'><FormattedMessage id='patient.detail-doctor.no-schedule' /></div>
                            }
                        </div>
                    </div>
                </div >
                <ModalBooking
                    isOpenModal={this.state.isOpenModal}
                    isCloseModal={this.handleCloseModalBooking}
                    dataTime={this.state.dataTime}
                    doctorId={this.props.doctorId}
                    firstName={this.props.firstName}
                    lastName={this.props.lastName}
                />
            </React.Fragment>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
