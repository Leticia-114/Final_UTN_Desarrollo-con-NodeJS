const productsModel = require("../models/productsModels");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      let queryFind = {};
      if (req.query.query) {
        queryFind = {
          name: { $regex: ".*" + req.query.query + ".*", $options: "i" },
        };
      }
      if (req.query.featured) {
        queryFind = {
          featuredProduct: { $eq: req.query.featured },
        };
      }
      const documents = await productsModel
        .find(queryFind)
        .populate("category");
      res.status(200).json(documents);
    } catch (e) {
      next(e);
    }
  },
  getById: async function (req, res, next) {
    try {
      const document = await productsModel.findById(req.params.id);
      res.json(document);
    } catch (e) {
      next(e);
    }
  },
  create: async function (req, res, next) {
    try {
      const producto = new productsModel({
        name: req.body.name,
        price: req.body.price,
        code: req.body.code,
        description: req.body.description,
        category: req.body.category,
        featuredProduct: req.body.featuredProduct,
      });
      const document = await producto.save();
      res.status(201).json(document);
    } catch (e) {
      next(e);
    }
  },
  update: async function (req, res, next) {
    try {
      const document = await productsModel.updateOne(
        { _id: req.params.id },
        req.body
      );
      res.json(document);
    } catch (e) {
      next(e);
    }
  },
  delete: async function (req, res, next) {
    try {
      const document = await productsModel.deleteOne({ _id: req.params.id });
      res.json(document);
    } catch (e) {
      next(e);
    }
  },
};
