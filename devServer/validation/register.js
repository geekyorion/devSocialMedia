const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // when the form object is empty (empty req.body)
    if (isEmpty(data)) {
        errors.form = 'Form should send user data';
        return {
            errors,
            isValid: false
        };
    }

    data.name = isEmpty(data.name) ? '' : data.name;
    data.email = isEmpty(data.email) ? '' : data.email;
    data.password = isEmpty(data.password) ? '' : data.password;
    data.cPassword = isEmpty(data.cPassword) ? '' : data.cPassword;

    // name validator
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (isEmpty(data.name)) {
        errors.name = 'Name is required';
    }

    // email validator
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email';
    }

    if (isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    // password validator
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters (max: 30)';
    }

    if (isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    // confirmed password validator and it should match with password
    if (!Validator.isLength(data.cPassword, { min: 6, max: 30 })) {
        errors.cPassword = 'Confirmed password must be at least 6 characters (max: 30)';
    }

    if (data.password !== data.cPassword) {
        errors.cPassword = 'Password and confirmed password should match';
    }

    if (isEmpty(data.cPassword)) {
        errors.cPassword = 'Confirmed password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
