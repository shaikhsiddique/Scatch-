const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    cart: [{
      type : mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }],
    contact: {
      type: Number,
      required: true,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const validateUserModel = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    contact: Joi.number().required(),
  });
  return schema.validate(data);
};

const userModel = mongoose.model("User", userSchema);

module.exports = { userModel, validateUserModel };
