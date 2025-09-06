const z = require("zod");

const userSchema = z.object({
  name: z.string().min(4, { error: "first Name must be 4 charachters long" }),
  email: z.email(),
  password: z.string().min(6, { error: "password must be 6 charechters long" }),
  role: z.enum(["patient", "doctor"]),
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})
