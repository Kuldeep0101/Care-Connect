const Appointment = require("../models/appointment");
const User = require("../models/user");

const bookAppointment = async (req, res) => {
  try {
    const { doctorID, date_time } = req.body;
    if (!doctorID || !date_time) {
      return res.status(403).json({
        message: "doctorID and date_time are required",
      });
    }
    const { id, role } = req.user;
    if (role !== "patient") {
      return res.status(403).json({
        message: "Only patients are permitted",
      });
    }

    const doctor = await User.findOne({ _id: doctorID, role: "doctor" });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor Not Found!!",
      });
    }

    const checkDateTimeStatus = await Appointment.findOne({
      doctorID: doctorID,
      date_time: new Date(date_time),
      status: { $in: ["booked", "accepted"] },
    });

    if (checkDateTimeStatus) {
      return res.status(409).json({
        message: "Appointment Slot Already Booked",
      });
    }

    const appointment = new Appointment({
      patientID: id,
      doctorID: doctorID,
      date_time: date_time,
      status: "booked",
      notes: "Patient has high fever since 2 days, need immidiate action",
    });

    const conformation = await appointment.save();
    return res.status(200).json({
      message: "Appointment Booked Successfully!!",
      data: conformation,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getUserAppointments = async (req, res) => {
  try {
    const { id, role } = req.user;
    if (role !== "patient") {
      return res.status(403).json({
        message: "Only patients can access",
      });
    }
    const allAppointments = await Appointment.find({ patientID: id });
    if (!allAppointments || allAppointments === null) {
      return res.status(404).json({
        message: "No Appointment for logged-in user",
      });
    }
    return res.status(200).json({
      message: "All Appointments",
      data: allAppointments,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id, role } = req.user;
    const { status, notes } = req.body;
    const appointmentID = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required in the request body.",
      });
    }

    if (role !== "doctor") {
      return res.status(403).json({
        message: "Only Doctors can update the status",
      });
    }

    const updateStatus = await Appointment.findByIdAndUpdate(
      appointmentID,
      {
        status: status,
        notes: notes,
      },
      {
        new: true,
      }
    );
    console.log(updateStatus);

    if (!updateStatus) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    return res.status(200).json({
      message: "Status Updated Successfully",
      data: updateStatus,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookAppointment,
  getUserAppointments,
  updateAppointmentStatus,
};
