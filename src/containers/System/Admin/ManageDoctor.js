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

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];
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
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctor !== this.props.listDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.listDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
        //console.log('handleEditorChange', html, text);
    }

    handleSaveContentMarkdown = () => {
        let { hasData } = this.state
        this.props.savedetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    handleChangeSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.MarkDown) {
            let markdown = res.data.MarkDown
            this.setState({
                hasData: true,
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
            })
        } else {
            this.setState({
                hasData: false,
                contentHTML: '',
                contentMarkdown: '',
                description: '',
            })
        }
        console.log('check getdetai doctor manage doctor: ', res)
    };

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {}
                let label = `${item.lastName} ${item.firstName}`
                object.label = label
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    render() {
        // console.log('check all doctor state: ', this.state.listDoctor)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Thêm thông tin bác sĩ
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chon bac si</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelectDoctor}
                            options={this.state.listDoctor}
                        />

                    </div>
                    <div className='content-right'>
                        <label>Thong tin gioi thieu</label>
                        <textarea className='form-control' rows='4' onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className='save-content-doctor'
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    Luu thong tin
                </button>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        listDoctor: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        savedetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
