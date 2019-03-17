import { GET_ERROR } from './types';
import store from '../store';

const getError = (err) => {
    return {
        type: GET_ERROR,
        payload: err
    };
};

export default getError;