const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.checkIfUserAuthenticated = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(401).json({ status: "fail", message: "unauthorized" });
  }

  const [authorizationHeader, authorizationToken] = authorization.split(" ");

  if (authorizationHeader !== "Bearer") {
    return res.status(401).json({ status: "fail", message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(authorizationToken, "programming");

    const user = await User.findOne({
      _id: decoded.data,
      token: authorizationToken,
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: "fail", message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ status: "fail", message: "unauthorized" });
  }
};
