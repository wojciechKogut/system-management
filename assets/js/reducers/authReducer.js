import {SET_CURRENT_USER, LOADING, RESET_INFO} from "../action/types";
import isEmpty from '../validation/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    info: {}
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: false
            };
        case LOADING:
            return {
                ...state,
              loading: action.payload
            };
        case RESET_INFO:
            return {
                ...state,
                info: action.payload
            };
        default:
            return state;
    }
}


export default authReducer;