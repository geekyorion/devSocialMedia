import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../redux/actions/profileActions';
import { isEmpty } from '../../utils/utils';

const Profile = (props) => {
    const dispatch = useDispatch();
    const profileState = useSelector(state => state.profile);

    const { profile, loading } = profileState;

    const renderedFrom = props.location.state === 'dashboard' ? 'dashboard' : 'profiles';

    useEffect(() => {
        document.title = 'Dev Social Media : Profile';
        dispatch(getProfileByHandle(props.match.params.handle, props.history));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-6">
                                <Link
                                    to={`/${renderedFrom}`}
                                    className="btn btn-light mb-3 btn-xs"
                                >
                                    {`Back to ${renderedFrom}`}
                                </Link>
                            </div>
                        </div>
                        {loading || isEmpty(profile) ? (
                            <Spinner />
                        ) : (
                                <div className="row">
                                    <ProfileHeader profile={profile} />
                                    <ProfileAbout profile={profile} />
                                    <ProfileCreds
                                        experience={profile.experience || []}
                                        education={profile.education || []}
                                    />
                                    {isEmpty(profile.githubUsername) ? null : (
                                        <ProfileGithub username={profile.githubUsername} />
                                    )}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
