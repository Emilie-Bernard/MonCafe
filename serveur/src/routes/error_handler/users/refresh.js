const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateUserInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.id = !isEmpty(data.id) ? data.id : "";
  // Name checks
  if (Validator.isEmpty(data.id)) {
    errors.id = "Id field is required";
  } else if (!Validator.isMongoId(data.id)) {
    errors.id = "Id field is invalid";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};