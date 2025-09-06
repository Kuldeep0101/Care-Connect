const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select:false  //dont return passord in json response
    },
    role: {
      type: String,
      enum: ["doctor", "patient"],
      required: true,
    },

    //Doctor specific fields

    speciality: {
      type: String,
      required: function () {
        return this.role === "doctor";
      },
    },
    experience: {
      type: String,
      required: function () {
        return this.role === "doctor";
      },
    },
    location: {
      type: String,
      required: function () {
        return this.role === "doctor";
      },
    },
    timing: {
      type: [String],
      required: function () {
        return this.role === "doctor";
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
