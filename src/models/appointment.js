const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctorID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date_time: {
    name: String,
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["booked", "cancelled", "rescheduled", "done"],
    required: true,
  },
  notes: {
    type: String,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
