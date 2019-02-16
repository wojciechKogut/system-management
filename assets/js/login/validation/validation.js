const $ = require('jquery');
const isEmpty = require('./isEmpty');

$('input[name=accept]').click(function (input) {
    input.preventDefault();

    const username = $('#username').val();
    const password = $('#password').val();
    const form = $('form:first');

    if (!isEmpty(username) && !isEmpty(password)) {
        form.submit();
    }

    if (isEmpty(username)) {
        $('#username-error span').addClass('text-danger');
        $('#username-error span').text('Username is empty');
    } else {
        $('#username-error span').removeClass('text-danger');
        $('#username-error span').text('');
    }

    if (isEmpty(password)) {
        $('#password-error span').addClass('text-danger');
        $('#password-error span').text('Password is empty');
    } else {
        $('#password-error span').removeClass('text-danger');
        $('#password-error span').text('');
    }
});
