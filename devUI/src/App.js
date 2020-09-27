import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import './App.css';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';

import store from './redux/store';
import Routing from './Routing';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './redux/actions/authActions';

// check for authToken (jwt token)
if (localStorage.authToken) {
    // set authToken in headers
    setAuthToken(localStorage.authToken);
    // decode the authToken
    const decodedToken = jwt_decode(localStorage.authToken);
    // save current user info to redux store
    store.dispatch(setCurrentUser(decodedToken));
}

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="wrapper">
                    <Navbar />
                    <div className="App">
                        <Route exact path="/" component={Landing} />
                        <div className="container">
                            <Routing />
                        </div>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
