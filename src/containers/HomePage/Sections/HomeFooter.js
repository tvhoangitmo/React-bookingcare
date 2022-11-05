import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './MedicalFacility.scss'
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        return (
            <React.Fragment>
                <div className='home-footer'>
                    <p>&copy; 2022 Hoang. <a target='_blank' href='https://www.facebook.com/tran.van.hoang.0'>Contact information </a> </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
