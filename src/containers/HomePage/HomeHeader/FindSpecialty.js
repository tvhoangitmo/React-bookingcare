import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomeHeader';
import { getAllSpecialty } from '../../../services/userService';
import './FindSpecialty.scss'
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
        // console.log('view detail doctor: ', specialty)
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { arrSpecialty } = this.state
        console.log(arrSpecialty)
        return (
            <>
                <HomeHeader
                    inHomePage={false}
                />
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
