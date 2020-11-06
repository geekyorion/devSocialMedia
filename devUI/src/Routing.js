import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/experience/AddExperience';
import AddEducation from './components/education/AddEducation';
import EditExperience from './components/experience/EditExperience';
import EditEducation from './components/education/EditEducation';
import Profiles from './components/all-profiles/Profiles';

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
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/edit-experience" component={EditExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/edit-education" component={EditEducation} />
        <Route exact path="/profiles" component={Profiles} />
        {/* <Route path="/*" component={ErrorPage} /> */}
    </Switch>
);

export default Routing;
