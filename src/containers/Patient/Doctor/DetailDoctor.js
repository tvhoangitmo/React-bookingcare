import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import { Helmet } from 'react-helmet';
import './DetailDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import HomeFooter from '../../HomePage/Sections/HomeFooter';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import { FormattedMessage } from 'react-intl';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
import Comment from '../SocialPlugin/Comment';

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id)
            //console.log('check get detail doctor by api: ', res)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                    currentDoctorId: id
                })
            }

            // imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    goToPage = (path) => {
        if (this.props.history) {
            this.props.history.push(path)
        }
    }
    render() {
        //console.log('check state detail doctor: ', this.state.detailDoctor)
        //console.log('state :', this.state)
        //console.log('props :', this.props)
        let { detailDoctor } = this.state
        let { language } = this.props
        let nameVi = '', nameEn = '', nameRu = ''
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = ''
            if (detailDoctor.positionData.valueEn === 'None') {
                nameEn = `Doctor, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            }
            else {
                nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            }
            nameRu = `${detailDoctor.positionData.valueRu}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
        }

        return (
            <React.Fragment>
                <Helmet>
                    <title>{language === LANGUAGES.VI ? nameVi : (language === LANGUAGES.EN ? nameEn : nameRu)}</title>
                </Helmet>
                <HomeHeader
                    isShowBanner={false}
                    inHomePage={false}
                />
                <div className='doctor-detail-container'>
                    <div className='path'>
                        <i className="fas fa-home" onClick={() => this.goToPage('/home')}></i>
                        <span> / </span>
                        <span onClick={() => this.goToPage('/find-doctor')} ><FormattedMessage id='path.doctor' /></span>

                        <span> / </span>
                        <span> {nameVi}</span>
                    </div>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : (language === LANGUAGES.EN ? nameEn : nameRu)}
                            </div>
                            <div className='down'>
                                {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.description
                                    && <span>
                                        {detailDoctor.MarkDown.description}
                                    </span>}
                            </div>
                            {/* <LikeAndShare /> */}
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorId={this.state.currentDoctorId}
                                firstName={this.state.detailDoctor.firstName}
                                lastName={this.state.detailDoctor.lastName}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfor
                                doctorId={this.state.currentDoctorId}
                            />
                        </div>
                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: detailDoctor.MarkDown.contentHTML }}></div>
                        }
                    </div>
                </div >
                {/* <Comment /> */}
                <HomeFooter />
            </React.Fragment >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
