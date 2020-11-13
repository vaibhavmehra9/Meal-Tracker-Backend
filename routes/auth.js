const authController = require("../controllers/authController");
const userController = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", authController.signUpUser);
router.get("/login", userController.logInUser);

module.exports = router;
