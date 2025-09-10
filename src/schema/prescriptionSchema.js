const {
  default: mongoose
} = require("mongoose");
const {
  z,
  array
} = require("zod");

const prescriptionSchema = z.object({
  prescription: z.array(
    z.object({
      medicine: z.string().min(1, "Medicine name is required"),
      dosage: z.string().optional(),
      instructions: z.string().optional(),
    })
  ).min(1, "At least one medicine is required"),

  appointmentId: z.string().refine(mongoose.Types.ObjectId.isValid, {
    message: "Invalid Appointment ID",
  }),
});

const updatePrescriptionSchema = z.object({
  updatedPrescription: z.array(
    z.object({
      medicine: z.string().min(1, "Medicine name is required"),
      dosage: z.string().optional(),
      instructions: z.string().optional(),
    })
  ).min(1, "At least one medicine is required")
});
module.exports = {
  prescriptionSchema,
  updatePrescriptionSchema
};