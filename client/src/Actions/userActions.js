import axios from 'axios';
import { USER_DATA, USER_ERROR, USER_CLEAR } from './types';
import { BASE_URL } from '../Constants/baseUrlConstant';

export const getUserDetailsByToken = userToken => async dispatch => {
    try {
        const response = await axios.post(
            `${BASE_URL}/getUserDetailsById`, 
            { userToken }
        );

        dispatch({ 
            type: USER_DATA, 
            payload: response.data.user 
        });
        return response;
    } catch (e) {
        dispatch({ 
            type: USER_ERROR, 
            payload: 'invalid Username' 
        });
    };
}

export const getUserDetails = username => async dispatch => {
    try {
        const response = await axios.post(
            `${BASE_URL}/getUserDetails`, 
            { username }
        );

        dispatch({ 
            type: USER_DATA, 
            payload: response.data.user 
        });
        return response;
    } catch (e) {
        dispatch({ 
            type: USER_ERROR, 
            payload: 'invalid Username' 
        });
    };
}

export const editUserDetails = userDetails => async dispatch => {
    try {
        const response = await axios.post(
            `${BASE_URL}/editUserDetails`, 
            userDetails
        );

        dispatch({ 
            type: USER_DATA, 
            payload: response.data.user 
        });
        return response;
    } catch (e) {
        dispatch({ 
            type: USER_ERROR, 
            payload: 'invalid Username' 
        });
    };
}

export const clearUser = () => {
    return {
        type: USER_CLEAR,
        payload: undefined
    };
};
