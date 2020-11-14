const authController = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", authController.signUpUser);
router.get("/login", authController.logInUser);
router.get("/me", authController.getLoggedInUserInfo);

module.exports = router;
