import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';
import { PORT } from '../Constants/portConstant';

const HOST = process.env.HOST;

export const signup = formProps => async dispatch => {
    try {
        const response = await axios.post(
            `http://${HOST}:${PORT}/signup`, 
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
            `http://${HOST}:${PORT}/signin`, 
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
