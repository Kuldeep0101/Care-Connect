const {
  z
} = require("zod");

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, {
      message: "Name must have minimum 5 charechters",
    })
    .max(20, {
      message: "Name can't be more than 30 charechters",
    }),
  email: z
    .email({
      message: "invalid email type",
    })
    .max(20, {
      message: "email should be 20 char long",
    }),
  password: z
    .string()
    .trim()
    .min(6, {
      message: "password must be 6 char long",
    })
    .max(20),
  role: z.enum(["patient", "doctor"]),
});

const loginSchema = z.object({
  email: z
    .email({
      message: "invalid email type",
    })
    .max(20, {
      message: "email should be 20 char long",
    }),
  password: z
    .string()
    .trim()
    .min(6, {
      message: "password must be 6 char long",
    })
    .max(20),
});

module.exports = {
  signupSchema,
  loginSchema,
};