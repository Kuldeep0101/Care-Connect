const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const SecretKey = process.env.SecretKey;

const userSignup = async (req, res) => {
  try {
    const { name, email, password, role, ...extraFields } = req.body;

    if (role === "patient" && Object.keys(extraFields).length > 0) {
      return res
        .status(400)
        .json({ message: "Patient can't have Doctors details" });
    }

    const isDuplicateEmail = await User.findOne({ email });
    if (isDuplicateEmail) {
      return res.status(500).json({
        message: "Duplicate Email-ID are not ALLOWED!!",
      });
    }
    const newUser = new User({
      name,
      email,
      password, //password hashed in schema level
      role,
      ...extraFields,
    });

    const newUserInstance = await newUser.save();
    return res.status(200).json({
      message: `${role} Signup successfull, please log-in`,
      data: newUserInstance,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email }).select("+password");
    if (!findUser) {
      return res.status(404).json({
        message: "No user found with the emailID",
      });
    }
    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      return res.status(404).json({
        message: "Password did not match, please try again",
      });
    }

    const generateJWT = await jwt.sign({ id: findUser._id }, SecretKey, {
      expiresIn: "2d",
    });
    res.cookie("jwtToken", generateJWT, {
      maxAge: 48 * 60 * 60 * 1000, //expire in 48 hour
    });

    return res.status(200).json({
      message: `${findUser.name} has logged in!!`,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { userSignup, userLogin };
