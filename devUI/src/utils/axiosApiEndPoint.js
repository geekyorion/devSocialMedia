import axios from 'axios';

const axiosAPI = axios.create({
    baseURL: 'https://dev-social-media-server.herokuapp.com/'
});

export default axiosAPI;
