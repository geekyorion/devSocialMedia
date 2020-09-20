import React from 'react';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';

function App() {
    return (
        <div className="wrapper">
            <Navbar />
            <div className="App">
                <Landing />
            </div>
            <Footer />
        </div>
    );
}

export default App;
