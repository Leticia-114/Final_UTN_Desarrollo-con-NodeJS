var express = require("express");
const usersController = require("../controllers/usersController");
var router = express.Router();

router.post("/", usersController.create);
router.post("/auth", usersController.login);
module.exports = router;
