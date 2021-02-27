const Validator = require("validator");
const isEmpty = require("is-empty");

// type: String, // Drink, Sandwiches, Dessert

module.exports = function validateModifyInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.status = !isEmpty(data.status) ? data.status : "";

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