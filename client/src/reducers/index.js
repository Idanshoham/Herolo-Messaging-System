import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './authReducer';
import user from './userReducer';
import messages from './messagesReducer';

export default combineReducers({
    auth,
    user,
    messages,
    form: formReducer
});