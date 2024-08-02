const ownerModel = require('../models/owner-model');
const hashPassword = require('../utils/hash-password');
const generateToken = require('../utils/generate-token');
const bcrypt = require('bcrypt');

const loginOwner = async (req, res) => {
  const { email, password } = req.body;
  try {
    const owner = await ownerModel.findOne({ email });
    if (!owner) {
      return res.status(401).json({ message: 'Wrong Email or Password' });
    }

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong Email or Password' });
    }

    const token = await generateToken({ _id: owner._id });
    res.cookie('owner', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.redirect('/owners/');
  } catch (error) {
    res.status(500).send(`Error logging in: ${error.message}`);
  }
};

const createOwner = async (req, res) => {
  try {
    const existingOwners = await ownerModel.find();
    if (existingOwners.length > 0) {
      return res.status(503).send('Owner already exists');
    }

    const { fullname, email, password, contact } = req.body;
    const hashedPassword = await hashPassword(password);
    const owner = await ownerModel.create({ fullname, email, password: hashedPassword, contact });
    const token = await generateToken({ _id: owner._id });

    res.cookie('owner', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    res.redirect('/owners/admin');
  } catch (error) {
    res.status(500).send(`Error creating owner: ${error.message}`);
  }
};

module.exports = { loginOwner, createOwner };
