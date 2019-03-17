import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import {TextFieldGroup} from './common/TextFieldGroup';
import { loginUser } from "../action/authActions";
import isEmpty from '../validation/isEmpty';
import LoginValidator from '../validation/LoginValidator';
import LoginStyles from '../../css/login.css';
import logo from '../../../public/images/loader.gif';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            usernameErr: '',
            passwordErr: ''
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        const loginForm = LoginValidator(user);

        if (!loginForm.isValid) {
            let errors = loginForm.errors;
            this.setState({
                usernameErr: errors.username,
                passwordErr: errors.password
            });
        } else {
            this.setState({
                usernameErr: '',
                passwordErr: ''
            });

            this.props.loginUser(user, this.props.history);
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const { error, auth } = this.props;
        let errDiv;
        if (!isEmpty(error) && error !== '') {
            errDiv = (
                <div className="ml-3 mr-3 mt-2 alert alert-danger text-center">{`${error}, try again `}</div>
            );
        }

        let loginForm;
        if (auth.loading) {
            loginForm = (
                <img style={{with: '50px', height: '50px',position: 'absolute', top:'50%', left: '50%', transform: 'translate(-50%, -50%)'}} className="text-center" src={logo} alt=""/>
            );
        } else {
            loginForm = (
                <div className="card w-60 mx-auto" style={{height: '35rem', width: '30rem'}}>
                    <h1 className="text-center mt-4">Login</h1>
                    <div className="text-center"><span className="fa fa-user-circle display-4 text-center"></span></div>
                    <form onSubmit={this.onSubmit.bind(this)} className="mx-auto w-75 my-2">
                        <label htmlFor="username"><span className="fa fa-user mr-1"></span>Username:</label>
                        <TextFieldGroup
                            class="form-control"
                            type="text"
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChange.bind(this)}
                        />
                        <div><span className="text-danger">{this.state.usernameErr}</span></div>

                        <label htmlFor="password"><span className="fa fa-unlock mr-1"></span>Password:</label>
                        <TextFieldGroup
                            class="form-control"
                            type="password"
                            id="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange.bind(this)}
                        />
                        <div className=""><span className="text-danger">{this.state.passwordErr}</span></div>

                        <input className="btn btn-success mt-2 w-100" name="accept" type="submit" />
                    </form>
                    <div className="text-center"><Link to={'/forgot'}>Forgot Password</Link></div>
                    {errDiv}
                </div>
            );
        }

        return (
            <div className="card w-60 mx-auto" style={{height: '35rem', width: '30rem'}}>
                {loginForm}
                </div>
        );
    }
}

TextFieldGroup.prototype = {
    username: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const mapStateToProps = function(state) {
    return {
        auth: state.auth,
        error: state.error
    };
};


export default connect(
    mapStateToProps,
    { loginUser }
)(Login);