const express = require("express");
const verifyRoute = require("../middleware/authMiddleware");
const {
    getProfile,
    updateProfile,
    searchProfile,
} = require("../controllers/doctorController");
const doctorRoutes = express.Router();

doctorRoutes.get("/doctors/:id", verifyRoute, getProfile);
doctorRoutes.patch("/doctors/:id", verifyRoute, updateProfile);
doctorRoutes.get("/doctors", verifyRoute, searchProfile);

module.exports = doctorRoutes;