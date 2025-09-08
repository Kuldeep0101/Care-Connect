const jwt = require("jsonwebtoken");
require("dotenv").config();
const SecretKey = process.env.SecretKey;

const verifyRoute = async (req, res, next) => {
  const token = req.cookies.jwtToken;

  const verifyToken = await jwt.verify(token, SecretKey);
  if (!verifyToken) {
    return res.status.json({
      message: "Please login before proceeding",
    });
  } else {
    req.user = verifyToken;
  }
  next();
};

module.exports = verifyRoute;
