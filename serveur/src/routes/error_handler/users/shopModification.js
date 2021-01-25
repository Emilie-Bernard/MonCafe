const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.shop = !isEmpty(data.shop) ? data.shop : "";
    data.id = !isEmpty(data.id) ? data.id : "";

    if (Validator.isEmpty(data.shop)) {
        errors.email = "Shop field is required";
    } else if (!Validator.isMongoId(data.shop)) {
        errors.email = "Shop is invalid";
    }
    if (Validator.isEmpty(data.id)) {
        errors.id = "Id field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};