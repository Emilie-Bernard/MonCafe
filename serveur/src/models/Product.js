const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
    size: String, // Big Medium Small
    temperature: String, // Hot, warm, cold
    image: String,
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