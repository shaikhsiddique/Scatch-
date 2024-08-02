const express = require('express');
const { createProduct, editProduct, showEditPage, deleteProduct,deleteAllProducts }= require('../controllers/product-controller');
const isOwnerIn = require('../middleware/isOwnerIn');
const router = express.Router();
const upload = require('../utils/multer');
const { productModel, validateProductModel } = require('../models/product-model');


router.post('/create',isOwnerIn, upload.single('image'), async (req, res) => {
    createProduct(req,res);
});

router.get('/edit/:id',isOwnerIn, upload.single('image'), async (req, res) => {
    showEditPage(req,res);
})

router.post('/edit/:id', isOwnerIn, upload.single('image'), async (req, res) => {
    editProduct(req,res);
});

router.get('/delete/:id', isOwnerIn, async (req, res) => {
    deleteProduct(req,res);
});

router.get('/delete',isOwnerIn, async (req,res)=>{
  deleteAllProducts(req,res);
})
module.exports = router;