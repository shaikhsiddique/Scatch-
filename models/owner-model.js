const mongoose = require("mongoose");
const Joi = require('joi');

const ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }],
    default: [],
  },
  contact: {
    type: Number,
    required: true,
  },
  picture: String,
  gstin: String,
});

module.exports = mongoose.model("Owner", ownerSchema);
