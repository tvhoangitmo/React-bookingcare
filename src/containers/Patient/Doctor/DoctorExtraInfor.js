import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { LANGUAGES } from '../../../utils';
import localization from 'moment/locale/vi'
//import localization from 'moment/local/ru'
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { getExtraInforDoctor } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: false,
            extraInfor: []
        }
    }

    async componentDidMount() {
        let infor = await getExtraInforDoctor(this.props.doctorId)
        //console.log('check infor ', infor)
        this.setState({
            extraInfor: infor.data ? infor.data : []
        })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {

            let infor = await getExtraInforDoctor(this.props.doctorId)
            //console.log('check infor ', infor)
            this.setState({
                extraInfor: infor.data ? infor.data : []
            })
        }
    }

    isShowMore = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {
        let language = this.props.language
        //console.log(this.state)
        let isShow = this.state.isShow
        let extraInfor = this.state.extraInfor
        //console.log(extraInfor)
        return (
            <div className='extra-infor-container'>
                <div className='title-address'>
                    <FormattedMessage id='patient.detail-doctor.address-clinic' />
                </div>
                <div className='name-clinic'>
                    {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                </div>
                <div className='address-clinic'>
                    {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                </div>
                <div className='price'>
                    <div className='summary-infor-price'>
                        <div>
                            <FormattedMessage id='patient.detail-doctor.price' />
                        </div>
                        <div>
                            {extraInfor && extraInfor.priceData && language === LANGUAGES.VI &&
                                <NumberFormat
                                    value={extraInfor.priceData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' VND'} />
                            }
                            {extraInfor && extraInfor.priceData && language === LANGUAGES.EN &&
                                <NumberFormat
                                    value={extraInfor.priceData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' $'} />
                            }
                            {extraInfor && extraInfor.priceData && language === LANGUAGES.RU &&
                                <NumberFormat
                                    value={extraInfor.priceData.valueRu}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={' РУБ'} />
                            }
                        </div>
                        {isShow === false &&
                            <div className='see-more'>
                                <span onClick={() => this.isShowMore()}> <FormattedMessage id='patient.detail-doctor.show-more' /> </span>
                            </div>
                        }
                    </div>
                    {isShow === true &&
                        <div className='price-more-infor'>
                            <div className='price-infor-show'>
                                <div className='left'>
                                    {extraInfor && extraInfor.note &&
                                        <div>{extraInfor.note}</div>
                                    }
                                    {/* <div>Khám & Nội soi Tai Mũi họng</div>
                                    <div>Đã bao gồm nội soi Tai Mũi họng</div> */}
                                </div>
                                <div className='right'>
                                    {extraInfor && extraInfor.priceData && language === LANGUAGES.VI &&
                                        <NumberFormat
                                            value={extraInfor.priceData.valueVi}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' VND'} />
                                    }
                                    {extraInfor && extraInfor.priceData && language === LANGUAGES.EN &&
                                        <NumberFormat
                                            value={extraInfor.priceData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' $'} />
                                    }
                                    {extraInfor && extraInfor.priceData && language === LANGUAGES.RU &&
                                        <NumberFormat
                                            value={extraInfor.priceData.valueRu}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' РУБ'} />
                                    }
                                </div>
                            </div>
                            <div className='payment'>
                                <span><FormattedMessage id='patient.detail-doctor.payment' /> </span>
                                {extraInfor && extraInfor.paymentData && language === LANGUAGES.VI &&
                                    <span>{extraInfor.paymentData.valueVi}</span>
                                }
                                {extraInfor && extraInfor.paymentData && language === LANGUAGES.EN &&
                                    <span>{extraInfor.paymentData.valueEn}</span>
                                }
                                {extraInfor && extraInfor.paymentData && language === LANGUAGES.RU &&
                                    <span>{extraInfor.paymentData.valueRu}</span>
                                }
                            </div>
                            <div className='hidden-infor'>
                                <span onClick={() => this.isShowMore()}><FormattedMessage id='patient.detail-doctor.hidden-infor' /></span>
                            </div>
                        </div>
                    }


                </div>
                <div className='note'>

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
