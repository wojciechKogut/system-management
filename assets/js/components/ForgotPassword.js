import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextFieldGroup} from "./common/TextFieldGroup";
import { connect } from 'react-redux';

import sendEmail from './common/sendEmail';
import isEmpty from '../validation/isEmpty';
import logo from "../../../public/images/loader.gif";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state ={
            email: '',
            emailErr: ''
        };

        this.err = '';
    }
    onSubmit(e) {
        e.preventDefault();

        if (this.state.email == '') {
            this.setState({emailErr: 'This field is require'});
        } else {
            this.setState({emailErr: ''});
            this.props.sendEmail({email: this.state.email});
        }

    }

    onChange(e) {
        if(e.target.value.length == 0) this.err = 'This field is require';
        else this.err = '';
        this.setState({email: e.target.value});
    }

    render() {
        const { auth } = this.props;
        let info;
        let styles;
        let loader;
        let content;

        if (!isEmpty(auth.info.resetNotFound)) {
            info = (
                <div style={{backgroundColor: '#ffffcc', borderLeft: '6px solid #ffeb3b'}}
                     className="text-center mt-3 ml-3 mr-4 alert-warning"
                >
                    {auth.info.resetNotFound}<a href="/register">register</a>
                </div>
            );
        }

        if (!isEmpty(auth.info.resetSuccess)) {
            styles = {display: 'none'};
            info = (
                <div
                    style={{backgroundColor: '#ffffcc', borderLeft: '6px solid #ffeb3b', fontSize: '22px'}}
                    className="text-center p-3 mt-3 ml-3 mr-4 alert-info"
                >
                    {auth.info.resetSuccess}
                </div>
            );
        }

        if (auth.loading) {
            content = (
                <div>
                    <img
                        style={{with: '50px', height: '50px',position: 'absolute', top:'50%', left: '50%', transform: 'translate(-50%, -50%)'}}
                        className="text-center" src={logo} alt=""
                    />
                </div>
            );
        } else {
            content = (
                <div>
                    <h1 className="text-center text-muted">Reset Password</h1>
                    <div style={styles}>
                        <p style={{borderLeft: '6px solid #2196F3',backgroundColor: '#e7f3fe'}} className="alert-info p-1 ml-3 mr-3 mt-4 mb-4 ">Type your email and you will recive email with ability to change your password</p>
                    </div>
                    <form onSubmit={this.onSubmit.bind(this)} className="mx-auto w-75 my-2">
                        <label style={styles}  htmlFor="email"><span style={styles} className="fa fa-envelope-open"></span>Email:</label>
                        <div style={styles}>
                            <TextFieldGroup
                                className="form-control"
                                type="email"
                                id="email"
                                value={this.state.email}
                                onChange={this.onChange.bind(this)}
                            />
                            <div className="text-danger">{this.state.emailErr}</div>

                            <input className="btn btn-outline-primary mt-2 w-100" type="submit" value="Submit"/>
                        </div>
                    </form>

                    {info}
                </div>
            );
        }

        return (
            <div className="card w-60 mx-auto" style={{height: '30rem', width: '30rem'}}>
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps, { sendEmail })(ForgotPassword);