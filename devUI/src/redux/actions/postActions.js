import axios from 'axios';
import emitToaster from '../../utils/alert';
import { clearErrors, setErrors } from './errorsAction';
import { ADD_POST, GET_POSTS, POST_LOADING, RESET_TEXT } from './types';

export const addPost = postData => dispatch => {
    dispatch(startPostLoading());
    axios
        .post('/api/post', postData)
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            });
            emitToaster({
                toastText: 'Your post is added successfully',
                type: 'success'
            });
            dispatch(setResetText(true));
            dispatch(clearErrors());
        })
        .catch(err => {
            emitToaster({
                toastText: (err.response.data && err.response.data.postSave) || 'Unalbe to save post',
                type: 'error'
            });
            dispatch(setErrors(err.response.data));
            dispatch(setResetText(false));
        });
};

export const getAllPosts = () => dispatch => {
    dispatch(startPostLoading());
    axios
        .get('/api/post')
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_POSTS,
                payload: []
            });
            emitToaster({
                toastText: (err.response.data && err.response.data.nopost) || 'Unalbe to get posts',
                type: 'error'
            });
        });
}

export const getUserPosts = () => dispatch => {
    dispatch(startPostLoading());
    axios
        .get('/api/post/user')
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_POSTS,
                payload: []
            });
            emitToaster({
                toastText: (err.response.data && err.response.data.nopost) || 'Unalbe to get posts',
                type: 'error'
            });
        });
}

export const startPostLoading = () => ({
    type: POST_LOADING
});

export const setResetText = (payload) => ({
    type: RESET_TEXT,
    payload
});
