import React from 'react';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

const ExperienceForm = ({
    errors,
    handleFormSubmit,
    handleChange,
    handleCheck,
    processing,
    state,
    type,
}) => {
    return (
        <form onSubmit={handleFormSubmit}>
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
                    Current Education
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
                value={`${type} Experience`}
                disabled={processing}
            />
        </form>
    )
};

ExperienceForm.propTypes = {
    errors: PropTypes.object.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleCheck: PropTypes.func.isRequired,
    processing: PropTypes.bool.isRequired,
    state: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
};

ExperienceForm.defaultProps = {
    errors: {},
    processing: false,
    type: 'Add',
};

export default ExperienceForm;
