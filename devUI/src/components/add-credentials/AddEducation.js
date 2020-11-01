import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../redux/actions/errorsAction';
import { addEducation } from '../../redux/actions/profileActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

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

    const handleAddExperience = (e) => {
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
                        <h1 className="display-4 text-center">Add Education</h1>
                        <p class="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                        <small className="d-block pb-3 text-info">Please add the most recent education details at last</small>
                        <small className="d-block pb-3">* = required field</small>
                        <form onSubmit={handleAddExperience}>
                            <TextFieldGroup
                                placeholder="* School Or Bootcamp"
                                name="school"
                                value={state.school}
                                onChange={handleChange}
                                error={errors.school}
                                handleStateObject
                            />
                            <TextFieldGroup
                                placeholder="* Degree Or Certificate"
                                name="degree"
                                value={state.degree}
                                onChange={handleChange}
                                error={errors.degree}
                                handleStateObject
                            />
                            <TextFieldGroup
                                placeholder="* Field Of Study"
                                name="fieldOfStudy"
                                value={state.fieldOfStudy}
                                onChange={handleChange}
                                error={errors.fieldOfStudy}
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
                                placeholder="Program Description"
                                value={state.description}
                                onChange={handleChange}
                                info="Tell us about your education experience and what you learned"
                                handleStateObject
                            />
                            <input
                                type="submit"
                                className="btn btn-info btn-block mt-4"
                                value="Add Education"
                                disabled={processing}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddEducation;
