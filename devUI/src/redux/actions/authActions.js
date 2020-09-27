import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../../utils/setAuthToken';
import { clearErrors, setErrors } from './errorsAction';
import { SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
    axios
        .post('api/user/register', userData)
        .then(_res => {
            history.push('/login');
            dispatch(clearErrors());
        })
        .catch(err => dispatch(setErrors(err.response.data)));
}

export const loginUser = (userData) => dispatch => {
    axios
        .post('api/user/login', userData)
        .then(res => {
            // extract the token from response
            const { token } = res.data;
            // save it to localStorage
            localStorage.setItem('authToken', token);
            // set it to the Auth Header for protected route
            setAuthToken(token);
            // decode the jwt token
            const decodedToken = jwt_decode(token);
            // save user information from decodedToken
            dispatch(setCurrentUser(decodedToken));
            // clear the errors
            dispatch(clearErrors());
        })
        .catch(err => dispatch(setErrors(err.response.data)));
}

// save current user to redux state
export const setCurrentUser = decodedToken => ({
    type: SET_CURRENT_USER,
    payload: decodedToken,
});

// logout user
export const logoutUser = () => dispatch => {
    // remove authToken from localStorage
    localStorage.removeItem('authToken');
    // delete Authorization from request header
    setAuthToken(false);
    // remove current user
    dispatch(setCurrentUser({}));
};
