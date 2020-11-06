import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmpty } from '../../utils/utils';

const ProfileCard = ({
    profile
}) => {
    const { user } = profile;
    return (
        <div className="card card-body bg-light mb-3">
            <div className="row align-items-center card-main">
                <div className="col-md-2 col-sm-6 text-center">
                    <img
                        className="rounded-circle profile-avatar"
                        src={user.avatar}
                        alt="Gravatar associated with your email"
                    />
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12 card-detail">
                    <h3>{user.name}</h3>
                    <p className="mb-1">
                        {profile.status} {isEmpty(profile.company) ? '' : <span>at {profile.company}</span>}
                    </p>
                    <p>
                        {isEmpty(profile.location) ? <></> : <span>{profile.location}</span>}
                    </p>
                    <Link
                        to={`/profile/${profile.handle}`}
                        className="btn btn-info btn-sm"
                    >
                        View Profile
                    </Link>
                </div>
                <div className="col-md-4 d-none d-md-block">
                    <h5>Skill Set</h5>
                    <ul className="list-group">
                        {profile.skills.slice(0, 4).map((skill, index) => (
                            <li className="list-group-item list-group-custom" key={index}>
                                <i className="fa fa-check pr-1"></i> {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

ProfileCard.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileCard;
