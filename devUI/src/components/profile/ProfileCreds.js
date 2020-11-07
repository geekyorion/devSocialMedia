import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils/utils';

const ProfileCreds = ({ experience, education }) => {
    const experienceMarkup = experience.map(exp => (
        <li className="list-group-item" key={exp._id}>
            <h4>{exp.company}</h4>
            <p>
                {new Date(exp.from).toLocaleDateString()}
                {" - "}
                {exp.current ? 'Present' : (exp.to ? new Date(exp.to).toLocaleDateString() : 'Present')}
            </p>
            <p><strong>Position:</strong> {exp.title}</p>
            {isEmpty(exp.location) ? null : <p><strong>Location:</strong> {exp.location}</p>}
            {isEmpty(exp.description) ? null : <p><strong>Description:</strong> {exp.description}</p>}
        </li>
    ));

    const educationMarkup = education.map(edu => (
        <li className="list-group-item" key={edu._id}>
            <h4>{edu.school}</h4>
            <p>
                {new Date(edu.from).toLocaleDateString()}
                {" - "}
                {edu.current ? 'Present' : (edu.to ? new Date(edu.to).toLocaleDateString() : 'Present')}
            </p>
            <p><strong>Degree:</strong> {edu.degree}</p>
            <p><strong>Field Of Study:</strong> {edu.fieldOfStudy}</p>
            {isEmpty(edu.description) ? null : <p><strong>Description:</strong> {edu.description}</p>}
        </li>
    ));

    return (
        <>
            <div className="col-md-6 pt-2">
                <h3 className="text-center text-info">Experience</h3>
                {isEmpty(experience) ? (
                    <p className="lead text-center">No experience listed</p>
                ) : (
                        <ul className="list-group">{experienceMarkup}</ul>
                    )
                }
            </div>

            <div className="col-md-6 pt-2">
                <h3 className="text-center text-info">Education</h3>
                {isEmpty(education) ? (
                    <p className="lead text-center">No education listed</p>
                ) : (
                        <ul className="list-group">{educationMarkup}</ul>
                    )
                }
            </div>
        </>
    );
};


ProfileCreds.propTypes = {
    experience: PropTypes.array.isRequired,
    education: PropTypes.array.isRequired,
};

export default ProfileCreds;
