const router = require("express").Router();
const Model = require("../model/user.model");
const Handler = require("../handler/user.handler");

router.post("/", Handler.login(Model));
router.post("/otpcheck", Handler.otpcheck(Model));

module.exports = router;
