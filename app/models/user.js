const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const validator = require("validator");
const mongoosePaginate = require("mongoose-paginate-v2");

const Users = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
});
module.exports = new mongoose.model("user", Users);
