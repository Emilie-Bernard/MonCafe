const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAddInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.latitude = !isEmpty(data.latitude) ? data.latitude : "";
    data.longitude = !isEmpty(data.longitude) ? data.longitude : "";
    // Title checks
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }
    // Latitude checks
    if (Validator.isEmpty(data.latitude)) {
        errors.latitude = "Latitude field is required";
    } else if (!Validator.isDecimal(data.latitude)) {
        errors.latitude = "Latitude must be decimal";
    }
    // Longitude checks
    if (Validator.isEmpty(data.longitude)) {
        errors.longitude = "Longitude field is required";
    } else if (!Validator.isDecimal(data.longitude)) {
        errors.longitude = "Longitude must be decimal";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};