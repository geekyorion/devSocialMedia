import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';

import store from './redux/store';
import Routing from './Routing';

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
