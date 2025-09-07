const z = require("zod");

const signupSchema = z.object({
  name: z.string().min(4, { error: "first Name must be 4 charachters long" }),
  email: z.email("Invalid Email"),
  password: z.string().min(6, "Password too short"),
  role: z.enum(["patient", "doctor"], { message: "invalid role" }),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password too Short"),
});

module.exports = { signupSchema, loginSchema };
