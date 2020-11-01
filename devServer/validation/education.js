const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
    let errors = {};

    if (isEmpty(data.school)) {
        errors.school = 'School field is required';
    }

    if (isEmpty(data.degree)) {
        errors.degree = 'Degree field is required';
    }

    if (isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = 'Field of study field is required';
    }

    if (isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }

    if (!isEmpty(data.to)) {
        if (!Validator.isDate(data.to)) {
            errors.to = 'To field is not having a valid date';
        } else if (!Validator.isAfter(data.to, data.from)) {
            errors.to = 'To date should be after From date';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
