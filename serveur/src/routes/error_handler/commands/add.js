const Validator = require("validator");
const isEmpty = require("is-empty");

// type: String, // Drink, Sandwiches, Dessert

module.exports = function validateAddInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.user = !isEmpty(data.user) ? data.user : "";
    data.products = !isEmpty(data.products) ? data.products : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    // Name checks
    if (Validator.isEmpty(data.user)) {
        errors.user = "User field is required";
    } else if (!Validator.isMongoId(data.user)) {
        errors.user = "User is invalid";
    }

    if (Validator.isEmpty(data.products)) {
        errors.products = "Products field is required";
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "Type of product field is required : Progress, Ready, Finish";
    }
    if (data.status != "Progress" && data.status != "Ready" && data.status != "Finish") {
        errors.status = "Status of product field is wrong, you must enter : Progress, Ready or Finish";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};