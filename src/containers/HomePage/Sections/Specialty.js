import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './Specialty.scss'
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';

class Specialty extends Component {

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

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    handleViewDetailSpecialty = (specialty) => {
        // console.log('view detail doctor: ', specialty)
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`)
        }
    }

    handleSeeMoreSpecialty = () => {
        if (this.props.history) {
            this.props.history.push(`/find-specialty`)
        }
    }

    render() {
        //console.log('check arr specialty : ', this.state.arrSpecialty)
        let { arrSpecialty } = this.state
        return (
            <React.Fragment>
                <div className=' section-share sectionspecialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id='homespecialty.specialtypopular' /></span>
                            <button className='btn-section'
                                onClick={() => this.handleSeeMoreSpecialty()}
                            >
                                <FormattedMessage id='homespecialty.more' />
                            </button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {arrSpecialty && arrSpecialty.length > 0 &&
                                    arrSpecialty.map((item, index) => {
                                        return (
                                            <div className='section-customize section-specialty' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                                <div className='bg-image'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                >
                                                </div>
                                                <span className='name-image'>{item.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>

            </React.Fragment >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
