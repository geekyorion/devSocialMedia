import axios from 'axios';
import { logoutUser } from '../redux/actions/authActions';
import store from '../redux/store';
import emitToaster from './alert';

axios.interceptors.response.use(response => response, err => {
    if (err.response.data.toString().toLowerCase() === 'unauthorized') {
        store.dispatch(logoutUser());
        emitToaster({
            toastText: "Unauthorized Access is not permitted",
            type: 'error',
        });
    }
    return Promise.reject(err);
});
