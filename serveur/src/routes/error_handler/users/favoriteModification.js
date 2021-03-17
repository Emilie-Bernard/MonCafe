const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateFavoriteModification(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.product = !isEmpty(data.product) ? data.product : "";
    data.id = !isEmpty(data.id) ? data.id : "";

    if (Validator.isEmpty(data.product)) {
        errors.product = "Shop field is required";
    } else if (!Validator.isMongoId(data.product)) {
        errors.product = "Shop is invalid";
    }
    if (Validator.isEmpty(data.id)) {
        errors.id = "Id field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};