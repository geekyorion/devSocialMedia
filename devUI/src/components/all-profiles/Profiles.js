import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfiles } from '../../redux/actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileCard from './ProfileCard';

const Profiles = () => {
    const dispatch = useDispatch();
    const profileState = useSelector(state => state.profile);
    const { loading, profiles } = profileState;

    useEffect(() => {
        document.title = 'Dev Social Media : Developers';
        dispatch(getAllProfiles());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                    <>
                        <div className="profiles">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1 className="display-4 text-center">Developer Profiles</h1>
                                        {profiles && profiles.length > 0 ? (
                                            <>
                                                <p className="lead text-center">Browse and connect with developers</p>
                                                {profiles.map(profile => <ProfileCard profile={profile} key={profile._id} />)}
                                            </>
                                        ) : (
                                                <h4 className="display-5 text-center pt-5">No profiles to show</h4>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        </div>
    );
};

export default Profiles;
