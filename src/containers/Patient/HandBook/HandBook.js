import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import { getHandBookById } from '../../../services/userService';
import './HandBook.scss'
import HomeFooter from '../../HomePage/Sections/HomeFooter';
import LikeAndShare from '../SocialPlugin/LikeAndShare';

class HandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            handbook: []
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getHandBookById(id)
            if (res && res.errCode === 0) {
                this.setState({
                    handbook: res.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    goToPage = (path) => {
        if (this.props.history) {
            this.props.history.push(path)
        }
    }
    render() {
        let { handbook } = this.state
        console.log(handbook)
        return (
            <>
                <Helmet>
                    <title>{handbook.title}</title>
                </Helmet>
                <HomeHeader
                    inHomePage={false}
                />
                <div className='pg-container'>
                    <div className='path'>
                        <i className="fas fa-home" onClick={() => this.goToPage('/home')}></i>
                        <span> / </span>
                        <span onClick={() => this.goToPage('/all-handbook')} ><FormattedMessage id='path.handbook' /></span>
                        <span> / </span>
                        <span> {handbook.title}</span>
                    </div>
                    <div className='handbook-container'>
                        <div className='title-handbook'>{handbook.title}</div>
                        <div className='img-handbook' style={{ backgroundImage: `url(${handbook.image})` }}></div>
                        <div className='content-handbook'>
                            {handbook && handbook.descriptionHTML
                                && <div dangerouslySetInnerHTML={{ __html: handbook.descriptionHTML }}></div>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
