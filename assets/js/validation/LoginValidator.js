import validator from 'validator';
import  isEmpty from './isEmpty';

const LoginValidator = (data) => {
    let formErrors = {};

    if (validator.isEmpty(data.password)) {
        formErrors.password = 'Password field is required';
    }

    if (validator.isEmpty(data.username)) {
        formErrors.username = 'Username field is required';
    }

    return {
        errors: formErrors,
        isValid: isEmpty(formErrors)
    }
};

export default LoginValidator;