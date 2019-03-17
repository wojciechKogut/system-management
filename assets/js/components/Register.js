import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import {TextFieldGroup} from './common/TextFieldGroup';
import { registerUser } from "../action/authActions";
import RegisterValidator from '../validation/RegisterValidator';
import logo from "../../../public/images/loader.gif";
import isEmpty from "../validation/isEmpty";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            repeatPassword: '',
            errUsername: '',
            errPassword: '',
            errRepeat: '',
            errEmail: ''
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
            password: this.state.password,
            repeat: this.state.repeatPassword,
            email: this.state.email
        };

        const { isValid, errors } = RegisterValidator(user);

        if (isValid) {
            this.props.registerUser(user, this.props.history);
            this.setState({errUsername: '', errPassword: '', errRepeat: '', errEmail: ''});
        } else {
            this.setState({errUsername: errors.username, errPassword: errors.password, errRepeat: errors.repeat, errEmail: errors.email});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const { error, auth } = this.props;
        let errDiv;
        let loginForm;

        if (!isEmpty(error) && error !== '') {
            errDiv = (
                <div className="ml-3 mr-3 alert alert-danger text-center">{error}</div>
            );
        }

        if (auth.loading) {
            loginForm = (
                <img style={{with: '50px', height: '50px',position: 'absolute', top:'50%', left: '50%', transform: 'translate(-50%, -50%)'}} className="text-center" src={logo} alt=""/>
            );
        } else {
            loginForm = (
                <div className="card w-60 mx-auto" style={{height: '43rem', width: '30rem'}}>
                <h1 className="text-center mt-4">Register</h1>
                <div className="text-center"><span className="fa fa-user-circle display-4 text-center"></span></div>
                <form onSubmit={this.onSubmit.bind(this)} className="mx-auto w-75 my-5">
                    <label htmlFor="username"><span className="fa fa-user mr-1"></span>Username:</label>
                    <TextFieldGroup
                        class="form-control"
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange.bind(this)}
                    />
                    <div><span className="text-danger">{this.state.errUsername}</span></div>

                    <label htmlFor="email"><span className="fa fa-user mr-1"></span>Email:</label>
                    <TextFieldGroup
                        class="form-control"
                        type="email"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange.bind(this)}
                    />
                    <div><span className="text-danger">{this.state.errEmail}</span></div>

                    <label htmlFor="password"><span className="fa fa-unlock mr-1"></span>Password:</label>
                    <TextFieldGroup
                        class="form-control"
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange.bind(this)}
                    />
                    <div><span className="text-danger">{this.state.errPassword}</span></div>

                    <label htmlFor="repeat"><span className="fa fa-user mr-1"></span>Repeat Password:</label>
                    <TextFieldGroup
                        class="form-control"
                        type="password"
                        id="repeat_password"
                        name="repeatPassword"
                        value={this.state.repeatPassword}
                        onChange={this.onChange.bind(this)}
                    />
                    <div><span className="text-danger">{this.state.errRepeat}</span></div>

                    <input className="btn btn-success mt-2 float-right" name="accept" type="submit" />
                </form>
                 {errDiv}
            </div>
            );
        }

        return (
            <div className="card w-60 mx-auto" style={{height: '43rem', width: '30rem'}}>
               {loginForm}
           </div>
        );
    }
}

TextFieldGroup.prototype = {
    username: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
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
    { registerUser }
)(Register);