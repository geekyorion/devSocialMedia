import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentProfile } from '../../redux/actions/profileActions';
import Spinner from '../common/Spinner';

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
                            <h1 className="h1 display-4">Dashboard</h1>
                            <p className="lead">
                                <i className="fas fa-user" /> Welcome {user && user.name}
                            </p>

                            {Object.keys(profile).length > 0 ? (
                                <h1>show profile here</h1>
                            ) : (
                                    <>
                                        <p>You have not setup profile yet. Please create your profile to get started.</p>
                                        <Link to="create-profile" className="btn btn-info">Create Profile</Link>
                                    </>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard;
