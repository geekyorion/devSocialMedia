import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import processingReducer from './processingReducer';
import postReducer from './postReducer';
import deleteReducer from './deleteReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
    processing: processingReducer,
    post: postReducer,
    delete: deleteReducer
});
