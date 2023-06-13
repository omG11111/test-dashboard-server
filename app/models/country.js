const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const validator = require("validator");
const mongoosePaginate = require("mongoose-paginate-v2");

const Country = new mongoose.Schema({
  name: String,
  mySet: {
    type: [String],
    default: [],
  },
});
module.exports = new mongoose.model("Country", Country);
