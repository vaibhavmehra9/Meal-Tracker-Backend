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

module.exports.logInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email: email }).exec();

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

    return res
      .status(200)
      .json({ status: "success", data: { user: isUserExist } });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "fail", message: "Internal server error" });
  }
};
