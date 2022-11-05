import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getInforDoctor } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import './ProfileDoctor.scss'
import localization from 'moment/locale/vi'
import _ from 'lodash';
import moment from 'moment';
import { withRouter } from 'react-router';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileDoctor: {}
        }
    }
    async componentDidMount() {
        let data = await this.getProfileDoctor(this.props.doctorId)
        this.setState({
            profileDoctor: data
        })
    }

    getProfileDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getInforDoctor(id)
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getProfileDoctor(this.props.doctorId);
            this.setState({
                profileDoctor: data,
            });
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = '', time = ''
            if (language === LANGUAGES.VI) {
                date = this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).format('dddd - DD/MM'))
                time = dataTime.timeTypeData.valueVi
            }
            if (language === LANGUAGES.EN) {
                date = this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).locale('en').format('dd - DD/MM'))
                time = dataTime.timeTypeData.valueEn
            }
            if (language === LANGUAGES.RU) {
                date = this.capitalizeFirstLetter(moment.unix(+dataTime.date / 1000).locale('ru').format('dd - DD/MM'))
                time = dataTime.timeTypeData.valueRu
            }
            return (
                <>
                    <div>{time} - {date}</div>
                    <div>Free booking</div>
                </>
            )
        }
        return (
            <></>
        )
    }
    routerToDetailDoctor = () => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${this.props.doctorId}`)
        }
    }

    render() {
        //console.log('check props from profile doctor', this.props)

        let { profileDoctor } = this.state
        let { language, dataTime, isShowProfileDoctor, isShowMore } = this.props
        //let language = this.props.language
        let nameVi = '', nameEn = '', nameRu = ''
        let provinceVi = '', provinceEn = '', provinceRu = ''
        if (profileDoctor && profileDoctor.positionData) {
            nameVi = `${profileDoctor.positionData.valueVi}, ${profileDoctor.lastName} ${profileDoctor.firstName}`
            nameEn = ''
            if (profileDoctor.positionData.valueEn === 'None') {
                nameEn = `Doctor, ${profileDoctor.lastName} ${profileDoctor.firstName}`
            }
            else {
                nameEn = `${profileDoctor.positionData.valueEn}, ${profileDoctor.lastName} ${profileDoctor.firstName}`
            }
            nameRu = `${profileDoctor.positionData.valueRu}, ${profileDoctor.lastName} ${profileDoctor.firstName}`
        }
        if (profileDoctor && profileDoctor.Doctor_Infor && profileDoctor.Doctor_Infor.provinceData) {
            provinceVi = profileDoctor.Doctor_Infor.provinceData.valueVi
            provinceEn = profileDoctor.Doctor_Infor.provinceData.valueEn
            provinceRu = profileDoctor.Doctor_Infor.provinceData.valueRu
        }
        return (
            <div className='profile-doctor'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${profileDoctor && profileDoctor.image ? profileDoctor.image : ''})` }}>
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : (language === LANGUAGES.EN ? nameEn : nameRu)}
                        </div>
                        <div className='down'>
                            {isShowProfileDoctor && profileDoctor && profileDoctor.MarkDown && profileDoctor.MarkDown.description
                                && <span>
                                    {profileDoctor.MarkDown.description}
                                </span>}
                            {this.renderTimeBooking(dataTime)}
                        </div>
                        <div className='province'><i className="fas fa-map-marker"></i> {language === LANGUAGES.VI ? provinceVi : (language === LANGUAGES.EN ? provinceEn : provinceRu)}</div>
                        <div className='price'>
                            <i className="fas fa-dollar-sign"></i> <FormattedMessage id='patient.modal-booking.price' />
                            {profileDoctor && profileDoctor.Doctor_Infor && profileDoctor.Doctor_Infor.priceData && language === LANGUAGES.VI &&
                                <NumberFormat
                                    value={profileDoctor.Doctor_Infor.priceData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' VND'} />
                            }
                            {profileDoctor && profileDoctor.Doctor_Infor && profileDoctor.Doctor_Infor.priceData && language === LANGUAGES.EN &&
                                <NumberFormat
                                    value={profileDoctor.Doctor_Infor.priceData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' $'} />
                            }
                            {profileDoctor && profileDoctor.Doctor_Infor && profileDoctor.Doctor_Infor.priceData && language === LANGUAGES.RU &&
                                <NumberFormat
                                    value={profileDoctor.Doctor_Infor.priceData.valueRu}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' РУБ'} />
                            }
                        </div>
                    </div>
                </div>

                {isShowMore
                    ?
                    <div className='more' onClick={() => this.routerToDetailDoctor()} ><FormattedMessage id='patient.modal-booking.more' /></div>
                    :
                    <></>
                }
            </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor));
