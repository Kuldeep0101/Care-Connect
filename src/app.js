const express = require("express");
const app = express();

const connectToDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

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

app.post("/test", async (req, res) => {
  try {
    const data  = req.body;
    const newUser =  new User(data);
    const newInstance =await newUser.save();
    res.json(newInstance);
  } catch (error) {
    res.json(`${error}`);
  }
});
