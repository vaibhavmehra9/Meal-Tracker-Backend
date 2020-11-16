const User = require("../models/userModel");
const Meal = require("../models/mealModel");

module.exports.getAllUserMeals = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).populate(
      "meals"
    );
    return res
      .status(200)
      .json({ status: "succes", data: { meals: user.meals } });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "Internal server error" });
  }
};

module.exports.addUserMeal = async (req, res) => {
  try {
    const meal = await Meal.create({ ...req.body, createdBy: req.user._id });
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { meals: [meal, ...req.user.meals] },
      {
        runValidators: true,
        new: true,
      }
    );
    return res.status(201).json({ status: "success", data: { meal } });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "Internal server error" });
  }
};

module.exports.deleteUserMeal = async (req, res) => {
  const { userId, mealId } = req.params;
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { meals: { _id: mealId } } },
      {
        runValidators: true,
        new: true,
      }
    );
    await Meal.findOneAndDelete({ _id: mealId });
    return res.status(204).json({ status: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "Internal server error" });
  }
};

module.exports.updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findOneAndUpdate(
      { _id: req.params.mealId },
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    return res.status(200).json({ status: "success", data: { meal } });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "fail", message: "Internal server error" });
  }
};
