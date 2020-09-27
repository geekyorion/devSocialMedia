import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loginUser } from '../../redux/actions/authActions';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (isAuthenticated) {
        props.history.push('/dashboard');
    }

    const processLogin = (e) => {
        e.preventDefault();
        const loginData = { email, password };

        dispatch(loginUser(loginData));
    };

    useEffect(() => {
        document.title = 'Dev Social Media : Login';
    }, []);

    return (
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                    Sign in to your Dev Social Media account
                </p>
                <form onSubmit={processLogin}>
                    <div className="form-group">
                        <input
                            type="email"
                            className={`form-control form-control-lg${errors.email ? ' is-invalid' : ''}`}
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <div className="invalid-feedback">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={`form-control form-control-lg${errors.password ? ' is-invalid' : ''}`}
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <input
                        type="submit"
                        className="btn btn-info btn-block mt-4"
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
