import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './MedicalFacility.scss'
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrClinic: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.data) {
            this.setState({
                arrClinic: res.data
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        // console.log(clinic)
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    handleFindClinic = () => {
        if (this.props.history) {
            this.props.history.push(`/find-clinic`)
        }
    }

    render() {
        let { arrClinic } = this.state
        return (
            <React.Fragment>
                <div className=' section-share section-medical-facility'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id='homefacility.outstanding' /></span>
                            <button className='btn-section'
                                onClick={this.handleFindClinic}
                            >
                                <FormattedMessage id='homefacility.search' />
                            </button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {arrClinic && arrClinic.length > 0 &&
                                    arrClinic.map((item, index) => {
                                        return (
                                            <div className='section-customize section-clinic' key={index}
                                                onClick={() => this.handleViewDetailClinic(item)}
                                            >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
