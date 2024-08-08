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

const showShop = async (req,res)=>{
  try {
    const products = await productModel.find();
    res.render("shop.ejs", { products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

module.exports = {addToCart ,showCart , showShop};