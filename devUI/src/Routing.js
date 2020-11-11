import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './components/layouts/Landing';
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
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/post/Posts';
import SinglePost from './components/post/SinglePost';
import EditPost from './components/post/EditPost';

const Routing = () => (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route>
            <div className="container">
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                    <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                    <PrivateRoute exact path="/add-experience" component={AddExperience} />
                    <PrivateRoute exact path="/edit-experience" component={EditExperience} />
                    <PrivateRoute exact path="/add-education" component={AddEducation} />
                    <PrivateRoute exact path="/edit-education" component={EditEducation} />
                    <PrivateRoute exact path="/feed" component={Posts} />
                    <PrivateRoute exact path="/post/:id" component={SinglePost} />
                    <PrivateRoute exact path="/edit-post/:id" component={EditPost} />
                    <Route exact path="/profiles" component={Profiles} />
                    <Route exact path="/profile/:handle" component={Profile} />
                    <Route exact path="/*" component={NotFound} />
                </Switch>
            </div>
        </Route>
    </Switch>
);

export default Routing;
