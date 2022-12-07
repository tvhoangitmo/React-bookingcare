import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomeHeader';
import { getAllHandBook } from '../../../services/userService';
import './AllHandBook.scss'
import './Path.scss'
class AllHandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrHandBook: []
        }
    }
    async componentDidMount() {
        let res = await getAllHandBook()
        if (res && res.data) {
            this.setState({
                arrHandBook: res.data
            })
        }
    }

    handleViewHandBook = (handbook) => {
        if (this.props.history) {
            this.props.history.push(`/handbook/${handbook.id}`)
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
        let { arrHandBook } = this.state
        return (
            <>
                <Helmet>
                    <title>Handbook</title>
                </Helmet>
                <HomeHeader
                    inHomePage={false}
                />
                <div className='path'>
                    <i className="fas fa-home" onClick={() => this.goToPage('/home')}></i>
                    <span> / </span>
                    <span onClick={() => this.goToPage('/all-handbook')} ><FormattedMessage id='path.handbook' /></span>
                </div>
                <div className='handbook-title'><FormattedMessage id='homehandbook.handbook' /></div>
                {arrHandBook && arrHandBook.length > 0 &&
                    arrHandBook.map((item, index) => {
                        return (
                            <div className='allhandbook-container' key={index} onClick={() => this.handleViewHandBook(item)}>
                                <div className='allhandbook-image'
                                    style={{ backgroundImage: `url(${item.image})` }}
                                >
                                </div>
                                <div className='allhandbook-name'>{item.title}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllHandBook);
