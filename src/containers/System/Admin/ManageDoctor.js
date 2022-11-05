import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions"
import './ManageDoctor.scss'
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService';
import { getAllRequiredData } from '../../../store/actions';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    // state = {
    // }

    // componentDidMount() {

    // }
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctor: [],
            hasData: false,

            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            listClinic: [],
            listSpecialty: [],
            nameClinic: '',
            addressClinic: '',
            note: '',
            specialtyId: '',
            clinicId: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getAllRequiredData()
        console.log(this.props.requiredData.resClinic)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctor !== this.props.listDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.listDoctor, "NAME")
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.requiredData !== this.props.requiredData) {
            let listPrice = this.buildDataInputSelect(this.props.requiredData.resPrice, 'PRICE')
            let listPayment = this.buildDataInputSelect(this.props.requiredData.resPayment, 'PAYMENT')
            let listProvince = this.buildDataInputSelect(this.props.requiredData.resProvince, 'PROVINCE')
            let listSpecialty = this.buildDataInputSelect(this.props.requiredData.resSpecialty, 'SPECIALTY')
            let listClinic = this.buildDataInputSelect(this.props.requiredData.resClinic, 'CLINIC')
            this.setState({
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince,
                listSpecialty: listSpecialty,
                listClinic: listClinic
            })
        }
        if (prevProps.language !== this.props.language) {
            let listPrice = this.buildDataInputSelect(this.props.requiredData.resPrice, 'PRICE')
            let listPayment = this.buildDataInputSelect(this.props.requiredData.resPayment, 'PAYMENT')
            let listProvince = this.buildDataInputSelect(this.props.requiredData.resProvince, 'PROVINCE')
            this.setState({
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince,

            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasData } = this.state
        console.log('check state after click save ', this.state)

        this.props.savedetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic.value,
            specialtyId: this.state.selectedSpecialty.value
        })
    }

    handleChangeSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPrice, listPayment, listProvince, listSpecialty, listClinic } = this.state
        let res = await getDetailInforDoctor(selectedDoctor.value)
        //console.log('check get detail infor doctor : ', res)
        if (res && res.errCode === 0 && res.data && res.data.MarkDown) {
            let markdown = res.data.MarkDown
            let doctorinfor = '', price = '', payment = '', province = '', specialty = '', clinic = ''
            let nameClinic = '', addressClinic = '', note = ''
            let selectedPrice = ''
            let selectedPayment = ''
            let selectedProvince = ''
            let selectedSpecialty = '', selectedClinic = ''
            if (res.data.Doctor_Infor) {
                doctorinfor = res.data.Doctor_Infor
                price = doctorinfor.priceId
                payment = doctorinfor.paymentId
                province = doctorinfor.provinceId
                specialty = doctorinfor.specialtyId
                clinic = doctorinfor.clinicId
                nameClinic = doctorinfor.nameClinic
                addressClinic = doctorinfor.addressClinic
                note = doctorinfor.note

                selectedPrice = listPrice.find(element => element.value === price)
                selectedPayment = listPayment.find(element => element.value === payment)
                selectedProvince = listProvince.find(element => element.value === province)
                selectedSpecialty = listSpecialty.find(element => element.value === specialty)
                selectedClinic = listClinic.find(element => element.value === clinic)
            }
            this.setState({
                hasData: true,
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })

        } else {
            this.setState({
                hasData: false,
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedPrice: '',
                nameClinic: '',
                addressClinic: '',
                note: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }
        //console.log('check getdetai doctor manage doctor: ', res)
    };

    handleChangeSelectInfor = async (selectedOption, name) => {
        let stateName = name.name
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
        //console.log('check selected infor :', selectedOption, stateName)
    }
    handleOnChangeDescription = (event, name) => {
        let stateCopy = { ...this.state }
        stateCopy[name] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    buildDataInputSelect = (inputData, type) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            if (type === 'NAME') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.lastName} ${item.firstName}`
                    let labelRu = `${item.lastName} ${item.firstName}`
                    object.label = language === LANGUAGES.VI ? labelVi : (language === LANGUAGES.EN ? labelEn : labelRu)
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi} VNĐ`
                    let labelEn = `${item.valueEn} USD`
                    let labelRu = `${item.valueRu} РУБ`
                    object.label = language === LANGUAGES.VI ? labelVi : (language === LANGUAGES.EN ? labelEn : labelRu)
                    object.value = item.keyMap
                    result.push(object)
                })
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = item.valueVi
                    let labelEn = item.valueEn
                    let labelRu = item.valueRu
                    object.label = language === LANGUAGES.VI ? labelVi : (language === LANGUAGES.EN ? labelEn : labelRu)
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }

        }
        return result
    }

    render() {
        console.log('check list clinic: ', this.state.listClinic)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id='admin.manage-doctor.title' />
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.choose-doctor' /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelectDoctor}
                            options={this.state.listDoctor}
                            placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                        />

                    </div>
                    <div className='content-right'>
                        <label><FormattedMessage id='admin.manage-doctor.intro-doctor' /></label>
                        <textarea className='form-control' rows='4' onChange={(event) => this.handleOnChangeDescription(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.price' /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id='admin.manage-doctor.price' />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.payment-method' /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id='admin.manage-doctor.payment-method' />}
                            name='selectedPayment'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.province' /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id='admin.manage-doctor.province' />}
                            name='selectedProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.name-clinic' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeDescription(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.address-clinic' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeDescription(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeDescription(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.specialty' /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectInfor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id='admin.manage-doctor.specialty' />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='admin.manage-doctor.clinic' /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectInfor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id='admin.manage-doctor.clinic' />}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className='save-content-doctor'
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    <FormattedMessage id='admin.manage-doctor.save' />
                </button>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        listDoctor: state.admin.allDoctors,
        requiredData: state.admin.requiredData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequiredData: () => dispatch(actions.getAllRequiredData()),
        savedetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
