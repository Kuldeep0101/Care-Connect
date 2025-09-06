const express = require("express");

const {
  userSignup,
  userLogin,
  userLogout,
} = require("../src/controllers/authControllers");

const authRouter = express();

//************ Signup ********/

authRouter.post("/signup", async (req, res) => {
  userSignup(req, res);
});

//*********** Login ********/

authRouter.post("/login", async (req, res) => {
  userLogin(req, res);
});

//*********** Logout ********/

authRouter.post("/logout", async (req, res) => {
  userLogout(req, res);
});


module.exports = authRouter;
