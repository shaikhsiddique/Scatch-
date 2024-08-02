const express = require("express");
const isLoggedIn = require("../middleware/isLoggedin");
const { productModel } = require("../models/product-model");
const router = express.Router();

router.get("/", async (req, res) => {
  const error = req.flash("error") || []; // Provide a default empty array if there are no error messages
  res.render("index.ejs", { error });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    const products = await productModel.find();
    res.render("shop.ejs", { products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/logout", (req, res) => {
  res.cookie("token", null);
  res.redirect("/");
});
module.exports = router;
