const {
  getAllUserMeals,
  addUserMeal,
  deleteUserMeal,
  updateMeal,
} = require("../controllers/userController");
const { checkIfUserAuthenticated } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/:userId/meals", checkIfUserAuthenticated, getAllUserMeals);
router.post("/:userId/meals", checkIfUserAuthenticated, addUserMeal);

router.delete(
  "/:userId/meals/:mealId",
  checkIfUserAuthenticated,
  deleteUserMeal
);

router.put("/:userId/meals/:mealId", checkIfUserAuthenticated, updateMeal);

module.exports = router;
