const Appointment = require("../models/appointment");
const User = require("../models/user");
const { enqueueNotification } = require("../services/notificationQueue");


//Book Appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorID, date_time, notes } = req.body;
    if (!doctorID || !date_time) {
      return res.status(403).json({
        message: "doctorID and date_time are required",
      });
    }
    const { id, role } = req.user;
    const userName = await User.findById(id);
    if (role !== "patient") {
      return res.status(403).json({
        message: "Only patients are allowed to book appointments",
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
      notes: notes,
    });

    const conformation = await appointment.save();


    await enqueueNotification({
      toUserID: doctor._id,
      type: "Appointment",
      message: `You have new Appointment of Patient: ${userName.name}, Appointment Date: ${date_time}, 
      Notes: ${notes}`,
      subject: "New Appointment",
      mobileNumber: "",
    });

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

//See all Appointments
const getUserAppointments = async (req, res) => {
  try {
    const { id, role } = req.user;

    const allAppointments = await Appointment.find({
      $or: [{ patientID: id }, { doctorID: id }],
    });
    if (!allAppointments || allAppointments === null) {
      return res.status(404).json({
        message: "No Appointment found",
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

//Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id, role } = req.user;
    const { status, notes } = req.body;
    const appointmentID = req.params.id;
    const doctor = await User.findById(id);
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

    const patientMobileNum = await User.findById(updateStatus.patientID);

    await enqueueNotification({
      toUserID: updateStatus.patientID,
      type: "Appointment",
      message: `Your Appointment status has been updated to: ${status}, by ${doctor.name}, 
      Notes: ${notes}`,
      subject: "Appointment Update",
      mobileNumber: patientMobileNum.mobileNumber,
    });

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
