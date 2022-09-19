import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss'
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';

class Specialty extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        //let language = this.props.language

        return (
            <React.Fragment>
                <div className=' section-share sectionspecialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id='homespecialty.specialtypopular' /></span>
                            <button className='btn-section'><FormattedMessage id='homespecialty.more' /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize section-specialty'>
                                    <div className='bg-image specialty-img1'></div>
                                    <div className='name-image'><FormattedMessage id='homespecialty.specialty1' /></div>
                                </div>
                                <div className='section-customize section-specialty'>
                                    <div className='bg-image specialty-img2'></div>
                                    <div className='name-image'><FormattedMessage id='homespecialty.specialty2' /></div>
                                </div>
                                <div className='section-customize section-specialty'>
                                    <div className='bg-image specialty-img3'></div>
                                    <div className='name-image'><FormattedMessage id='homespecialty.specialty3' /></div>
                                </div>
                                <div className='section-customize section-specialty'>
                                    <div className='bg-image specialty-img4'></div>
                                    <div className='name-image'><FormattedMessage id='homespecialty.specialty4' /></div>
                                </div>
                                <div className='section-customize section-specialty'>
                                    <div className='bg-image specialty-img5'></div>
                                    <div className='name-image'><FormattedMessage id='homespecialty.specialty5' /></div>
                                </div>
                                <div className='section-customize section-specialty'>
                                    <div className='bg-image specialty-img6'></div>
                                    <div className='name-image'><FormattedMessage id='homespecialty.specialty6' /></div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>

            </React.Fragment >
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
