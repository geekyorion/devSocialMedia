import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../redux/actions/errorsAction';
import { addExperience } from '../../redux/actions/profileActions';
import ExperienceForm from './ExperienceForm';

const initialState = {
    company: '',
    current: false,
    disabled: false,
    description: '',
    from: '',
    location: '',
    title: '',
    to: '',
};

const AddExperience = (props) => {
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();

    const errors = useSelector(state => state.errors);
    const processing = useSelector(state => state.processing.processing);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const data = {
            company: state.company,
            current: state.current,
            description: state.description,
            from: state.from,
            location: state.location,
            title: state.title,
            to: state.to,
        };
        dispatch(addExperience(data, props.history));
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
        document.title = 'Dev Social Media : Add Experience';
        dispatch(clearErrors());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="section add-experience">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light btn-xs">Go Back</Link>
                        <h1 className="display-4 text-center">Add an Experience</h1>
                        <p className="lead text-center">Add any developer/programming positions that you have had in the past or current</p>
                        <small className="d-block pb-3 text-info">Please add the most recent experience at last</small>
                        <small className="d-block pb-3">* = required field</small>
                        <ExperienceForm
                            errors={errors}
                            handleFormSubmit={handleFormSubmit}
                            handleChange={handleChange}
                            handleCheck={handleCheck}
                            processing={processing}
                            state={state}
                            type="Add"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddExperience;
