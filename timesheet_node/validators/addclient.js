const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateClientInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.contact = !isEmpty(data.contact) ? data.contact : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Client name field is required';
  }

  if (Validator.isEmpty(data.contact)) {
    errors.contact = 'Contact field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
