const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  details: [
    {
      medicine: { type: String, required: true }, // e.g., "Paracetamol"
      dosage: { type: String }, // e.g., "500mg twice a day"
      instructions: { type: String }, // e.g., "After meals"
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
