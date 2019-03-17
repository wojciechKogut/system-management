import validator from 'validator';
import isEmpty from './isEmpty';

const RegisterValidator = (data) => {
    let errors = {};
    let repeatPassword = isEmpty(data.repeat) ? '' : data.repeat;

    if (validator.isEmpty(repeatPassword)) {
      errors.repeat = 'Repeat Password is required';
    } else {
        if (data.password !== data.repeat) {
            errors.repeat = 'Wrong password, please repeat';
        }
    }

    if (validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};

export default RegisterValidator;