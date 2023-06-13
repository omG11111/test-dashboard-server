const router = require("express").Router();
const trimRequest = require("trim-request");
const controller = require("../controllers/controller");

router.get("/statics/data", trimRequest.all, controller.managedata);

router.get("/getLists", trimRequest.all, controller.getLists);

module.exports = router;
