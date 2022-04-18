const usersModel = require("../models/usersModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  create: async function (req, res, next) {
    try {
      const user = new usersModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const document = await user.save();
      res.status(201).json(document);
    } catch (e) {
      next(e);
    }
  },
  login: async function (req, res, next) {
    try {
      const user = await usersModel.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Wrong email./Email incorrecto." });
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = { userId: user._id };
        const token = jwt.sign(payload, req.app.get("secretKey"), {
          expiresIn: "2h",
        });
        return res.status(200).json({ token });
      } else {
        return res
          .status(401)
          .json({ message: "Wrong password./Contraseña incorrecta." });
      }
    } catch (e) {
      next(e);
    }
  },
};
