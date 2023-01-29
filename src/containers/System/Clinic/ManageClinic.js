import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
import './ManageClinic.scss'
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionMarkdown: '',
            descriptionHTML: ''
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html
        })
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            // console.log(objUrl)
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSaveSpecialty = async () => {
        let res = await createNewClinic({
            name: this.state.name,
            address: this.state.address,
            imageBase64: this.state.imageBase64,
            descriptionMarkdown: this.state.descriptionMarkdown,
            descriptionHTML: this.state.descriptionHTML
        })
        if (res && res.errCode === 0) {
            toast.success('Create a new clinic successful')
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionMarkdown: '',
                descriptionHTML: ''
            })
        } else {
            toast.error('Create failed')
        }
        console.log('check infor specialty', this.state)
    }

    render() {
        return (
            <div className='manage-clinic-container'>
                <div className='ms-title'>Управление клиники</div>
                <div className='add-new-clinic row'>
                    <div className='col-6 form-group'>
                        <label>Назвоние</label>
                        <input
                            className='form-control'
                            type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Фото</label>
                        <input
                            className='form-control-file'
                            type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Адрес</label>
                        <input
                            className='form-control'
                            type='text'
                            value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '300px', margin: '10px 0' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-clinic'
                            onClick={() => this.handleSaveSpecialty()}
                        >
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
