const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./Product");
const User = require("./User");
var ObjectId = mongoose.SchemaTypes.ObjectId;

// Create Schema
const CommandSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    ready_date: {
        type: Date,
    },
    finish_date: {
        type: Date,
    },
    products: {
        type: [{ type: ObjectId, ref: Product }], // store where the product are available
    },
    user: {
        type: ObjectId, ref: User, // store where the product are available
    },
    status: String, // Progress, Ready, Finished
    total: Number,
});
module.exports = Command = mongoose.model("commands", CommandSchema);