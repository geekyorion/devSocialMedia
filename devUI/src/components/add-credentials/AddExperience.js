import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addExperience } from '../../redux/actions/profileActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

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
    const profileState = useSelector(state => state.profile);
    const processing = useSelector(state => state.processing.processing);

    const handleAddExperience = (e) => {
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
    }, []);

    return (
        <div className="section add-experience">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Add Experience</h1>
                        <p className="lead text-center">Add any developer/programming positions that you have had in the past or current</p>
                        <small className="d-block pb-3 text-info">Please add the most recent experience at last</small>
                        <small className="d-block pb-3">* = required field</small>
                        <form onSubmit={handleAddExperience}>
                            <TextFieldGroup
                                placeholder="* Company"
                                name="company"
                                value={state.company}
                                onChange={handleChange}
                                error={errors.company}
                                handleStateObject
                            />
                            <TextFieldGroup
                                placeholder="* Job Title"
                                name="title"
                                value={state.title}
                                onChange={handleChange}
                                error={errors.title}
                                handleStateObject
                            />
                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={state.location}
                                onChange={handleChange}
                                error={errors.location}
                                handleStateObject
                            />
                            <h6>From Date</h6>
                            <TextFieldGroup
                                type="date"
                                name="from"
                                value={state.from}
                                onChange={handleChange}
                                error={errors.from}
                                handleStateObject
                            />
                            <h6>To Date</h6>
                            <TextFieldGroup
                                type="date"
                                name="to"
                                value={state.to}
                                onChange={handleChange}
                                error={errors.to}
                                disabled={state.disabled}
                                handleStateObject
                            />
                            <div className="form-check mb-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="current"
                                    value={state.current}
                                    onChange={handleCheck}
                                    checked={state.current}
                                    id="current-job"
                                />
                                <label className="form-check-label" htmlFor="current-job">
                                    Current Job
                                </label>
                            </div>
                            <TextAreaFieldGroup
                                name="description"
                                placeholder="Job Description"
                                value={state.description}
                                onChange={handleChange}
                                info="Some of your responsabilities, etc"
                                handleStateObject
                            />
                            <input
                                type="submit"
                                className="btn btn-info btn-block mt-4"
                                value="Add Experience"
                                disabled={processing}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddExperience;
