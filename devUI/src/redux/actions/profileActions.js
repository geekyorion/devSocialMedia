import axios from 'axios';
import emitToaster from '../../utils/alert';

import { setErrors } from './errorsAction';
import { CLEAR_PROFILE, GET_PROFILE, PROFILE_LOADING } from './types';

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

// set loading as true
export const setProfileLoading = () => ({
    type: PROFILE_LOADING
});

// clear profile
export const clearProfile = () => ({
    type: CLEAR_PROFILE
});
