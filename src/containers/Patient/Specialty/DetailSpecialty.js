import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import HomeFooter from '../../HomePage/Sections/HomeFooter'
import { getDetailSpecialty, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import './DetailSpecialty.scss'

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [],
            detailSpecialty: {},
            listProvince: [],
            isShowMoreDescription: false
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailSpecialty({
                id: id,
                location: 'ALL'
            })

            let resProvince = await getAllCodeService('PROVINCE')
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let dataDoctor = res.data
                let arrDoctor = []
                if (dataDoctor && !_.isEmpty(dataDoctor)) {
                    let arr = dataDoctor.Doctor_Infors
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "Nationwide",
                        valueRu: "По всей стране",
                        valueVi: "Toàn quốc"
                    })
                }
                this.setState({
                    detailSpecialty: res.data,
                    arrDoctor: arrDoctor,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }

    handleOnChangeSelect = async (event) => {
        console.log('check province', this.props.match.params.id, event.target.value)
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let location = event.target.value
            let res = await getDetailSpecialty({
                id: id,
                location: location
            })
            console.log(res.data)
            if (res && res.errCode === 0) {
                let dataDoctor = res.data
                let arrDoctor = []
                if (dataDoctor && !_.isEmpty(dataDoctor)) {
                    let arr = dataDoctor.Doctor_Infors
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctor.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    arrDoctor: arrDoctor,
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleShowMoreDescription = () => {
        this.setState({
            isShowMoreDescription: !this.state.isShowMoreDescription
        })
    }
    goToPage = (path) => {
        if (this.props.history) {
            this.props.history.push(path)
        }
    }
    render() {
        let { arrDoctor, detailSpecialty, listProvince, isShowMoreDescription } = this.state
        let { language } = this.props
        return (
            <div className='detail-specialty-container'>
                <Helmet>
                    <title>{detailSpecialty.name}</title>
                </Helmet>
                <HomeHeader
                    isShowBanner={false}
                    inHomePage={false}
                />
                <div className='detail-specialty-body'>
                    <div className='path'>
                        <i className="fas fa-home" onClick={() => this.goToPage('/home')}></i>
                        <span> / </span>
                        <span onClick={() => this.goToPage('/find-specialty')} ><FormattedMessage id='path.specialty' /></span>
                        <span> / </span>
                        <span> {detailSpecialty.name}</span>
                    </div>
                    <div className='intro'>
                        <div className='description-specialty'>
                            <div className={isShowMoreDescription ? 'long-description' : 'short-description'}>
                                {detailSpecialty && detailSpecialty.descriptionHTML
                                    && <div dangerouslySetInnerHTML={{ __html: detailSpecialty.descriptionHTML }}></div>
                                }
                            </div>
                            <div className='more-description' onClick={() => this.handleShowMoreDescription()}>
                                {isShowMoreDescription ?
                                    <>
                                        <FormattedMessage id='homefacility.hide' />
                                    </>
                                    :
                                    <>
                                        <FormattedMessage id='homefacility.more-description' />
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='specialty-doctor'>
                        <div className='search-doctor-by-province'>
                            <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                {listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap} className='province'>
                                                {language === LANGUAGES.VI ? item.valueVi : (language === LANGUAGES.EN ? item.valueEn : item.valueRu)}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {arrDoctor && arrDoctor.length > 0 ?
                            arrDoctor.map((item, index) => {
                                console.log(item)
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div className='dt-content-left'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                //dataTime={this.props.dataTime}
                                                isShowProfileDoctor={true}
                                                isShowMore={true}
                                            />
                                        </div>
                                        <div className='dt-content-right'>
                                            <div className='doctor-schedule'>
                                                <DoctorSchedule
                                                    doctorId={item}
                                                />
                                            </div>

                                            <div className='doctor-extra-infor'>
                                                <DoctorExtraInfor
                                                    doctorId={item}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                )
                            }
                            ) :
                            <div>Không có bác sĩ thuộc tỉnh thành này</div>
                        }
                    </div>
                </div>
                <HomeFooter />
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
