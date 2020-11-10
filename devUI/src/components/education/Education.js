import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUserEducation } from '../../redux/actions/profileActions';
import { initDelete } from '../../redux/actions/deleteActions';

const Education = ({ education }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = (id) => {
        dispatch(initDelete({
            modalType: 'education',
            modalFunc: deleteUserEducation,
            modalParam: id
        }));
    };

    const handleUpdate = (edu) => {
        history.push({
            pathname: '/edit-education',
            state: { education: edu }
        });
    };

    return (
        <div>
            <h4 className="mb-2 mt-3">Education Credentials</h4>
            <div className="table-responsive">
                <table className="table table-sm table-hover table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {education.map(edu => (
                            <tr key={edu._id}>
                                <td className="align-middle">{edu.school}</td>
                                <td className="align-middle">{edu.degree}</td>
                                <td className="align-middle">
                                    {new Date(edu.from).toLocaleDateString()}
                                    {" - "}
                                    {edu.current ? 'Present' : (edu.to ? new Date(edu.to).toLocaleDateString() : 'Present')}
                                </td>
                                <td className="align-middle">
                                    <button
                                        className="btn btn-info btn-sm m-1"
                                        onClick={() => handleUpdate(edu)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm m-1"
                                        onClick={() => handleDelete(edu._id)}
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

Education.propTypes = {
    education: PropTypes.array.isRequired,
};

Education.defaultProps = {
    education: [],
}

export default Education;
