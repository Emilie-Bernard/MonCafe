const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Shop = require("./Shop");
const Product = require("./Product");
var ObjectId = mongoose.SchemaTypes.ObjectId;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  points: {
    type: Number,
    default: 10
  },
  /*connected: {
    type: String, // Mail, Google or Facebook ?
    required: true
  },*/
  facebookId: {
    type: String,
  },
  googleid: {
    type: String,
  },
  shops: {
    type: [{ type: ObjectId, ref: Shop }], // favorite store of the user
  },
  favorites: {
    type: [{ type: ObjectId, ref: Product }], // list of favorites products
    required: true
  },
});
module.exports = User = mongoose.model("users", UserSchema);