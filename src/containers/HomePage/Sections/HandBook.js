import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { getAllHandBook } from '../../../services/userService';
import { withRouter } from 'react-router';
import HomeHeader from '../HomeHeader';


class HandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrHandBook: []
        }
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    async componentDidMount() {
        let res = await getAllHandBook()
        if (res && res.data) {
            this.setState({
                arrHandBook: res.data
            })
        }
    }

    handleViewHandBook = (item) => {
        if (this.props.history) {
            this.props.history.push(`/handbook/${item.id}`)
        }
    }

    showAllHandBook = () => {
        if (this.props.history) {
            this.props.history.push(`/all-handbook`)
        }
    }

    render() {
        let { arrHandBook } = this.state
        return (
            <React.Fragment>
                <div className='section-share handbook'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id='homehandbook.handbook' /></span>
                            <button className='btn-section' onClick={() => this.showAllHandBook()}><FormattedMessage id='homehandbook.all-handbook' /></button>
                        </div>
                        <div className='section-handbook'>
                            <Slider {...this.props.settings}>
                                {arrHandBook && arrHandBook.length > 0 &&
                                    arrHandBook.map((item, index) => {
                                        return (
                                            <div className='section-customize'
                                                key={index}
                                                onClick={() => this.handleViewHandBook(item)}
                                            >
                                                <div className='bg-image'
                                                    style={{ backgroundImage: `url(${item.image})` }}
                                                >
                                                </div>
                                                <div className='name-image'>{item.title}</div>
                                            </div>
                                        )
                                    })}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
