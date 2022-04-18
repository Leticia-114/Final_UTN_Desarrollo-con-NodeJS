var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "NodeJS & MongoDB - L.P." });
});
module.exports = router;
