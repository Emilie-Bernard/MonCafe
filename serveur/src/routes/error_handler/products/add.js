const Validator = require("validator");
const isEmpty = require("is-empty");

// type: String, // Drink, Sandwiches, Dessert

module.exports = function validateAddInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.shops = !isEmpty(data.shops) ? data.shops : "";
    data.type = !isEmpty(data.type) ? data.type : "";
    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    if (Validator.isEmpty(data.shops)) {
        errors.shops = "Shop field is required";
    } else if (!Validator.isMongoId(data.shops)) {
        errors.shops = "Shop is invalid";
    }

    if (Validator.isEmpty(data.type)) {
        errors.type = "Type of product field is required : Drink, Salty or Sweet";
    }
    if (data.type != "Drink" && data.type != "Salty" && data.type != "Sweet") {
        errors.type = "Type of product field is wrong, you must enter : Drink, Salty or Sweet";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};