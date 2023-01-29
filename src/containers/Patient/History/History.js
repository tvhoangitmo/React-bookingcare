import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './History.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/Sections/HomeFooter';
import { getHistory } from '../../../services/userService';
import _ from 'lodash'
import moment from 'moment';
import { Helmet } from 'react-helmet';

class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            histories: {},
            errCode: -1
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.histories !== this.state.histories) {
            this.setState({
                histories: this.state.histories
            })
        }
    }

    handleOnChangeEmail = (event) => {
        let stateCopy = { ...this.state }
        stateCopy['email'] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleGetHistory = async () => {
        let { email } = this.state
        let res = await getHistory(email)
        let arrHistory = []
        if (res && res.user && res.user.Histories) {
            this.setState({
                histories: res.user.Histories,
                errCode: 1
            }, () => {
                console.log(res.user.Histories)
            })
        } else {
            this.setState({
                errCode: 0
            })
        }
    }

    buildDate = (dataTime) => {
        let { language } = this.props
        let date = ''
        if (dataTime && !_.isEmpty(dataTime)) {

            if (language === 'vi') {
                date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM')
            }
            if (language === 'en') {
                date = moment.unix(+dataTime.date / 1000).locale('en').format('dd - DD/MM')
            }
            if (language === 'ru') {
                date = moment.unix(+dataTime.date / 1000).locale('ru').format('dd - DD/MM')
            }
        }
        return date
    }
    render() {
        return (
            <>
                <Helmet>
                    <title>History</title>
                </Helmet>
                <HomeHeader
                    inHomePage={false}
                />
                <div className='history-container'>
                    <div className='title'><FormattedMessage id='history.title' /></div>
                    <div className='tutorial'><FormattedMessage id='history.tutorial' /></div>
                    <div className='col-12 form-group'>
                        <label><FormattedMessage id='history.email' /></label>
                        <input className='form-control' type='text'
                            onChange={(event) => this.handleOnChangeEmail(event)}
                        />
                    </div>
                    <button className='btn-history' color='primary' onClick={() => this.handleGetHistory()}><FormattedMessage id='history.confirm' /></button>.
                    <div className='notification'>
                        {this.state.errCode === 0 ?
                            <div><FormattedMessage id='history.failed' /></div>
                            :
                            (this.state.errCode === 1 ?
                                <div><FormattedMessage id='history.true' /></div>
                                :
                                <div></div>)}
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <th><FormattedMessage id='history.stt' /></th>
                                    <th><FormattedMessage id='history.namedoctor' /></th>
                                    <th><FormattedMessage id='history.date' /></th>
                                    <th><FormattedMessage id='history.time' /></th>
                                    <th><FormattedMessage id='history.diagnosis' /></th>
                                </tr>
                                {this.state.errCode === 1 ?
                                    this.state.histories.map((item, index) => {
                                        console.log(item)
                                        let { language } = this.props
                                        let date = '', time = ''
                                        if (language === 'vi') {
                                            date = moment.unix(+item.date / 1000).format('dddd - DD/MM')
                                            time = item.Allcode.valueVi
                                        }
                                        if (language === 'en') {
                                            date = moment.unix(+item.date / 1000).locale('en').format('dd - DD/MM')
                                            time = item.Allcode.valueEn
                                        }
                                        if (language === 'ru') {
                                            date = moment.unix(+item.date / 1000).locale('ru').format('dd - DD/MM')
                                            time = item.Allcode.valueRu
                                        }
                                        return (

                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.Doctor.firstName}</td>
                                                <td>{date}</td>
                                                <td>{time}</td>
                                                <td>{item.diagnosis}</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: 'center' }}>No data</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(History);
