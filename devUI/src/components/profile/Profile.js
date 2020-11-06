import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../redux/actions/profileActions';

const Profile = (props) => {
    const dispatch = useDispatch();
    const profileState = useSelector(state => state.profile);

    const { profile, loading } = profileState;

    useEffect(() => {
        document.title = 'Dev Social Media : Edit Profile';
        dispatch(getProfileByHandle(props.match.params.handle));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                    <>
                        <ProfileHeader />
                        <ProfileAbout />
                        <ProfileCreds />
                        <ProfileGithub />
                    </>
                )
            }
        </div>
    );
};

export default Profile;
