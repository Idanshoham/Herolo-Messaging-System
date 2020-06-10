import { combineReducers } from 'redux';
import auth from './authReducer';
import user from './userReducer';
import messages from './messagesReducer';

export default combineReducers({
    auth,
    user,
    messages,
});