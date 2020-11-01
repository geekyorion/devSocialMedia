import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteUserExperience } from '../../redux/actions/profileActions';

const Experience = ({ experience, ...props }) => {
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteUserExperience(id));
    };

    const handleEdit = (id) => {
        console.log('implement handle edit - with API');
    };

    return (
        <div>
            <h4 className="mb-2">Experience Credentials</h4>
            <div className="table-responsive">
                <table className="table table-sm table-hover table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {experience.map(exp => (
                            <tr key={exp._id}>
                                <td>{exp.company}</td>
                                <td>{exp.title}</td>
                                <td>
                                    {new Date(exp.from).toLocaleDateString()}
                                    &nbsp;-&nbsp;
                                    {exp.to ? new Date(exp.to).toLocaleDateString() : 'Present'}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-info mr-2"
                                        onClick={() => handleEdit(exp._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(exp._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
};

Experience.defaultProps = {
    experience: [],
}

export default Experience;
