const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Shop = require("./Shop");
var ObjectId = mongoose.SchemaTypes.ObjectId;

// Create Schema
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    shops: {
        type: [{ type: ObjectId, ref: Shop }], // store where the product are available
    },
    type: String, // Drink, Sandwiches, Dessert
    image: String,
    price: Number,
    rating: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Number,
        default: 0,
    },
});
module.exports = Product = mongoose.model("products", ProductSchema);