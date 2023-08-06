const router = require("express").Router();
const Model = require("../model/profiles.model");
const Handler = require("../handler/profile.handler");

router.post("/", Handler.profilesubmit(Model));
router.get("/:id", Handler.getProfiles(Model));

module.exports = router;