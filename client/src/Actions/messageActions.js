import axios from 'axios';
import { MESSAGE_SEND, MESSAGE_SENT, MESSAGE_RECEVIED, MESSAGE_CLEAR, MESSAGE_ERROR } from './types';
import { BASE_URL } from '../Constants/baseUrlConstant';

export const writeMessage = messageDetails => async dispatch => {
    try {
        const response = await axios.post(
            `${BASE_URL}/writeMessage`, 
            messageDetails
        );

        dispatch({ 
            type: MESSAGE_SEND, 
            payload: ''
        });
        return response;
    } catch (e) {
        dispatch({ 
            type: MESSAGE_ERROR, 
            payload: 'message was not sent' 
        });
    };
}

export const deleteMessage = (messageId, isDeleterSender) => async dispatch => {
    try {
        const response = await axios.post(
            `${BASE_URL}/deleteMessage`, 
            { messageId, isDeleterSender }
        );

        dispatch({ 
            type: MESSAGE_SEND, 
            payload: ''
        });
        return response;
    } catch (e) {
        dispatch({ 
            type: MESSAGE_ERROR, 
            payload: 'message was not deleted' 
        });
    };
}

export const getAllReceivedMessages = username => async dispatch => {
    try {
        const response = await axios.post(
            `${BASE_URL}/getAllReceivedMessages`, 
            username 
        );
        
        dispatch({ 
            type: MESSAGE_RECEVIED, 
            payload: response.data.messages 
        });
        return response;
    } catch (e) {
        dispatch({ 
            type: MESSAGE_ERROR, 
            payload: 'couldnt get messages' 
        });
    };
}

export const getAllSentMessages = username => async dispatch => {
    try {
        const response = await axios.post(
            `${BASE_URL}/getAllSentMessages`, 
            username 
        );
        
        dispatch({ 
            type: MESSAGE_SENT, 
            payload: response.data.messages 
        });
        return response;
    } catch (e) {
        dispatch({ 
            type: MESSAGE_ERROR, 
            payload: 'couldnt get messages' 
        });
    };
}

export const clearMessages = () => {
    return {
        type: MESSAGE_CLEAR,
        payload: undefined
    };
};
