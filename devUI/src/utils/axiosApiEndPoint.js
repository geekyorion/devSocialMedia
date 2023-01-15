import axios from 'axios';

const axiosAPI = axios.create({
    // baseURL: 'https://dev-social-media-server.herokuapp.com/'
    baseURL: 'https://devsocialmedia.glitch.me'
});

export default axiosAPI;
