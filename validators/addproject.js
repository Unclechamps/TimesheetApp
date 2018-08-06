const Validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateProjectInput(data) {
  let errors = {};

  data.projectName = !isEmpty(data.projectName) ? data.projectName : '';
  data.projectDesc = !isEmpty(data.projectDesc) ? data.projectDesc : '';
  data.rate = !isEmpty(data.rate) ? data.rate : '';

  if (Validator.isEmpty(data.projectName)) {
    errors.projectName = 'Project Name is required';
  }

  if (Validator.isEmpty(data.projectDesc)) {
    errors.projectDesc = 'Project Description is required';
  }

  if (Validator.isEmpty(data.rate)) {
    errors.rate = 'Project rate is required';
  }

  if (!Validator.isNumeric(data.rate)) {
    errors.rate = 'Rate input is not a number';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
