const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
  /*store: {
    type: Store, // favorite store of the user
  },*/
  /*favoris: {
    type: Favoris.id, // list of favorites products
    required: true
  },*/
});
module.exports = User = mongoose.model("users", UserSchema);