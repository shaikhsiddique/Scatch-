const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  image: {
    type: Buffer,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  bgcolor: {
    type: String,
    required: true,
  },
  panelcolor: {
    type: String,
    required: true,
  },
  textcolor: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
  },
  date: {
    type: Date,
    default: Date.now
  }
  
});

const validateProductModel = (data) => {
  const schema = Joi.object({
    image: Joi.binary().required(),  // Ensure consistency in data type
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(0).required(),
    discount: Joi.number().min(0).max(100),  
    bgcolor: Joi.string().required(),
    panelcolor: Joi.string().required(),
    textcolor: Joi.string().required(),
    owner: Joi.required(),  
  });

  return schema.validate(data);
};

const productModel = mongoose.model("Product", productSchema);

module.exports = { productModel, validateProductModel };
