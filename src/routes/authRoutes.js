const express = require("express");
const validate = require('../middleware/validate')
const {
  signupController,
  loginController,
  userLogout,
} = require("../controllers/authControllers");
const { signupSchema, loginSchema } = require("../schema/authSchema");

const authRouter = express.Router();

//************ Signup ********/

authRouter.post("/signup", validate(signupSchema), signupController);

//*********** Login ********/

authRouter.post("/login", validate(loginSchema), loginController);

//*********** Logout ********/

authRouter.post("/logout", userLogout);

module.exports = authRouter;
