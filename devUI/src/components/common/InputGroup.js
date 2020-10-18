import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({
    disabled,
    error,
    handleStateObject,
    icon,
    name,
    onChange,
    placeholder,
    type,
    value
}) => {
    const handleInputChange = (e) => {
        onChange(handleStateObject ? e : e.target.value);
    }

    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={`fab fa-${icon}`}></i>
                </span>
            </div>

            <input
                type={type}
                className={`form-control form-control-md${error ? ' is-invalid' : ''}`}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleInputChange}
                disabled={disabled}
            />

            { error && (<div className="invalid-feedback">{error}</div>)}
        </div >
    );
}

InputGroup.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    handleStateObject: PropTypes.bool,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

InputGroup.defaultProps = {
    disabled: false,
    handleStateObject: false,
    type: 'text'
}

export default InputGroup;
