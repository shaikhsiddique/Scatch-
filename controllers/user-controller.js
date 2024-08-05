const { userModel } = require("../models/user-model");
const { productModel } = require("../models/product-model");
const isLoggedIn = require("../middleware/isLoggedIn");

const addToCart = async (req, res) => {
  const user = await userModel.findById(req.user._id);
  const product = req.params.id;
  user.cart.push(product);
  await user.save();
  res.redirect("/users/cart");
};

const showCart = async (req, res) => {
  const user = await userModel.findById(req.user._id).populate("cart");
  const products = user.cart;
  res.render("cart.ejs", { products });
};

module.exports = {addToCart ,showCart};