const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = isEmpty(data.text) ? '' : data.text;

    // text validator
    if (!Validator.isLength(data.text, { min: 5, max: 300 })) {
        errors.text = 'Text must be between 5 and 300 characters';
    }

    if (isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
