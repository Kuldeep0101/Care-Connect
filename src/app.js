const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const connectToDB = require("./config/database");

app.use(express.json());
app.use(cookieParser());

require("dotenv").config();
const PORT = process.env.PORT || 9000;

connectToDB()
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
  })
  .catch((error) =>
    console.log(`Error While Connecting to Database ${error.message} `)
  );

const authRouter = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRouter = require("./routes/appointmentRoutes");

app.use("/", authRouter);
app.use("/", doctorRoutes);
app.use('/', appointmentRouter)


app.use((err, req, res, next) => {
  console.error(err.stack); // Log for debugging
  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Internal Server Error" });
});
