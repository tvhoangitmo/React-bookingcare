import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import DatePicker from '../../../components/Input/DatePicker';
import moment, { months } from 'moment';
import { LANGUAGES, dateFormat } from '../../../utils';
import { toast } from "react-toastify"
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.fetchAllScheduleTime()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctor !== this.props.listDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.listDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                // data = data.map(item => {
                //     item.isSelected = false
                //     return item
                // })
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            //console.log('check data time: ', data)
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let label = `${item.lastName} ${item.firstName}`
                object.label = label
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    handleChangeSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor: selectedDoctor });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        //console.log('check time click: ', time)
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected
                return item
            })
        }
        //console.log('check choose time: ', rangeTime)
        this.setState({
            rangeTime: rangeTime
        })
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = []
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid doctor!")
            return
        }
        if (!currentDate) {
            toast.error("Invalid date!")
            return
        }

        //let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        //let formatedDate = moment(currentDate).unix()
        let formatedDate = new Date(currentDate).getTime()

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(time => {
                    let object = {}
                    object.doctorId = selectedDoctor.value
                    object.date = formatedDate
                    object.timeType = time.keyMap
                    result.push(object)
                })

            } else {
                toast.error("Invalid selected time!")
                return
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: '' + formatedDate
        })
        if (res && res.errCode === 0) {
            toast.success("Selection has been saved")
        } else {
            toast.error("Saved failed")
            console.log("Error ", res)
        }

    }

    render() {
        //console.log('check props: ', this.props.addScheduleTime)
        let { rangeTime } = this.state
        let { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        //console.log('check state: ', rangeTime)
        return (
            <div className='manage-schedule-container'>
                <div className='manage-schedule-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <label><FormattedMessage id='manage-schedule.choose-doctor' /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelectDoctor}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div className='col-6'>
                            <label><FormattedMessage id='manage-schedule.choose-date' /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate[0]}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    //console.log('check isselected: ', item.isSelected)
                                    return (
                                        <button className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : (language === LANGUAGES.EN ? item.valueEn : item.valueRu)}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button
                                className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id='manage-schedule.save' />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        listDoctor: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
