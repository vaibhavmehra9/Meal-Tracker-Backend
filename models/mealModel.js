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
    type: Date,
    required: true,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Meal = mongoose.model("Meal", mealSchema);

module.exports = Meal;
