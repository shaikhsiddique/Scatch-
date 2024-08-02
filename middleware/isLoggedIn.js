const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user-model');
require('dotenv').config();

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      req.flash("error", "You need to log in first");
      return res.redirect('/');
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await userModel.findById(decoded.id).select('-password');
    if (!user) {
      req.flash("error", "Authentication failed. User not found.");
      return res.redirect('/');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    req.flash("error", "Invalid token. Authentication failed.");
    return res.redirect('/');
  }
};

module.exports = isLoggedIn;
