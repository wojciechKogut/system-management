import axios from "axios";
import isEmpty from "../../validation/isEmpty";

const setAuthToken = (token) => {
    if (isEmpty(token)) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;