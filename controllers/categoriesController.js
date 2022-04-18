const productsModel = require("../models/categoriesModel");
module.exports = {
  getAll: async function (req, res, next) {
    try {
      let queryFind = {};
      if (req.query.query) {
        queryFind = {
          name: { $regex: ".*" + req.query.query + ".*", $options: "i" },
        };
      }
      const documents = await productsModel.find(queryFind);
      res.status(200).json(documents);
    } catch (e) {
      next(e);
    }
  },

  create: async function (req, res, next) {
    try {
      const document = new productsModel({
        name: req.body.name,
      });
      const response = await document.save();
      res.json(response);
    } catch (e) {
      next(e);
    }
  },
};
