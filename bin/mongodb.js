var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/DN2022LP",
  { useNewUrlParser: true },
  function (error) {
    if (error) {
      throw error;
    } else {
    }
  }
);
module.exports = mongoose;
