import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
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
            listProvince: []
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
            console.log(resProvince)
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
                this.setState({
                    detailSpecialty: res.data,
                    arrDoctor: arrDoctor,
                    listProvince: resProvince.data
                })
            }
        }
    }

    handleOnChangeSelect = (event) => {
        console.log('check province', event.target.value)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { arrDoctor, detailSpecialty, listProvince } = this.state
        let { language } = this.props
        return (
            <div className='detail-specialty-container'>
                <HomeHeader
                    isShowBanner={false}
                    inHomePage={false}
                />
                <div className='detail-specialty-body'>
                    <div className='intro-search'>
                        <div className='description-specialty'>
                            {detailSpecialty && detailSpecialty.descriptionHTML
                                && <div dangerouslySetInnerHTML={{ __html: detailSpecialty.descriptionHTML }}></div>
                            }
                        </div>

                    </div>

                    <div className='specialty-doctor'>
                        <div className='search-doctor-by-province'>
                            <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                {listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : (language === LANGUAGES.EN ? item.valueEn : item.valueRU)}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {arrDoctor && arrDoctor.length > 0 ?
                            arrDoctor.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}>
                                        <div className='dt-content-left'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                //dataTime={this.props.dataTime}
                                                isShowProfileDoctor={true}
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
