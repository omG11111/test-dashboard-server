const db = require("../middleware/db");
const statics = require("../models/statics");

handleError = (res, err) => {
  res.status(err.code).json({
    errors: {
      msg: err.message,
    },
    code: err.code,
  });
};

exports.managedata = async (req, res) => {
  try {
    const data = req.query;
    const item = await db.managedata(statics, data);
    res.send(item);
  } catch (error) {
    handleError(res, error);
  }
};
exports.getLists = async (req, res) => {
  try {
    const data = req.query;
    const item = await db.getLists(statics, data);
    res.status(200).json(item);
  } catch (error) {
    handleError(res, error);
  }
};
