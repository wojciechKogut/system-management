import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from 'jwt-decode';

import Login from './Login';
import store from '../store';
import history from '../history';
import Register from "./Register";
import Home from "./Home";
import {logoutUser, setCurrentUser} from "../action/authActions";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

if (localStorage.getItem('token')) {
    // Decode token and get user info
    const decoded = jwt_decode(localStorage.token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    if (decoded.exp < Date.now() / 1000) {
        store.dispatch(logoutUser());
    }
}

class App extends React.Component {
    render() {

        return (
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/forgot" component={ForgotPassword} />
                        <Route exact path="/password_reset" component={ResetPassword} />
                        <PrivateRoute exact path="/" component={Home} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));