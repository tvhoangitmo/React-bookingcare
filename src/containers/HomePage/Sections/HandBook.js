import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './MedicalFacility.scss'
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';


class HandBook extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {

        return (
            <React.Fragment>
                <div className=' section-share section-medical-facility'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>HandBook</span>
                            <button className='btn-section'>All handbook</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='bg-image section-handbook'></div>
                                    <div className='name-image'>HandBook</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-handbook'></div>
                                    <div className='name-image'>HandBook</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-handbook'></div>
                                    <div className='name-image'>HandBook</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-handbook'></div>
                                    <div className='name-image'>HandBook</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
