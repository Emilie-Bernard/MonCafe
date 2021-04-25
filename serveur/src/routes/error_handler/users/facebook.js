const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.facebookId = !isEmpty(data.facebookId) ? data.facebookId : "";
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // facebookId checks
    if (Validator.isEmpty(data.facebookId)) {
        errors.facebookId = "facebookId field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};