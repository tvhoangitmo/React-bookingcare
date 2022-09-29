import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
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
            this.setState({
                rangeTime: this.props.allScheduleTime
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

    render() {
        //console.log('check props: ', this.props.addScheduleTime)
        let { rangeTime } = this.state
        let { language } = this.props
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
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className='btn btn-schedule' key={index}>{language === LANGUAGES.VI ? item.valueVi : (language === LANGUAGES.EN ? item.valueEn : item.valueRu)}</button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'><button className='btn btn-primary btn-save-schedule'><FormattedMessage id='manage-schedule.save' /></button></div>

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
