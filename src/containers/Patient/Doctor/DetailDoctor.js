import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import HomeFooter from '../../HomePage/Sections/HomeFooter';

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {}
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailInforDoctor(id)
            console.log('check get detail doctor by api: ', res)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }

            // imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        console.log('check state detail doctor: ', this.state.detailDoctor)
        let { detailDoctor } = this.state
        let { language } = this.props
        console.log('check language: ', language)
        let nameVi = '', nameEn = '', nameRu = ''
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = ''
            if (detailDoctor.positionData.valueEn === 'None') {
                nameEn = `Doctor, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            }
            else {
                nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
            }
            nameRu = `${detailDoctor.positionData.valueRu}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
        }

        return (

            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : (language === LANGUAGES.EN ? nameEn : nameRu)}
                            </div>
                            <div className='down'>
                                {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.description
                                    && <span>
                                        {detailDoctor.MarkDown.description}
                                    </span>}
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.MarkDown && detailDoctor.MarkDown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: detailDoctor.MarkDown.contentHTML }}></div>
                        }
                    </div>
                    <div className='comment-doctor'></div>
                </div >
                <HomeFooter />
            </React.Fragment >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
