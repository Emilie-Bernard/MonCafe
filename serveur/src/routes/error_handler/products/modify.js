const Validator = require("validator");
const isEmpty = require("is-empty");

// type: String, // Drink, Sandwiches, Dessert

module.exports = function validateModifyInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.shops = !isEmpty(data.shops) ? data.shops : "";
    data.type = !isEmpty(data.type) ? data.type : "";

    if (!Validator.isEmpty(data.shops) && !Validator.isMongoId(data.shops)) {
        errors.shops = "Shop field is required";
    }

    if (!Validator.isEmpty(data.type) && (data.type != "Drink" && data.type != "Salty" && data.type != "Sweet")) {
        errors.type = "Type of product field is wrong, you must enter : Drink, Salty or Sweet";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};