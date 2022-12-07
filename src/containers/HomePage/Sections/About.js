import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './MedicalFacility.scss'
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';


class About extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {

        return (
            <React.Fragment>
                <div className='section-share section-about'>
                    <div className='section-about-header'>
                        What is the web development
                    </div>
                    <div className='section-about-content'>
                        <div className='content-left'>
                            <iframe width="90%" height="400px"
                                src="https://www.youtube.com/embed/CsqbPIXX_oY"
                                title="Что такое web-программирование? ДЛЯ НОВИЧКОВ / Про IT / Geekbrains"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className='content-right'>
                            <p>The job outlook for Web Developers as very positive because Web Developers are in high demand across a variety of industries, and a worldwide gap in software and web development skills has most observers forecasting high demand well into the future.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
