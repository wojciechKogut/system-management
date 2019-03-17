import { GET_ERROR } from '../action/types';

const initialState = {};

function errReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ERROR:
            return action.payload;
        default: return state;
    }
}

export default errReducer;