import { MESSAGE_SEND, MESSAGE_SENT, MESSAGE_RECEVIED, MESSAGE_CLEAR, MESSAGE_ERROR } from '../Actions/types';

const INITIAL_STATE = {
    messagesReceived: undefined,
    messagesSent: undefined,
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case MESSAGE_SEND:
            return { ...state, errorMessage: '' };
        case MESSAGE_SENT:
                return { ...state, messagesSent: action.payload, errorMessage: '' };
        case MESSAGE_RECEVIED:
            return { ...state, messagesReceived: action.payload, errorMessage: '' };
        case MESSAGE_CLEAR:
            return INITIAL_STATE;
        case MESSAGE_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};
