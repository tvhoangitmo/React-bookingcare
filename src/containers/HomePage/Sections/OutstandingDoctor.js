import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';


class OutstandingDoctor extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {

        return (
            <React.Fragment>
                <div className=' section-share'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id='homedoctor.outstandingdoctor' /></span>
                            <button className='btn-section'><FormattedMessage id='homedoctor.search' /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='customize-border'>
                                        <div className='outer-bg'>
                                            <div className='section-outstanding-doctor  doctor-img1 '></div>
                                        </div>
                                        <div className='position text-center'>
                                            <div><FormattedMessage id='homedoctor.doctor1' /></div>
                                            <div><FormattedMessage id='homedoctor.specialtydoctor1' /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='customize-border'>
                                        <div className='outer-bg'>
                                            <div className=' doctor-img2 section-outstanding-doctor'></div>
                                        </div>
                                        <div className='position text-center'>
                                            <div><FormattedMessage id='homedoctor.doctor2' /></div>
                                            <div><FormattedMessage id='homedoctor.specialtydoctor2' /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='customize-border'>
                                        <div className='outer-bg'>
                                            <div className=' doctor-img3 section-outstanding-doctor'></div>
                                        </div>
                                        <div className='position text-center'>
                                            <div><FormattedMessage id='homedoctor.doctor3' /></div>
                                            <div><FormattedMessage id='homedoctor.specialtydoctor3' /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='customize-border'>
                                        <div className='outer-bg'>
                                            <div className=' doctor-img4 section-outstanding-doctor'></div>
                                        </div>
                                        <div className='position text-center'>
                                            <div><FormattedMessage id='homedoctor.doctor4' /></div>
                                            <div><FormattedMessage id='homedoctor.specialtydoctor4' /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='customize-border'>
                                        <div className='outer-bg'>
                                            <div className=' doctor-img5 section-outstanding-doctor'></div>
                                        </div>
                                        <div className='position text-center'>
                                            <div><FormattedMessage id='homedoctor.doctor5' /></div>
                                            <div><FormattedMessage id='homedoctor.specialtydoctor5' /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='customize-border'>
                                        <div className='outer-bg'>
                                            <div className=' doctor-img6 section-outstanding-doctor'></div>
                                        </div>
                                        <div className='position text-center'>
                                            <div><FormattedMessage id='homedoctor.doctor6' /></div>
                                            <div><FormattedMessage id='homedoctor.specialtydoctor6' /></div>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
