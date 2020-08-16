const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    // when the form object is empty (empty req.body)
    if (isEmpty(data)) {
        errors.form = 'Form should send valid login data';
        return {
            errors,
            isValid: false
        };
    }

    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;

    // email validator
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email';
    }

    if (isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    // password validator
    if (isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
