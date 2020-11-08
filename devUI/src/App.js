import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

import store from './redux/store';
import Routing from './Routing';

import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './redux/actions/authActions';
import { clearProfile } from './redux/actions/profileActions';
import initInterceptor from './utils/addInterceptor';

// add an interceptor to check for Unauthorized request - user will be logged out
initInterceptor();

// check for authToken (jwt token)
if (localStorage.authToken) {
    // set authToken in headers
    setAuthToken(localStorage.authToken);
    // decode the authToken
    const decodedToken = jwt_decode(localStorage.authToken);
    // save current user info to redux store
    store.dispatch(setCurrentUser(decodedToken));

    // check for expired token
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
        // logout the user
        store.dispatch(logoutUser());
        // clear current profile
        store.dispatch(clearProfile());
        // redirect to login
        window.location.href = '/login';
    }
}

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className="wrapper">
                    <Navbar />
                    <div className="App">
                        <Routing />
                    </div>
                    <Footer />
                    <ToastContainer />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
