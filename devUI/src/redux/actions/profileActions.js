import axios from 'axios';
import emitToaster from '../../utils/alert';

import { clearErrors, setErrors } from './errorsAction';
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
                type: 'error'
            });
        });
    // catch block - when no profile is there or any error occur
}

// create user's profile
export const createUserProfile = (profileData, history, type = 'created') => dispatch => {
    axios
        .post('api/profile/', profileData)
        .then(_res => {
            emitToaster({
                toastText: `Profile is successfully ${type}`,
                type: 'success'
            });
            history.push('/dashboard');
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
            emitToaster({
                toastText: `Unable to ${type.substr(0, type.length - 1)} profile. Please check for any error.`,
                type: 'error'
            });
        });

}

// add experience
export const addExperience = (expData, history) => dispatch => {
    axios
        .post('api/profile/experience', expData)
        .then(res => {
            history.push('/dashboard');
            emitToaster({
                toastText: 'Experience is added successfully',
                type: 'success',
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
            emitToaster({
                toastText: 'Unable to add experience. Please check for any error',
                type: 'error',
            });
        })
};

// add education
export const addEducation = (eduData, history) => dispatch => {
    axios
        .post('api/profile/education', eduData)
        .then(res => {
            history.push('/dashboard');
            emitToaster({
                toastText: 'Education detail is added successfully',
                type: 'success',
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
            emitToaster({
                toastText: 'Unable to add education. Please check for any error',
                type: 'error',
            });
        })
};

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
