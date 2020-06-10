import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = formProps => async dispatch => {
    try {
        const response = await axios.post(
            'http://localhost:3090/signup', 
            formProps
        );

        dispatch({ 
            type: AUTH_USER, 
            payload: response.data.token 
        });
        localStorage.setItem('token', response.data.token);
        return response;
    } catch (e) {
        dispatch({ 
            type: AUTH_ERROR, 
            payload: 'Username in use' 
        });
    };
};

export const signin = formProps => async dispatch => {
    try {
        const response = await axios.post(
            'http://localhost:3090/signin', 
            formProps
        );

        dispatch({ 
            type: AUTH_USER, 
            payload: response.data.token 
        });
        localStorage.setItem('token', response.data.token);
        return response;
    } catch (e) {
        dispatch({ 
            type: AUTH_ERROR, 
            payload: 'Invalid login credentials' 
        });
    };
};

export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    };
};
