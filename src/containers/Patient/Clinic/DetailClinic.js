import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/Sections/HomeFooter';
import { getDetailClinic } from '../../../services/userService';
import _ from 'lodash';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import './DetailClinic.scss'

class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [],
            detailClinic: {},
            isShowMoreDescription: false
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailClinic({
                id: id
            })
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
                    detailClinic: dataDoctor
                })
            }
            console.log(res)
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

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
        let { arrDoctor, detailClinic, isShowMoreDescription } = this.state
        return (
            <>
                <Helmet>
                    <title>{detailClinic.name}</title>
                </Helmet>
                <div className='detail-clinic-container'>
                    <HomeHeader
                        isShowBanner={false}
                        inHomePage={false}
                    />
                    <div className='path'>
                        <i className="fas fa-home" onClick={() => this.goToPage('/home')}></i>
                        <span> / </span>
                        <span onClick={() => this.goToPage('/find-clinic')} ><FormattedMessage id='path.clinic' /></span>
                        <span> / </span>
                        <span> {detailClinic.name}</span>
                    </div>
                    <div className='title-clinic'>{detailClinic.name}</div>
                    <div className='detail-clinic-body'>
                        <div className='intro'>
                            <div className='description-clinic'>
                                <div className={isShowMoreDescription ? 'long-description' : 'short-description'}>
                                    {detailClinic && detailClinic.descriptionHTML
                                        && <div dangerouslySetInnerHTML={{ __html: detailClinic.descriptionHTML }}></div>
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

                        <div className='clinic-doctor'>
                            <div className='list-doctor'>Danh sach bac si</div>
                            {arrDoctor && arrDoctor.length > 0 && arrDoctor.map((item, index) => {
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
                            )
                            }
                        </div>
                    </div>
                    <HomeFooter />
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
