const Validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateRegisterInput(data){
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.name = 'First Name must be between 2 and 30 characters';
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.name = 'Last Name must be between 2 and 30 characters';
  }

  if(Validator.isEmpty(data.firstName)) {
    errors.name = 'First Name field is required'
  }

  if(Validator.isEmpty(data.lastName)) {
    errors.name = 'Last Name field is required'
  }

  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  if(!Validator.isLength(data.password, {min : 6, max : 30})) {
    errors.password = 'Password must be at least 6 characters'
  }



  return {
    errors,
    isValid: isEmpty(errors)
  }
}
