const { buildErrObject } = require("../middleware/utils");
var mongoose = require("mongoose");

module.exports = {
  /**
   * in case need to get id without requireAuth
   * @param {String} token - binary file with path
   */

  async getUserIdFromToken(token) {
    return new Promise((resolve, reject) => {
      const jwt = require("jsonwebtoken");
      const auth = require("../middleware/auth");
      jwt.verify(
        auth.decrypt(token),
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err) {
            reject(buildErrObject(401, "Unauthorized"));
          }
          resolve(decoded.data);
        }
      );
    });
  },

  /**
   * upload file to server
   * @param {Object} object - binary file with path
   */

  async uploadFile(object) {
    return new Promise((resolve, reject) => {
      var obj = object.file;
      var name = Date.now() + obj.name;
      obj.mv(object.path + "/" + name, function (err) {
        if (err) {
          reject(buildErrObject(422, err.message));
        }
        resolve(name);
      });
    });
  },

  /**
   * capitalize first letter of string
   * @param {string} string
   */

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  /**
   * generate random string
   * @param {string} string
   */

  async customRandomString(
    length,
    chars = "abcdefghijklmnopqrstuvwxyz@1234567890!"
  ) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  },

  /**
   * generate random string
   * @param {string} string
   */

  automatedString() {
    return Math.random().toString(36).slice(2);
  },

  /**
   * convert a given array of string to mongoose ids
   * @param {Array} array
   */

  async convertToObjectIds(array) {
    return array.map((item) => mongoose.Types.ObjectId(item));
  },

  /**
   * convert title to slug
   * @param {String} title
   */
  async createSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  },
};
