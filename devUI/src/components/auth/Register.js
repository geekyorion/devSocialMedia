import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import { registerUser } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorsAction';

const Register = (props) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const dispatch = useDispatch();

    const errors = useSelector(state => state.errors);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const completeSignup = (e) => {
        e.preventDefault();

        const newUser = {
            name: fullname,
            email,
            password,
            cPassword: cpassword
        };
        dispatch(registerUser(newUser, props.history));
    };

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/dashboard');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    useEffect(() => {
        document.title = 'Dev Social Media : Register';
        dispatch(clearErrors());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (!isAuthenticated ? (
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                    Create your Dev Social Media account
                </p>
                <form onSubmit={completeSignup}>
                    <TextFieldGroup
                        placeholder="Name"
                        name="name"
                        value={fullname}
                        onChange={setFullname}
                        error={errors.name}
                    />

                    <TextFieldGroup
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={setEmail}
                        error={errors.email}
                        info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />

                    <TextFieldGroup
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={setPassword}
                        error={errors.password}
                    />

                    <TextFieldGroup
                        type="password"
                        placeholder="Confirm Password"
                        name="cpassword"
                        value={cpassword}
                        onChange={setCpassword}
                        error={errors.cPassword}
                    />

                    <input
                        type="submit"
                        className="btn btn-info btn-block mt-4"
                        value="Register"
                    />
                </form>
            </div>
        </div>
    ) : (
            ''
        )
    );
};

export default withRouter(Register);
