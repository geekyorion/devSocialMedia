import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
    disabled,
    error,
    handleStateObject,
    info,
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
        <div className="form-group">
            <input
                type={type}
                className={`form-control form-control-md${error ? ' is-invalid' : ''}`}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleInputChange}
                disabled={disabled}
            />

            {error && (<div className="invalid-feedback">{error}</div>)}
            {info && (<small className="form-text text-muted">{info}</small>)}
        </div>
    );
}

TextFieldGroup.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    handleStateObject: PropTypes.bool,
    info: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

TextFieldGroup.defaultProps = {
    disabled: false,
    handleStateObject: false,
    type: 'text'
}

export default TextFieldGroup;
