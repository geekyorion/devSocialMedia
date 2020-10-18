import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({
    disabled,
    error,
    icon,
    name,
    onChange,
    placeholder,
    type,
    value
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={`fab fa-${icon}`}></i>
                </span>
            </div>

            <input
                type={type}
                className={`form-control form-control-lg${error ? ' is-invalid' : ''}`}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            />

            { error && (<div className="invalid-feedback">{error}</div>)}
        </div >
    );
}

InputGroup.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

InputGroup.defaultProps = {
    disabled: false,
    type: 'text'
}

export default InputGroup;
