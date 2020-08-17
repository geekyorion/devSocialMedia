const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    // when the form object is empty (empty req.body)
    if (isEmpty(data)) {
        errors.form = 'Profile data is empty';
        return {
            errors,
            isValid: false
        };
    }

    data.handle = isEmpty(data.handle) ? '' : data.handle;
    data.status = isEmpty(data.status) ? '' : data.status;
    data.skills = isEmpty(data.skills) ? '' : data.skills;

    // handle validator
    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }

    if (isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    // other validator
    if (isEmpty(data.status)) {
        errors.status = 'Status is required';
    }

    if (isEmpty(data.skills)) {
        errors.skills = 'Skills is required';
    }

    // website validator
    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }

    // social validator
    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid facebook URL';
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid Linkedin URL';
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid YouTube URL';
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid Instagram URL';
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid Twitter URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
