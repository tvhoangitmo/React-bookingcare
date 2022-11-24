import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './MedicalFacility.scss'
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';


class HomeFooter extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    goToPage = (path) => {
        if (this.props.history) {
            this.props.history.push(path)
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='footer-container'>
                    <div className='up'>
                        <span>Medbooking</span>
                    </div>
                    <div className='center'>
                        <div className='content-left'>
                            <div className='address'>
                                <i className="fas fa-map-marker-alt"><FormattedMessage id='footer.address' /> Дом 5/7, Вяземский переулок, Санкт-Петербург</i>
                            </div>
                            <div className='phone'>
                                <i className="fas fa-phone"><FormattedMessage id='footer.phone' /> +79219128766</i>
                            </div>
                            <div className='email'>
                                <i className="fas fa-envelope-open"><FormattedMessage id='footer.email' />hoangk24aas2gmail.com</i>
                            </div>
                        </div>
                        <div className='content-center'>
                            <div className='home-page'
                                onClick={() => this.goToPage('/home')}
                            >
                                <FormattedMessage id='footer.home-page' />
                            </div>
                            <div className='introduce'><FormattedMessage id='footer.intro' /></div>
                        </div>
                        <div className='content-right'>
                            <div className='connection'><FormattedMessage id='footer.connection' /></div>
                            <div className='fb-insta-vk'>
                                <a href='https://www.facebook.com/tran.van.hoang.0' target='_blank'><i className="fab fa-facebook-f"></i></a>
                                <a href='https://www.instagram.com/hoang.1303/' target='_blank'><i className="fab fa-instagram"></i></a>
                                <a href='https://vk.com/id566955324' target='_blank'><i className="fab fa-vk"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className='down'>
                        <span>© 2022 Medbooking</span>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFooter));
