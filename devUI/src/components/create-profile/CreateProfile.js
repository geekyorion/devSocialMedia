import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

const initialState = {
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubUsername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: ''
};

const CreateProfile = () => {
    const [formData, setFormData] = useState(initialState);
    const [displaySocial, setDisplaySocial] = useState(false);
    const [errors, setErrors] = useState({});

    const profileState = useSelector(state => state.profile);
    const errorsState = useSelector(state => state.errors);

    const handleOnChange = (e, stateType = 'group') => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="row">
            <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                    Go Back
                </Link>
                <h1 className="display-4 text-center">Create Your Profile</h1>
                <p className="lead text-center">Let's get some information to make your profile stand out</p>
                <small className="d-block pb-3">* is required field</small>

                <form onSubmit={handleSubmit}>
                    <TextFieldGroup
                        placeholder="* Profile Handle"
                        name="handle"
                        value={formData.handle}
                        onChange={handleOnChange}
                        error={errors.handle}
                        info="A unique handle for your profile URL"
                        handleStateObject
                    />
                </form>
            </div>
        </div>
    )
}

export default CreateProfile;
