import React from 'react';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
    disabled,
    error,
    info,
    name,
    onChange,
    placeholder,
    value
}) => {
    return (
        <div className="form-group">
            <textarea
                className={`form-control form-control-lg${error ? ' is-invalid' : ''}`}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
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
    info: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
};

TextAreaFieldGroup.defaultProps = {
    disabled: false,
}

export default TextAreaFieldGroup;
