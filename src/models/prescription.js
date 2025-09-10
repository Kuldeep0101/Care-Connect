const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

const Prescription = mongoose.model("Prescrption", prescriptionSchema);
module.exports = Prescription;
