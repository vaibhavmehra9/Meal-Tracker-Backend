const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    return res.status(201).json({ status: "success", data: { user: newUser } });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "Internal server error" });
  }
};

module.exports.logInUser = (req, res) => {};
