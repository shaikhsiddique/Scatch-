const { userModel, validateUserModel } = require("../models/user-model");
const hashPassword = require("../utils/hash-password");
const generateToken = require("../utils/generate-token");
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

module.exports = { userRegister_controller, userLogin_controller };
