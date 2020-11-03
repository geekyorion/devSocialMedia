import React from 'react';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';

const EducationForm = ({
    errors,
    handleChange,
    handleCheck,
    handleFormSubmit,
    processing,
    state,
    type,
}) => {
    return (
        <form onSubmit={handleFormSubmit}>
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
                value={`${type} Education`}
                disabled={processing}
            />
        </form>
    );
};

EducationForm.propTypes = {
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleCheck: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    processing: PropTypes.bool.isRequired,
    state: PropTypes.object.isRequired,
    type: PropTypes.string,
}

EducationForm.defaultProps = {
    errors: [],
    processing: false,
    type: 'Add',
}

export default EducationForm;
