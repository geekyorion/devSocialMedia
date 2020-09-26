import React, { useState } from 'react';

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

        console.log(newUser);
        return false;
    }

    return (
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                    Create your Dev Social Media account
                </p>
                <form action="create-profile.html" onSubmit={registerUser}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Name"
                            name="name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <small className="form-text text-muted">
                            This site uses Gravatar so if you want a profile
                            image, use a Gravatar email
                        </small>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Confirm Password"
                            name="cpassword"
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)}
                        />
                    </div>
                    <input
                        type="submit"
                        className="btn btn-info btn-block mt-4"
                    />
                </form>
            </div>
        </div>
    );
}

export default Register;
