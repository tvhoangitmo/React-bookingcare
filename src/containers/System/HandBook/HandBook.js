import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from 'react-toastify';
import './HandBook.scss'
import { createNewHandBook } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class HandBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
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
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html
        })
    }

    handleSavehandbook = async () => {
        let res = await createNewHandBook({
            title: this.state.title,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown
        })
        if (res && res.errCode === 0) {
            toast.success("Create new handbook successfully")
            this.setState({
                title: '',
                imageBase64: '',
                descriptionMarkdown: '',
                descriptionHTML: ''
            })
        } else {
            toast.error("Create new handbook failed")
        }
    }

    render() {
        return (
            <div className='manage-handbook-container'>
                <div className='ms-title'><FormattedMessage id='menu.admin.manage-handbook' /></div>
                <div className='add-new-handbook row'>
                    <div className='col-6 form-group'>
                        <label>Название</label>
                        <input
                            className='form-control'
                            type='text'
                            value={this.state.title}
                            onChange={(event) => this.handleOnChangeInput(event, 'title')}
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
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '300px', margin: '10px 0' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-handbook'
                            onClick={() => this.handleSavehandbook()}
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
