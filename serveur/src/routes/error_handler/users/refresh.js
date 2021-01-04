const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateUserInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.id = !isEmpty(data.id) ? data.id : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.familyname = !isEmpty(data.familyname) ? data.familyname : "";
  // Name checks
  if (Validator.isEmpty(data.id)) {
    errors.id = "Id field is required";
  } if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.familyname)) {
    errors.familyname = "Family Name field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};