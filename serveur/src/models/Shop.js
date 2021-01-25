const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ShopSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    image: String,
    coordinate: {
        latitude: Number,
        longitude: Number,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: Number,
        default: 0,
    },
});
module.exports = Shop = mongoose.model("shops", ShopSchema);