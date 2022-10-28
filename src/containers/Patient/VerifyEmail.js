import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookingAppoiment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'

class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            errCode: -1
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token')
            let doctorId = urlParams.get('doctorId')
            let res = await postVerifyBookingAppoiment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    status: true,
                    errCode: res.errCode
                })
            }
            else (
                this.setState({
                    status: true,
                    errCode: res.errCode
                })
            )
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    render() {
        let { status, errCode } = this.state
        console.log('check props ', this.props)
        return (
            <>
                <HomeHeader
                    inHomePage={false}
                />
                <div className='verify-content'>
                    {status === false ?
                        <div className='notification'><FormattedMessage id='patient.verify-booking.loading' /></div>
                        :
                        (errCode === 0 ?
                            <div>
                                <div className='notification'><FormattedMessage id='patient.verify-booking.verify-success' /></div>
                                <div className='back-to-homepage'><FormattedMessage id='patient.verify-booking.back' /></div>
                                <div className='back'><i className="fas fa-backward" onClick={() => this.returnToHome()}></i></div>
                            </div>

                            :
                            <div>
                                <div className='notification'><FormattedMessage id='patient.verify-booking.confirmed-or-exist' /></div>
                                <div className='back-to-homepage'><FormattedMessage id='patient.verify-booking.back' /></div>
                                <div className='back'><i className="fas fa-backward" onClick={() => this.returnToHome()}></i></div>
                            </div>

                        )
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
