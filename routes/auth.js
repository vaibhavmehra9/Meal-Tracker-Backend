const {
  signUpUser,
  logInUser,
  getLoggedInUserInfo,
  logOutUser,
} = require("../controllers/authController");
const { checkIfUserAuthenticated } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/signup", signUpUser);
router.post("/login", logInUser);
router.get("/me", checkIfUserAuthenticated, getLoggedInUserInfo);
router.get("/logout", checkIfUserAuthenticated, logOutUser);

module.exports = router;
