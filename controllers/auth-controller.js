const { userModel, validateUserModel } = require("../models/user-model");
const hashPassword = require("../utils/hash-password");
const generateToken = require("../utils/generate-token");
const ownerModel = require('../models/owner-model');
const bcrypt = require("bcrypt");

const userRegister_controller = async (req, res) => {
  try {
    let { fullname, email, password, contact } = req.body;

    let { error } = validateUserModel({ fullname, email, password, contact });
    if (error) {
      return res.status(400).send(error.message);
    }
    let user = await userModel.findOne({email});

    if (user){
      return res.status(400).send("User already registered");
    }

    let hashedPassword = await hashPassword(password);

     user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      contact,
    });

    const token = generateToken({ id: user._id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.redirect('/shop');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const userLogin_controller = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");

    let validePassword = bcrypt.compare(password, user.password);

    if (!validePassword) {
      return res.status(400).send("Invalid email or password");
    }

    const token = generateToken({ id: user._id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.redirect('/shop');
  } catch (error) {
    res.status(400).json(error.message);
  }
};

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

module.exports = { userRegister_controller, userLogin_controller ,loginOwner, createOwner };
