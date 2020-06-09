import axios from 'axios';

export const signup = formProps => {
    const response = await axios.post(
        'http://localhost:3090/signup', 
        formProps
    );
}