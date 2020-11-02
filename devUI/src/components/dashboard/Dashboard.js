import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile } from '../../redux/actions/profileActions';
import Spinner from '../common/Spinner';
import DeleteProfile from './DeleteProfile';
import Experience from '../experience/Experience';
import ProfileActions from './ProfileActions';

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const profileState = useSelector(state => state.profile);

    const { user } = authState;
    const { loading, profile } = profileState;

    useEffect(() => {
        document.title = 'Dev Social Media : Dashboard';
        dispatch(getCurrentProfile());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                {loading || profile === null ? (
                    <Spinner />
                ) : (
                        <>
                            <h1 className="display-4 h1">Dashboard</h1>

                            {Object.keys(profile).length > 0 ? (
                                <>
                                    <p className="lead text-muted">
                                        Welcome
                                        <Link to={`profile/${profile.handle}`}> {user && user.name}</Link>
                                    </p>
                                    <ProfileActions />
                                    {profile.experience && profile.experience.length > 0 && (
                                        <Experience experience={profile.experience} />
                                    )}
                                </>
                            ) : (
                                    <>
                                        <p>You have not setup profile yet. Please create your profile to get started.</p>
                                        <Link to="create-profile" className="btn btn-info">Create Profile</Link>
                                    </>
                                )
                            }

                            <DeleteProfile />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard;
