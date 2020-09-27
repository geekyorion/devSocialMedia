import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../redux/actions/authActions';
import { clearProfile } from '../../redux/actions/profileActions';

const Navbar = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    const handleLogout = () => {
        dispatch(clearProfile());
        dispatch(logoutUser());
    }

    const guestLinks = (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/register">
                    Sign Up
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </li>
        </>
    );

    const authLinks = (
        <>
            <li className="nav-item">
                <button
                    className="btn btn-link nav-link nav-link-btn"
                    href="#"
                    onClick={handleLogout}
                >
                    <img
                        className="nav-avatar rounded-circle"
                        src={user.avatar}
                        alt={user.name}
                        title="Gravatar associated with your email"
                    />
                    Logout
                </button>
            </li>
        </>
    );

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Dev Social Media
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profiles">
                                Developers
                            </Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        {isAuthenticated ? authLinks : guestLinks}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
