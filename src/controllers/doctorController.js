const User = require("../models/user");

const getProfile = async (req, res) => {
  try {
    const toDoctorID = req.params.id;
    const docDetails = await User.findById(toDoctorID);
    if (!docDetails || docDetails.role !== "doctor") {
      return res.status(404).json({
        message: "Invalid Doctor",
      });
    } else {
      return res.status(200).json({
        data: docDetails,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

//PATCH
const updateProfile = async (req, res) => {
  try {
    const data = req.body;
    const docID = req.params.id;

    const findDoc = await User.findById(docID);

    if (!findDoc) {
      return res.status(403).json({
        message: "No Doctors Found!!",
      });
    }
    if (findDoc.role !== "doctor") {
      return res.status(403).json({
        message: "Only Doctors Allowed !!",
      });
    }

    const updateDetails = await User.findByIdAndUpdate(docID, data, {
      runValidators: true,
      new: true,
    });

    if (!updateDetails) {
      return res.status(403).json({
        message: "No Doctors Found!!",
      });
    }

    return res.status(200).json({
      message: "Profile Updated",
      data: updateDetails,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

//GET
const searchProfile = async (req, res) => {
  try {
    const { speciality, experience, location, timing } = req.query;
    const query = { role: "doctor" };
    if (speciality) {
      query.speciality = speciality;
    }
    if (experience) {
      query.experience = experience;
    }
    if (location) {
      query.location = location;
    }
    if (timing) {
      query.timing = timing;
    }

    console.log(query);
    const findDoctorbyDetails = await User.find(query);
    if (findDoctorbyDetails.length === 0) {
      return res.status(404).json({
        message: "No doctors found to your query!!",
      });
    } else {
      return res.status(200).json({
        message: "Doctor found to your query",
        data: findDoctorbyDetails,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};
module.exports = { getProfile, updateProfile, searchProfile };
