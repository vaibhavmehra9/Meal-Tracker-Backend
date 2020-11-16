const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 *
 * @param {*} req
 * @param {*} res
 * @method POST
 * @description Controller for creating a new user
 */
module.exports.signUpUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        status: "fail",
        message: "You already have an account with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ status: "success", data: { user: newUser } });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "Internal server error" });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @method GET
 * @description Controller for log in user
 */
module.exports.logInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email: email });

    if (!isUserExist) {
      return res.status(400).json({
        status: "fail",
        message: "No user found with this email, please sign up",
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({
        status: "fail",
        message: "Email or Password is wrong !",
      });
    }

    const token = jwt.sign({ data: isUserExist._id }, "programming", {
      expiresIn: "5h",
    });

    await User.findByIdAndUpdate(
      isUserExist._id,
      { token },
      {
        runValidators: true,
      }
    );

    return res.status(200).json({ status: "success", data: { token } });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "Internal server error" });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @method GET
 * @description Controller for get details of logged in user
 */

module.exports.getLoggedInUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .select("-token");
    return res.status(200).json({ status: "success", data: { user } });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "Internal server error" });
  }
};

module.exports.logOutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { token: "" },
      {
        runValidators: true,
      }
    );
    return res
      .status(204)
      .json({ status: "success", message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "Internal server error" });
  }
};
