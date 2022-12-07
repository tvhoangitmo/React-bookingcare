import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import HomeHeader from '../HomeHeader';
import { getAllSpecialty } from '../../../services/userService';
import './FindSpecialty.scss'
import './Path.scss'
class FindSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty()
        if (res && res.data) {
            this.setState({
                arrSpecialty: res.data
            })
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`)
        }
    }

    goToPage = (path) => {
        if (this.props.history) {
            this.props.history.push(path)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { arrSpecialty } = this.state
        return (
            <>
                <Helmet>
                    <title>Specialties</title>
                </Helmet>
                <HomeHeader
                    inHomePage={false}
                />
                <div className='path'>
                    <i className="fas fa-home" onClick={() => this.goToPage('/home')}></i>
                    <span> / </span>
                    <span onClick={() => this.goToPage('/find-specialty')} ><FormattedMessage id='path.specialty' /></span>
                </div>
                {arrSpecialty && arrSpecialty.length > 0 &&
                    arrSpecialty.map((item, index) => {
                        return (
                            <div className='specialty-container' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                <div className='specialty-image'
                                    style={{ backgroundImage: `url(${item.image})` }}
                                >
                                </div>
                                <div className='specialty-name'>{item.name}</div>
                            </div>
                        )
                    })
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(FindSpecialty);
