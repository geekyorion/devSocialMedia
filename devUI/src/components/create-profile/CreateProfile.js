import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'react-router-dom/Link';
import CreateProfileForm from './CreateProfileForm';
import { createUserProfile } from '../../redux/actions/profileActions';
import { clearErrors } from '../../redux/actions/errorsAction';

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

const CreateProfile = (props) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);

    const processingState = useSelector(state => state.processing.processing);
    const errors = useSelector(state => state.errors);

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUserProfile(formData, props.history));
    };

    useEffect(() => {
        document.title = 'Dev Social Media : Create Profile';
        dispatch(clearErrors());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="row">
            <div className="col-md-8 m-auto">
                <Link to="/dashboard" class="btn btn-light btn-xs">Go Back</Link>
                <h1 className="display-4 text-center">Create Your Profile</h1>
                <p className="lead text-center">Let's get some information to make your profile stand out</p>
                <small className="d-block pb-3">* is required field</small>

                <CreateProfileForm
                    errors={errors}
                    formData={formData}
                    handleOnChange={handleOnChange}
                    handleSubmit={handleSubmit}
                    disableButton={processingState}
                />
            </div>
        </div>
    )
}

export default CreateProfile;
