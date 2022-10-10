import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { LANGUAGES } from '../../../utils';
import localization from 'moment/locale/vi'
//import localization from 'moment/local/ru'
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }


    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        //let language = this.props.language

        return (
            <div className='extra-infor-container'>
                <div className='title'>
                    ĐỊA CHỈ KHÁM
                </div>
                <div className=''>
                    Bệnh viện Đa khoa An Việt
                </div>
                <div>
                    Số 1E Trường Chinh - Thanh Xuân - Hà Nội
                </div>
                <div>
                    <div>
                        <div>
                            Khám & Nội soi Tai Mũi họng
                            Đã bao gồm nội soi Tai Mũi họng
                        </div>
                        <div>
                            400.000đ
                        </div>
                    </div>
                    <div>
                        Bệnh viện có thanh toán bằng hình thức tiền mặt và quẹt thẻ
                    </div>
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
