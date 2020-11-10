import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUserExperience } from '../../redux/actions/profileActions';
import { initDelete } from '../../redux/actions/deleteActions';

const Experience = ({ experience }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = (id) => {
        dispatch(initDelete({
            modalType: 'experience',
            modalFunc: deleteUserExperience,
            modalParam: id
        }));
    };

    const handleUpdate = (exp) => {
        history.push({
            pathname: '/edit-experience',
            state: { experience: exp }
        });
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experience.map(exp => (
                            <tr key={exp._id}>
                                <td className="align-middle">{exp.company}</td>
                                <td className="align-middle">{exp.title}</td>
                                <td className="align-middle">
                                    {new Date(exp.from).toLocaleDateString()}
                                    {" - "}
                                    {exp.current ? 'Present' : (exp.to ? new Date(exp.to).toLocaleDateString() : 'Present')}
                                </td>
                                <td className="align-middle">
                                    <button
                                        className="btn btn-info btn-sm m-1"
                                        onClick={() => handleUpdate(exp)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm m-1"
                                        onClick={() => handleDelete(exp._id)}
                                        data-toggle="modal"
                                        data-target="#deleteRecord"
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
