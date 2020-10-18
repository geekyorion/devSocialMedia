import React from 'react';
import PropTypes from 'prop-types';

const SelectListGroup = ({
    disabled,
    error,
    info,
    name,
    onChange,
    options,
    value
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));

    return (
        <div className="form-group">
            <select
                className={`form-control form-control-lg${error ? ' is-invalid' : ''}`}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            >
                {selectOptions}
            </select>

            {error && (<div className="invalid-feedback">{error}</div>)}
            {info && (<small className="form-text text-muted">{info}</small>)}
        </div>
    );
}

SelectListGroup.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    info: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
};

SelectListGroup.defaultProps = {
    disabled: false,
}

export default SelectListGroup;
