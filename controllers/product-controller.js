let { productModel, validateProductModel } = require("../models/product-model");
const ownerModel = require("../models/owner-model");
const reduceImageSize = require("../utils/reduceImageSize");
const colorToRbg = require("../utils/colorToRbg");

const createProduct = async (req, res) => {
  try {
    // Ensure req.owner is set
    if (!req.owner) {
      return res.status(403).json({ error: "Owner information is required" });
    }

    // Process image with Sharp
    let imageBuffer = req.file.buffer;
    if (imageBuffer) {
      imageBuffer = await reduceImageSize(imageBuffer);
    }

    // Convert colors to RGB
    const bgcolorRgb = colorToRbg(req.body.bgcolor);
    const panelcolorRgb = colorToRbg(req.body.panelcolor);
    const textcolorRgb = colorToRbg(req.body.textcolor);

    console.log("Converted Colors:", bgcolorRgb, panelcolorRgb, textcolorRgb);

    // Create product data object
    const productData = {
      image: imageBuffer,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      bgcolor: bgcolorRgb,
      panelcolor: panelcolorRgb,
      textcolor: textcolorRgb,
      owner: req.owner._id,
    };

    // Validate product data
    const { error } = validateProductModel(productData);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if owner exists
    const owner = await ownerModel.findById(req.owner._id);
    if (!owner) {
      return res.status(403).json({ error: "Owner not found" });
    }

    // Create and save the new product
    const newProduct = new productModel(productData);
    owner.products.push(newProduct._id);
    await owner.save();
    await newProduct.save();

    res.redirect("/owners");
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: err.message });
  }
};

const showEditPage = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (product.owner.toString() !== req.owner._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this product" });
    }
    const success = req.flash("success");
    res.render("editproducts.ejs", { product, success });
  } catch (err) {
    console.error("Error showing edit page:", err);
    res.status(500).json({ error: err.message });
  }
};

const editProduct = async (req, res) => {
  try {
    let product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const bgcolorRgb = colorToRbg(req.body.bgcolor);
    const panelcolorRgb = colorToRbg(req.body.panelcolor);
    const textcolorRgb = colorToRbg(req.body.textcolor);

    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      bgcolor: bgcolorRgb,
      panelcolor: panelcolorRgb,
      textcolor: textcolorRgb,
    };

    // Validate product data
    const { error } = validateProductModel({
      ...productData,
      image: product.image,
      owner: product.owner,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Update product fields
    product.set(productData);

    // Check if a new image was uploaded
    if (req.file) {
      product.image = await reduceImageSize(req.file.buffer);
    }

    // Save the updated product
    await product.save();

    res.redirect("/owners");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    // Find and delete the product
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Find the owner
    const owner = await ownerModel.findById(req.owner._id);
    if (!owner) {
      return res.status(404).send("Owner not found");
    }

    // Remove the product from the owner's product list
    const productIndex = owner.products.indexOf(product._id);
    if (productIndex > -1) {
      owner.products.splice(productIndex, 1);
      await owner.save();
    }

    // Redirect to the admin page
    res.redirect("/owners");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    const result = await productModel.deleteMany({});
    res.redirect("/owners");
  } catch (error) {
    console.error("Error deleting products:", error);
  }
};

module.exports = {
  createProduct,
  editProduct,
  showEditPage,
  deleteProduct,
  deleteAllProducts,
};
