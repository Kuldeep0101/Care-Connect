const express = require("express");

const { userSignup, userLogin } = require("../src/controllers/authControllers");



const authRouter = express();

//************ Signup ********/

authRouter.post("/signup", async (req, res) => {
  userSignup(req, res);
});

//*********** Login ********/

authRouter.post("/login", async (req, res) => {
  userLogin(req, res);
});

module.exports = authRouter;
