import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class Comment extends Component {
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
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = `https://connect.facebook.net/en_US/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    render() {
        return (
            <>
                <div className="fb-comments"
                    data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
                    data-width="100%"
                    data-numposts="5"
                    order_by="reverse_time"
                >
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

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
