import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils/utils';

const ProfileHeader = ({ profile }) => {
    const { user, social } = profile;

    return (
        <div className="col-md-12">
            <div className="card card-body bg-info text-white mb-3">
                <div className="row">
                    <div className="col-4 col-md-3 m-auto">
                        <img
                            className="rounded-circle mb-2"
                            src={user.avatar}
                            alt="Gravatar associated with your email"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="display-4 text-center">{user.name}</h1>
                    <p className="text-center">
                        {profile.status} {isEmpty(profile.company) ? '' : <span>at {profile.company}</span>}
                    </p>
                    {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
                    <p>
                        {isEmpty(profile.website) ? null : (
                            <a
                                className="text-white p-2"
                                href={profile.website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fas fa-globe fa-2x"></i>
                            </a>
                        )}
                        {isEmpty(social && social.twitter) ? null : (
                            <a
                                className="text-white p-2"
                                href={social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-twitter fa-2x"></i>
                            </a>
                        )}
                        {isEmpty(social && social.facebook) ? null : (
                            <a
                                className="text-white p-2"
                                href={social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-facebook fa-2x"></i>
                            </a>
                        )}
                        {isEmpty(social && social.linkedin) ? null : (
                            <a
                                className="text-white p-2"
                                href={social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-linkedin fa-2x"></i>
                            </a>
                        )}
                        {isEmpty(social && social.instagram) ? null : (
                            <a
                                className="text-white p-2"
                                href={social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-instagram fa-2x"></i>
                            </a>
                        )}
                        {isEmpty(social && social.youtube) ? null : (
                            <a
                                className="text-white p-2"
                                href={social.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fab fa-youtube fa-2x"></i>
                            </a>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

ProfileHeader.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileHeader;
