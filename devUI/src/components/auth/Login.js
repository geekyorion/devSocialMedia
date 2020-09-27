import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import { loginUser } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorsAction';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const errors = useSelector(state => state.errors) || {};
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const processLogin = (e) => {
        e.preventDefault();
        const loginData = { email, password };

        dispatch(loginUser(loginData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/dashboard');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    useEffect(() => {
        document.title = 'Dev Social Media : Login';
        dispatch(clearErrors());
    }, []);

    return (!isAuthenticated ? (
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                    Sign in to your Dev Social Media account
                </p>
                <form onSubmit={processLogin}>
                    <TextFieldGroup
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={setEmail}
                        error={errors.email}
                    />

                    <TextFieldGroup
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={setPassword}
                        error={errors.password}
                    />

                    <input
                        type="submit"
                        className="btn btn-info btn-block mt-4"
                        value="Login"
                    />
                </form>
            </div>
        </div>
    ) : (
            ''
        )
    );
};

export default Login;
