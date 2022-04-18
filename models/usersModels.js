const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");
const bcrypt = require("bcrypt");
const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  email: {
    type: String,
    unique: true,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  password: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  rol: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
usersSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
module.exports = mongoose.model("users", usersSchema);
