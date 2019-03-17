import axios from "axios";

import {SET_CURRENT_USER, GET_ERROR, LOADING} from "./types";
import setAuthToken from "../components/common/setAuthToken";
import getError from '../action/errAction';
import { loader } from './loader';

export const loginUser = (user, history) => dispatch => {
    dispatch(loader(true));
    setTimeout(function() {
        axios
            .post('api/login_check', user)
            .then(res => {
                const { token } = res.data;
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: user,
                    loading: false
                });
                dispatch({
                    type: GET_ERROR,
                    payload: {}
                });

                localStorage.setItem('token', token);
                setAuthToken(token);

                history.push('/');
            })
            .catch(err => {
                dispatch(getError(err.response.data.message));
                dispatch(loader(false));
            });
    }, 500);

};

export const setCurrentUser = (user) => {
  return {
      type: SET_CURRENT_USER,
      payload: user
  }
};

export const registerUser = (user, history) => dispatch => {
    dispatch(loader(true));
    setTimeout(function() {
        axios.post('api/register', user)
            .then(user => {
                history.push('/login');
                dispatch({
                    type: GET_ERROR,
                    payload: {}
                });
                dispatch(loader(false));
            })
            .catch(err => {
                dispatch(getError(err.response.data));
                dispatch(loader(false));
            })
    }, 500);
};

export const logoutUser = () => dispatch => {
    dispatch(setCurrentUser({}));
    // Remove auth header for future requests
    setAuthToken(false);
    localStorage.removeItem('token');
};
