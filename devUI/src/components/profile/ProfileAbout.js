import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils/utils';

const ProfileAbout = ({ profile }) => {
    const { user, skills } = profile;
    const firstName = user.name.trim().split(' ')[0];
    return (
        <div className="col-md-12">
            <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{firstName}'s Bio</h3>
                <p className="lead text-center">
                    {isEmpty(profile.bio) ? `${firstName} does not have a bio` : profile.bio}
                </p>
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                    <div className="d-flex flex-wrap justify-content-center align-items-center m-auto">
                        {skills.map((skill, index) => (
                            <div className="p-3" key={index}>
                                <i className="fa fa-check"></i> {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
