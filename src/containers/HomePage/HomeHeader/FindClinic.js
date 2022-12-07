import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import HomeHeader from '../HomeHeader';
import { getAllClinic } from '../../../services/userService';
import './FindClinic.scss'
import './Path.scss'
class FindClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrClinic: [],
            searchClinic: '',
            allClinic: []
        }
    }
    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.data) {
            this.setState({
                allClinic: res.data,
                arrClinic: res.data
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        // console.log('view detail Clinic: ', specialty)
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    goToPage = (path) => {
        if (this.props.history) {
            this.props.history.push(path)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.arrClinic !== prevState.arrClinic) {
            this.setState({
                arrClinic: this.state.arrClinic
            })
        }
    }

    handleChangeSearchClinic = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
        let result = []
        let { allClinic, searchClinic } = this.state
        if (!searchClinic) {
            this.setState({
                arrClinic: allClinic
            })
        }
        else {
            let resultClinic = allClinic.filter(item =>
                item.name.toLowerCase().includes(searchClinic.toLowerCase()) === true
            )
            if (resultClinic && resultClinic.length > 0) {
                resultClinic.map(item => {
                    result.push(item)
                })
            }
            this.setState({
                arrClinic: result
            })
        }
    }
    render() {
        let { arrClinic } = this.state
        return (
            <>
                <Helmet>
                    <title>Clinics</title>
                </Helmet>
                <HomeHeader
                    inHomePage={false}
                />
                <div className='path'>
                    <i className="fas fa-home" onClick={() => this.goToPage('/home')}></i>
                    <span> / </span>
                    <span onClick={() => this.goToPage('/find-clinic')} ><FormattedMessage id='path.clinic' /></span>
                </div>
                <div className='search-clinic'>
                    <div className='col-12 form-group search'>
                        <input className='form-control input-search' type='search' placeholder='Find Clinic'
                            value={this.state.searchClinic}
                            onChange={(event) => this.handleChangeSearchClinic(event, 'searchClinic')}
                        />
                    </div>
                    <div className='result-search'>
                        {arrClinic && arrClinic.length > 0 &&
                            arrClinic.map((item, index) => {
                                return (
                                    <div className='clinic-container' key={index} onClick={() => this.handleViewDetailClinic(item)}>
                                        <div className='clinic-image'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        >
                                        </div>
                                        <div className='clinic-name'>{item.name}</div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FindClinic);
