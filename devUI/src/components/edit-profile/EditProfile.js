import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateProfileForm from '../create-profile/CreateProfileForm';
import { createUserProfile, getCurrentProfile, refreshGravatar } from '../../redux/actions/profileActions';
import { clearErrors } from '../../redux/actions/errorsAction';
import { isEmpty } from '../../utils/utils';

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

const EditProfile = (props) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);

    const profileState = useSelector(state => state.profile);
    const processingState = useSelector(state => state.processing.processing);
    const errors = useSelector(state => state.errors);
    const avatar = profileState.profile ? profileState.profile.user.avatar : "";

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUserProfile(formData, props.history, 'updated'));
    };

    const setUserData = () => {
        const profile = profileState.profile;
        if (isEmpty(profile)) return;

        // convert skills array to CSV
        const skillsCSV = isEmpty(profile.skills) ? '' : profile.skills.join(', ');
        profile.company = isEmpty(profile.company) ? '' : profile.company;
        profile.website = isEmpty(profile.website) ? '' : profile.website;
        profile.location = isEmpty(profile.location) ? '' : profile.location;
        profile.githubUsername = isEmpty(profile.githubUsername) ? '' : profile.githubUsername;
        profile.bio = isEmpty(profile.bio) ? '' : profile.bio;

        // check for the social links
        profile.social = isEmpty(profile.social) ? {} : profile.social;
        profile.twitter = isEmpty(profile.social.twitter) ? '' : profile.social.twitter;
        profile.facebook = isEmpty(profile.social.facebook) ? '' : profile.social.facebook;
        profile.linkedin = isEmpty(profile.social.linkedin) ? '' : profile.social.linkedin;
        profile.youtube = isEmpty(profile.social.youtube) ? '' : profile.social.youtube;
        profile.instagram = isEmpty(profile.social.instagram) ? '' : profile.social.instagram;

        // set the state for the form
        setFormData({
            handle: profile.handle,
            company: profile.company,
            website: profile.website,
            location: profile.location,
            status: profile.status,
            skills: skillsCSV,
            githubUsername: profile.githubUsername,
            bio: profile.bio,
            twitter: profile.twitter,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            youtube: profile.youtube,
            instagram: profile.instagram
        });
    };

    useEffect(() => {
        document.title = 'Dev Social Media : Edit Profile';
        dispatch(clearErrors());
        dispatch(getCurrentProfile());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileState]);

    return (
        <div className="row">
            <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light btn-xs">Go Back</Link>
                <h1 className="display-4 text-center">Update Your Profile</h1>
                <p className="lead text-center">Keep your information updated to make your profile stand out</p>

                <div className="row mb-3 align-items-center">
                    <div className="col-sm-4 text-center">
                        <img
                            className="responsive rounded profile-avatar"
                            src={avatar}
                            alt="Gravatar associated with your email"
                        />
                    </div>
                    <div className="col-sm-8 p-2 text-center">
                        <small>
                            This gravatar associated with your e-mail address. If you have changed the gravatar then
                            please click on refresh gravatar button to refresh your gravatar.
                        </small>
                        <div>
                            <button
                                className="btn btn-light btn-sm m-2"
                                onClick={() => dispatch(refreshGravatar())}
                            >
                                Refresh Gravatar
                            </button>
                        </div>
                        <small className="text-muted text-sm text-left d-block">
                            You may need to refresh the browser if you are unable to see the refreshed gravatar
                            due to browser cache
                        </small>
                    </div>
                </div>

                <small className="d-block mt-3 pb-2">* is required field</small>
                <CreateProfileForm
                    errors={errors}
                    formData={formData}
                    handleOnChange={handleOnChange}
                    handleSubmit={handleSubmit}
                    formType="Edit"
                    disableButton={processingState}
                />
            </div>
        </div>
    );
};

export default EditProfile;
