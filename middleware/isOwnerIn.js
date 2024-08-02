const jwt = require('jsonwebtoken');
const ownerModel = require('../models/owner-model');

const isOwnerIn = async (req, res, next) => {
  try {
    const token = req.cookies.owner; 
    if (!token) {
      req.flash("error", "You need to log in first");
      return res.redirect('/owners/login');
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const owner = await ownerModel.findById(decoded._id).select('-password'); 
    if (!owner) {
      req.flash("error", "Authentication failed. User not found.");
      return res.redirect('/owners/login');
    }

    req.owner = owner; 
    next();
  } catch (error) {
    console.error(error);
    req.flash("error", "Invalid token. Authentication failed.");
    return res.redirect('/owners/login');
  }
};

module.exports = isOwnerIn;
