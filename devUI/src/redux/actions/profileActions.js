import axios from 'axios';
import emitToaster from '../../utils/alert';

import { clearErrors, setErrors } from './errorsAction';
import { CLEAR_PROFILE, GET_ALL_PROFILES, GET_PROFILE, PROFILE_LOADING } from './types';
import { logoutUser } from './authActions';

// get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile/')
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
        .post('/api/profile/', profileData)
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
        .post('/api/profile/experience', expData)
        .then(res => {
            history.push('/dashboard');
            emitToaster({
                toastText: 'Experience detail is added successfully',
                type: 'success',
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
            emitToaster({
                toastText: 'Unable to add experience detail. Please check for any error',
                type: 'error',
            });
        })
};

// update an experience
export const updateExperience = (expData, history) => dispatch => {
    axios
        .put(`/api/profile/experience/${expData.id}`, expData)
        .then(res => {
            history.push('/dashboard');
            emitToaster({
                toastText: 'Experience detail is updated successfully',
                type: 'success',
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
            emitToaster({
                toastText: 'Unable to update experience detail. Please check for any error',
                type: 'error',
            });
        })
};

// delete user experience
export const deleteUserExperience = (id) => dispatch => {
    axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
            emitToaster({
                toastText: 'Experience detail is deleted successfully',
                type: 'success'
            });
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
            emitToaster({
                toastText: 'Unable to delete the experience detail',
                type: 'error'
            });
        });
};

// add education
export const addEducation = (eduData, history) => dispatch => {
    axios
        .post('/api/profile/education', eduData)
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
                toastText: 'Unable to add education detail. Please check for any error',
                type: 'error',
            });
        })
};

// update an education
export const updateEducation = (eduData, history) => dispatch => {
    axios
        .put(`/api/profile/education/${eduData.id}`, eduData)
        .then(res => {
            history.push('/dashboard');
            emitToaster({
                toastText: 'Education detail is updated successfully',
                type: 'success',
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
            emitToaster({
                toastText: 'Unable to update education detail. Please check for any error',
                type: 'error',
            });
        })
};

// delete user education
export const deleteUserEducation = (id) => dispatch => {
    axios
        .delete(`/api/profile/education/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
            emitToaster({
                toastText: 'Education detail is deleted successfully',
                type: 'success'
            });
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
            emitToaster({
                toastText: 'Unable to delete the education detail',
                type: 'error'
            });
        });
};

// delete user profile
export const deleteUserProfile = () => dispatch => {
    axios
        .delete('/api/profile')
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

// get all users profile
export const getAllProfiles = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/profile/all')
        .then(res => {
            dispatch({
                type: GET_ALL_PROFILES,
                payload: res.data || []
            });
        })
        .catch(_err => {
            dispatch({
                type: GET_ALL_PROFILES,
                payload: [],
            });
            emitToaster({
                toastText: 'Unable to get all the profiles',
                type: 'error'
            });
        })
}

// get user profile by handle
export const getProfileByHandle = (handle) => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/profile/handle/${handle}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data || {}
            });
        })
        .catch(_err => {
            dispatch({
                type: GET_PROFILE,
                payload: [],
            });
            emitToaster({
                toastText: 'Unable to get profile',
                type: 'error'
            });
        });
}

export const refreshGravatar = () => dispatch => {
    axios
        .get('/api/user/gravatar')
        .then(res => {
            dispatch(getCurrentProfile());
            emitToaster({
                toastText: res.data.gravatar,
                type: 'success'
            });
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
            emitToaster({
                toastText: err.response.data.gravatar || 'Unable to refresh gravatar',
                type: 'error'
            });
        });
}

// set loading as true
export const setProfileLoading = () => ({
    type: PROFILE_LOADING
});

// clear profile
export const clearProfile = () => ({
    type: CLEAR_PROFILE
});
