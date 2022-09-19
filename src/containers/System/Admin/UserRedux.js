import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from "../../../utils"
import * as actions from "../../../store/actions"
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     // console.log('test res.data', res.data)
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let arrGender = this.props.genderRedux
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })
        }
        // console.log("prevProps.listUsers", prevProps.listUsers.length)
        // console.log('this.props.listUsers.length', this.props.listUsers.length)
        if (prevProps.listUsers < this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }

    handleOnChangeImage = (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let objUrl = URL.createObjectURL(file)
            // console.log(objUrl)
            this.setState({
                previewImgURL: objUrl,
                avatar: file
            })
        }

    }
    // openPreviewImage = () => {
    //     this.setState({
    //         isOpen: true
    //     })
    // }

    handleSaveUser = async () => {
        //console.log(this.state)
        let isValid = this.checkValidateInput()
        if (!isValid) return
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            gender: this.state.gender,
            roleId: this.state.role,
            phonenumber: this.state.phoneNumber,
            positionId: this.state.position
        })
        this.props.fetchUserRedux()
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                // alert('Missing ' + arrCheck[i])
                // console.log('Missing ', arrCheck[i])
                break
            }
        }
        return isValid
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    render() {
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        let language = this.props.language
        let isLoadingGender = this.props.isLoadingGender
        let isOpen = this.state.isOpen
        let previewImgURL = this.state.previewImgURL
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state
        // console.log('check gender: ', this.props.genderRedux)
        // console.log('check position: ', this.props.positionRedux)

        return (
            <div className='user-redux-container'>
                <div className='title'>Creat a new user</div>
                <div>{isLoadingGender === true ? 'Loading genders' : ''}</div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id='manage-user.add' /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.email' /></label>
                                <input className='form-control' type='email'
                                    values={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.password' /></label>
                                <input className='form-control' type='password'
                                    values={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.first-name' /></label>
                                <input className='form-control' type='text'
                                    values={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.last-name' /></label>
                                <input className='form-control' type='text'
                                    values={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.phone' /></label>
                                <input className='form-control' type='text'
                                    values={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manage-user.address' /></label>
                                <input className='form-control' type='text'
                                    values={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.gender' /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            //console.log('a ', item)
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : (language === LANGUAGES.EN ? item.valueEn : item.valueRu)}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.position' /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            //console.log('a ', item)
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : (language === LANGUAGES.EN ? item.valueEn : item.valueRu)}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.roleid' /></label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            //console.log('a ', item)
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : (language === LANGUAGES.EN ? item.valueEn : item.valueRu)}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manage-user.image' /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(e) => this.handleOnChangeImage(e)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'><FormattedMessage id='manage-user.upload-image' /><i className="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.setState({ isOpen: true })}>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button type="submit" className="btn btn-primary"
                                    onClick={() => this.handleSaveUser()}
                                >
                                    <FormattedMessage id='manage-user.save' /></button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser />
                            </div>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <Lightbox
                        mainSrc={previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
