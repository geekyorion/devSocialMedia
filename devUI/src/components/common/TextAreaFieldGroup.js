import React from 'react';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
    disabled,
    error,
    handleStateObject,
    info,
    name,
    onChange,
    placeholder,
    value
}) => {
    const handleInputChange = (e) => {
        onChange(handleStateObject ? e : e.target.value);
    }

    return (
        <div className="form-group">
            <textarea
                className={`form-control form-control-md${error ? ' is-invalid' : ''}`}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleInputChange}
                disabled={disabled}
            ></textarea>

            {error && (<div className="invalid-feedback">{error}</div>)}
            {info && (<small className="form-text text-muted">{info}</small>)}
        </div>
    );
}

TextAreaFieldGroup.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    handleStateObject: PropTypes.bool,
    info: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
};

TextAreaFieldGroup.defaultProps = {
    disabled: false,
    handleStateObject: false,
}

export default TextAreaFieldGroup;
