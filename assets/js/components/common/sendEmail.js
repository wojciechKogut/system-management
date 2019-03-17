import axios from 'axios';

import { RESET_INFO, LOADING } from "../../action/types";
import { loader} from "../../action/loader";

const sendEmail = (email) => dispatch => {
    dispatch(loader(true));
    axios
        .post('/user/forgot_password', email)
        .then(res => {
            let success = '';
            let notFound = '';

            if (typeof res.data.success != "undefined") {
                success = res.data.success;
            }
            if (typeof res.data.not_found != "undefined") {
                notFound = res.data.not_found;
            }
            dispatch({
                type: RESET_INFO,
                payload: {resetSuccess: success, resetNotFound: notFound}
            });
            dispatch(loader(false));
        })
        .catch(err => {
                console.log(err);
                dispatch(loader(false));
            }
        );

};

export default sendEmail;