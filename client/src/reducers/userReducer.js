import { USER_DATA, USER_ERROR, USER_CLEAR } from '../Actions/types';

const INITIAL_STATE = {
    user: {},
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case USER_DATA:
            return { ...state, user: action.payload };
        case USER_ERROR:
            return { ...state, errorMessage: action.payload };
        case USER_CLEAR:
            return INITIAL_STATE;
        default:
            return state;
    }
};
