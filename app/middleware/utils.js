/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
exports.buildErrObject = (code, message) => {
  return {
    code,
    message,
  };
};

exports.removeExtensionFromFile = (file) => {
  return file.split(".").slice(0, -1).join(".").toString();
};
