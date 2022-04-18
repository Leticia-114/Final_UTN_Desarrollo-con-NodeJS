const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    minLength: [2, errorMessage.GENERAL.minlength],
    maxLength: [200, errorMessage.GENERAL.maxlength],
    lowercase: true,
  },
  price: {
    type: Number,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    min: 0,
  },
  code: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    unique: true,
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "categories",
  },
  featuredProduct: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("products", productSchema);
