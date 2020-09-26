import axios from 'axios';
import { CLEAR_ERRORS, GET_ERRORS } from './types';

export const registerUser = (userData, history) => dispatch => {
    axios
        .post('api/user/register', userData)
        .then(_res => {
            history.push('/login');
            dispatch({
                type: CLEAR_ERRORS
            });
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}
