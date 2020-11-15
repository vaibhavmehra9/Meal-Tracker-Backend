const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  mealName: {
    type: String,
    required: true,
    trim: true,
  },
  calorieCount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
