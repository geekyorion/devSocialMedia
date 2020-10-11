import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({
    spinnerType,
    spinnerColor
}) => {
    // provide default value in case of wrong propType value
    if (spinnerType === 'border' && spinnerType === 'grow') {
        spinnerType = 'border';
    }

    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
    if (colors.indexOf(spinnerColor) === -1) {
        spinnerColor = 'dark';
    }

    return (
        <div className="spinner-comp">
            <div className={`spinner-${spinnerType} text-${spinnerColor}`} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

Spinner.propTypes = ({
    spinnerType: PropTypes.string,
    spinnerColor: PropTypes.string,
});

Spinner.defaultProps = ({
    spinnerType: 'border',
    spinnerColor: 'dark',
});

export default Spinner;
