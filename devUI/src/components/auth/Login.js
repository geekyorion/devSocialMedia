import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const loginUser = (e) => {
        e.preventDefault();
        const loginData = { email, password };

        axios.post('api/user/login', loginData)
            .then(res => {
                console.log(res.data)

                // clear the field and navigate to dashboard
                setEmail('');
                setPassword('');
                setErrors({});
            })
            .catch(err => setErrors(err.response.data));
    };

    useEffect(() => {
        document.title = 'Dev Social Media : Login'
    }, []);

    return (
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                    Sign in to your Dev Social Media account
                </p>
                <form onSubmit={loginUser}>
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
