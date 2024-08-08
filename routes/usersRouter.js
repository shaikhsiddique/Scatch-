const express = require("express");
const {userRegister_controller,userLogin_controller} = require("../controllers/auth-controller");
const {addToCart ,showCart} = require('../controllers/user-controller');
const isLoggedIn = require('../middleware/isLoggedIn');
const { productModel } = require("../models/product-model");
const router = express.Router();



router.post("/register",  (req, res) => {
  userRegister_controller(req,res);
});

router.post('/login',(req,res)=>{
  userLogin_controller(req,res);
})

router.get('/addcart/:id',isLoggedIn,async (req,res)=>{
  addToCart(req,res);

})

router.get('/cart',isLoggedIn,async (req,res)=>{
  showCart(req,res);
})





module.exports = router;
