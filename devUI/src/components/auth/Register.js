import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [errors, setErrors] = useState({});

    const registerUser = (e) => {
        e.preventDefault();

        const newUser = {
            name: fullname,
            email,
            password,
            cPassword: cpassword
        };

        axios.post('api/user/register', newUser)
            .then(res => {
                console.log(res.data)

                // clear the field and navigate to dashboard
                setFullname('');
                setEmail('');
                setPassword('');
                setCpassword('');
                setErrors({});
            })
            .catch(err => setErrors(err.response.data));

    }

    useEffect(() => {
        document.title = 'Dev Social Media : Register';
    }, []);

    return (
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                    Create your Dev Social Media account
                </p>
                <form onSubmit={registerUser}>
                    <div className="form-group">
                        <input
                            type="text"
                            className={`form-control form-control-lg${errors.name ? ' is-invalid' : ''}`}
                            placeholder="Name"
                            name="name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                        {errors.name && (
                            <div className="invalid-feedback">
                                {errors.name}
                            </div>
                        )}
                    </div>
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

                        <small className="form-text text-muted">
                            This site uses Gravatar so if you want a profile
                            image, use a Gravatar email
                        </small>
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
                    <div className="form-group">
                        <input
                            type="password"
                            className={`form-control form-control-lg${errors.cPassword ? ' is-invalid' : ''}`}
                            placeholder="Confirm Password"
                            name="cpassword"
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)}
                        />
                        {errors.cPassword && (
                            <div className="invalid-feedback">
                                {errors.cPassword}
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

export default Register;
