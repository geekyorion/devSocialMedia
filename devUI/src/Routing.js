import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

/**
 * Landing page router is defined in App.js and other routes are here
 * bacause Landing component contains a full size image and can not
 * be placed in container class
 */

const Routing = () => (
    <Switch>
        {/* <Route exact path="/" component={Landing} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        {/* <Route path="/*" component={ErrorPage} /> */}
    </Switch>
);

export default Routing;
