import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import HomeHeader from '../HomeHeader';
import { getAllDoctor } from '../../../services/userService';
import './FindDoctor.scss'
import './Path.scss'
class FindDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [],
            searchDoctor: '',
            allDoctor: []
        }
    }
    async componentDidMount() {
        let res = await getAllDoctor()
        if (res && res.data) {
            this.setState({
                allDoctor: res.data,
                arrDoctor: res.data
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        // console.log('view detail doctor: ', specialty)
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    goToPage = (path) => {
        if (this.props.history) {
            this.props.history.push(path)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.arrDoctor !== prevState.arrDoctor) {
            this.setState({
                arrDoctor: this.state.arrDoctor
            })
        }
    }

    handleChangeSearchDoctor = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
        console.log(this.state.searchDoctor)
        let result = []
        let { allDoctor, searchDoctor } = this.state
        if (!searchDoctor) {
            this.setState({
                arrDoctor: allDoctor
            })
        }
        else {
            let resultDoctor = allDoctor.filter(item => {
                if (item.nameVi.toLowerCase().includes(searchDoctor.toLowerCase()) === true ||
                    item.nameEn.toLowerCase().includes(searchDoctor.toLowerCase()) === true ||
                    item.nameRu.toLowerCase().includes(searchDoctor.toLowerCase()) === true) {
                    return item
                }
            }
            )
            if (resultDoctor && resultDoctor.length > 0) {
                resultDoctor.map(item => {
                    result.push(item)
                })
            }
            this.setState({
                arrDoctor: result
            })
        }
        console.log('search ', this.state.searchDoctor, ' result ', this.state.arrDoctor)
    }
    render() {
        let { arrDoctor } = this.state
        let { language } = this.props
        return (
            <>
                <Helmet>
                    <title>Doctors</title>
                </Helmet>
                <HomeHeader
                    inHomePage={false}
                />
                <div className='path'>
                    <i className="fas fa-home" onClick={() => this.goToPage('/home')}></i>
                    <span> / </span>
                    <span onClick={() => this.goToPage('/find-doctor')} ><FormattedMessage id='path.doctor' /></span>
                </div>
                <div className='search-doctor'>
                    <div className='col-12 form-group search'>
                        <input className='form-control input-search' type='search' placeholder='Find doctor'
                            value={this.state.searchDoctor}
                            onChange={(event) => this.handleChangeSearchDoctor(event, 'searchDoctor')}
                        />
                    </div>
                    <div className='result-search'>
                        {arrDoctor && arrDoctor.length > 0 &&
                            arrDoctor.map((item, index) => {
                                let imageBase64 = ''
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                let nameEn = ''
                                if (item.positionData.valueEn === 'None') {
                                    nameEn = `Doctor, ${item.lastName} ${item.firstName}`
                                }
                                else {
                                    nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`
                                }
                                let nameRu = `${item.positionData.valueRu}, ${item.lastName} ${item.firstName}`
                                return (
                                    <div className='doctor-container' key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className='doctor-image'
                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                        >
                                        </div>
                                        <div className='doctor-name'>{language === LANGUAGES.VI ? nameVi : (language === LANGUAGES.EN ? nameEn : nameRu)}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FindDoctor);
