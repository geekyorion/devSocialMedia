import axios from 'axios';
import { logoutUser } from '../redux/actions/authActions';
import { setProcessing } from '../redux/actions/utilActions';
import store from '../redux/store';
import emitToaster from './alert';

const initInterceptor = () => {
    axios.interceptors.request.use(req => {
        store.dispatch(setProcessing(true));
        return req;
    }, err => {
        store.dispatch(setProcessing(false));
        return Promise.reject(err);
    });

    axios.interceptors.response.use(response => {
        store.dispatch(setProcessing(false));
        return response;
    }, err => {
        if (err.response.data.toString().toLowerCase() === 'unauthorized') {
            store.dispatch(logoutUser());
            emitToaster({
                toastText: "Unauthorized Access is not permitted",
                type: 'error',
            });
        }
        store.dispatch(setProcessing(false));
        return Promise.reject(err);
    });
}

export default initInterceptor;
