import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'react-router-dom/Link';
import { clearErrors } from '../../redux/actions/errorsAction';
import { addEducation } from '../../redux/actions/profileActions';
import EducationForm from './EducationForm';

const initialState = {
    current: false,
    degree: '',
    description: '',
    fieldOfStudy: '',
    from: '',
    school: '',
    to: '',
    disabled: false,
};

const AddEducation = (props) => {
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    const errors = useSelector(state => state.errors);
    const processing = useSelector(state => state.processing.processing);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            current: state.current,
            degree: state.degree,
            description: state.description,
            fieldOfStudy: state.fieldOfStudy,
            from: state.from,
            school: state.school,
            to: state.to,
        };
        dispatch(addEducation(data, props.history));
    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleCheck = (e) => {
        setState({
            ...state,
            current: !state.current,
            disabled: !state.disabled
        });
    };

    useEffect(() => {
        document.title = 'Dev Social Media : Add Education';
        dispatch(clearErrors());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="section add-education">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" class="btn btn-light btn-xs">Go Back</Link>
                        <h1 className="display-4 text-center">Add Education</h1>
                        <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                        <small className="d-block pb-3 text-info">Please add the most recent education details at last</small>
                        <small className="d-block pb-3">* = required field</small>
                        <EducationForm
                            errors={errors}
                            handleChange={handleChange}
                            handleCheck={handleCheck}
                            handleFormSubmit={handleFormSubmit}
                            processing={processing}
                            state={state}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddEducation;
