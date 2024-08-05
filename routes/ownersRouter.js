const express = require('express');
const router = express.Router();
const { loginOwner, createOwner } = require('../controllers/auth-controller');
const isOwnerIn = require('../middleware/isOwnerIn');
const { productModel } = require('../models/product-model');

router.get('/',isOwnerIn,async(req,res)=>{
  const products = await productModel.find();
  res.render('admin.ejs',{products});
})

router.get('/login', (req, res) => {
  res.render('owner-login.ejs');
});

router.post('/login', loginOwner);

if (process.env.NODE_ENV === "development") {
  router.post('/create', createOwner);
}

router.get('/logout',(req,res)=>{
    res.cookie('owner',null);
    res.redirect('/owners/login');
})

router.get('/admin', isOwnerIn,async (req, res) => {
  const success = req.flash("error");
  res.render('createproducts.ejs',{success});
});



module.exports = router;
