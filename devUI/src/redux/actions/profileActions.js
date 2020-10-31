import axios from 'axios';
import emitToaster from '../../utils/alert';

import { setErrors } from './errorsAction';
import { CLEAR_PROFILE, GET_PROFILE, PROFILE_LOADING } from './types';
import { logoutUser } from './authActions';

// get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('api/profile/')
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
            });
            dispatch(setErrors(err.response.data));
            emitToaster({
                toastText: err.response.data.noprofile || 'Unable to fetch profile',
                type: 'info'
            });
        });
    // catch block - when no profile is there or any error occur
}

// create user's profile
export const createUserProfile = (profileData, history) => dispatch => {
    axios
        .post('api/profile/', profileData)
        .then(res => {
            history.push('/dashboard');
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
        });

}

// delete user profile
export const deleteUserProfile = () => dispatch => {
    axios
        .delete('api/profile')
        .then(_res => {
            dispatch(logoutUser());
            emitToaster({
                toastText: 'Your account is successfully deleted.',
                type: 'success'
            });
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
            emitToaster({
                toastText: 'Unable to delete the account',
                type: 'warning'
            });
        });
};

// set loading as true
export const setProfileLoading = () => ({
    type: PROFILE_LOADING
});

// clear profile
export const clearProfile = () => ({
    type: CLEAR_PROFILE
});
