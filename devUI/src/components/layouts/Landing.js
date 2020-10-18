import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    const guestMarkup = (
        <>
            <p className="lead">
                Create a developer profile/portfolio, share
                posts and get help from other developers
            </p>
            <hr />
            <Link
                to="/register"
                className="btn btn-lg btn-info mr-2"
            >
                Sign Up
            </Link>
            <Link
                to="/login"
                className="btn btn-lg btn-light"
            >
                Login
            </Link>
        </>
    );

    const authMarkup = (
        <>
            <p className="lead">
                Welcome, {user.name}
            </p>
            <hr />
            <Link
                to="/dashboard"
                className="btn btn-lg btn-dark mr-2"
            >
                Go to dashboard
            </Link>
        </>
    );

    useEffect(() => {
        document.title = 'Dev Social Media : Home';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">
                                Developer Social Media
                            </h1>
                            {isAuthenticated ? authMarkup : guestMarkup}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
