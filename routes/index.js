const express = require("express");
const isLoggedIn = require("../middleware/isLoggedin");
const { productModel } = require("../models/product-model");
const { showShop } = require("../controllers/user-controller");
const router = express.Router();


router.get("/", async (req, res) => {
  const error = req.flash("error") || []; // Provide a default empty array if there are no error messages
  res.render("index.ejs", { error });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  showShop(req,res);
});

router.get("/logout", (req, res) => {
  res.cookie("token", null);
  res.cookie('owner',null)
  res.redirect("/");
});
module.exports = router;
