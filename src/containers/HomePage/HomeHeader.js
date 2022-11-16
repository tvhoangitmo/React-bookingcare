import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/1538462_4870-ai.svg'
import iconchuyenkhoa from '../../assets/iconbanner/chuyenkhoa.png'
import iconkhamtuxa from '../../assets/iconbanner/khamtuxa.png'
import iconkhamtongquat from '../../assets/iconbanner/khamtongquat.png'
import iconxetnghiem from '../../assets/iconbanner/dichvuxetnghiem.png'
import iconsuckhoetinhthan from '../../assets/iconbanner/suckhoetinhthan.png'
import iconnhakhoa from '../../assets/iconbanner/khamnhakhoa.png'
import ggplay from '../../assets/icon/ggplay.png'
import appstore from '../../assets/icon/appstore.png'
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { path } from '../../utils';
class HomeHeader extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         inHomePage : true
    //     }
    // }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    handleFindSection = (section) => {
        if (this.props.history) {
            this.props.history.push(section)
        }
    }

    render() {
        //console.log('check props', this.props)
        let language = this.props.language
        //console.log('check laguage: ', language, LANGUAGES.VI)
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>

                            {this.props.inHomePage === true ?
                                <>
                                    <i className="fas fa-bars"></i>
                                    <img className='header-logo' src={logo} alt="BigCo Inc. logo" onClick={() => this.returnToHome()} />
                                </>
                                :
                                <i className="fas fa-backward" onClick={() => this.returnToHome()}></i>
                            }

                        </div>

                        <div className='center-content'>
                            <div className='child-content'>
                                <div
                                    onClick={() => this.handleFindSection(path.FIND_SPECIALTY)}
                                >
                                    <b> <FormattedMessage id='homeheader.specialty' /></b>
                                </div>
                                <div className='subs-title'><FormattedMessage id='homeheader.searchdoctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div
                                    onClick={() => this.handleFindSection(path.FIND_CLINIC)}
                                >
                                    <b>
                                        <FormattedMessage id='homeheader.health-facility' />
                                    </b>
                                </div>
                                <div className='subs-title'><FormattedMessage id='homeheader.select-hospital' /></div>
                            </div>
                            <div className='child-content'>
                                <div
                                    onClick={() => this.handleFindSection(path.FIND_DOCTOR)}
                                >
                                    <b><FormattedMessage id='homeheader.doctor' /></b>
                                </div>
                                <div className='subs-title'><FormattedMessage id='homeheader.select-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id='homeheader.package' /></b></div>
                                <div className='subs-title'><FormattedMessage id='homeheader.general-health' /></div>
                            </div>
                        </div>

                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id='homeheader.support' />
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            <div className={language === LANGUAGES.RU ? 'language-ru active' : 'language-ru'}><span onClick={() => this.changeLanguage(LANGUAGES.RU)}>RU</span></div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'><FormattedMessage id='homebanner.title1' /></div>
                            <div className='title2'><FormattedMessage id='homebanner.title2' /></div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text' placeholder='Tìm chuyên khoa' />
                            </div>
                        </div>
                        <div className='ggplay-appstore'>
                            <div className='ggplay'><img src={ggplay} alt="BigCo Inc. logo" /></div>
                            <div className='appstore'><img src={appstore} alt="BigCo Inc. logo" /></div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><img src={iconchuyenkhoa} alt="BigCo Inc. logo" /></div>
                                    <div className='text-child'><FormattedMessage id='homebanner.child1' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><img src={iconkhamtuxa} alt="BigCo Inc. logo" /></div>
                                    <div className='text-child'><FormattedMessage id='homebanner.child2' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><img src={iconkhamtongquat} alt="BigCo Inc. logo" /></div>
                                    <div className='text-child'><FormattedMessage id='homebanner.child3' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><img src={iconxetnghiem} alt="BigCo Inc. logo" /></div>
                                    <div className='text-child'><FormattedMessage id='homebanner.child4' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><img src={iconsuckhoetinhthan} alt="BigCo Inc. logo" /></div>
                                    <div className='text-child'><FormattedMessage id='homebanner.child5' /></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><img src={iconnhakhoa} alt="BigCo Inc. logo" /></div>
                                    <div className='text-child'><FormattedMessage id='homebanner.child6' /></div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
