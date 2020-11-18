import axiosAPI from './axiosApiEndPoint';

const setAuthToken = token => {
    if (token) {
        // apply to every request
        axiosAPI.defaults.headers.common['Authorization'] = token;
    } else {
        // delete auth token
        delete axiosAPI.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;
