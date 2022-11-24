import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
require('dotenv').config()

class LikeAndShare extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        this.initFaceBookSDK()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    initFaceBookSDK() {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                cookie: true,
                xfbml: true,
                version: 'v2.5'
            });
        };
        let src = `https://connect.facebook.net/en_US/sdk.js`;
        console.log(src);
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = src;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    render() {
        return (
            <>
                <div className="fb-like"
                    data-href="https://developers.facebook.com/docs/plugins/"
                    data-width=""
                    data-layout="standard"
                    data-action="like"
                    data-size="small"
                    data-share="true">
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LikeAndShare);
