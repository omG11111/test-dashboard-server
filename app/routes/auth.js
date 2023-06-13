const controllerAuth = require("../controllers/auth");
const validate = require("../controllers/auth.validate");
const router = require("express").Router();

const trimRequest = require("trim-request");

router.post("/register", trimRequest.all, controllerAuth.register);

router.post("/login", trimRequest.all, controllerAuth.login);

module.exports = router;
