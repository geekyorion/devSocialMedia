// const Validator = require('validator');
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    // when the form object is empty (empty req.body)
    // if (isEmpty(data)) {
    //     errors.form = 'Experience data is empty';
    //     return {
    //         errors,
    //         isValid: false
    //     };
    // }

    // data.title = isEmpty(data.title) ? '' : data.title;
    // data.company = isEmpty(data.company) ? '' : data.company;
    // data.from = isEmpty(data.from) ? '' : data.from;

    if (isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    }

    if (isEmpty(data.company)) {
        errors.company = 'Company field is required';
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
