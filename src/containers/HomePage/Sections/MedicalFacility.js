import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './MedicalFacility.scss'
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';


class MedicalFacility extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {

        return (
            <React.Fragment>
                <div className=' section-share section-medical-facility'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id='homefacility.outstanding' /></span>
                            <button className='btn-section'><FormattedMessage id='homefacility.search' /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='bg-image facility-img1'></div>
                                    <div className='name-image'><FormattedMessage id='homefacility.facility1' /></div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image facility-img2'></div>
                                    <div className='name-image'><FormattedMessage id='homefacility.facility2' /></div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image facility-img3'></div>
                                    <div className='name-image'><FormattedMessage id='homefacility.facility3' /></div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image facility-img4'></div>
                                    <div className='name-image'><FormattedMessage id='homefacility.facility4' /></div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image facility-img5'></div>
                                    <div className='name-image'><FormattedMessage id='homefacility.facility5' /></div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image facility-img6'></div>
                                    <div className='name-image'><FormattedMessage id='homefacility.facility6' /></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
