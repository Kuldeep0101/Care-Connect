const express = require('express');
const validate = require('../middleware/validate');
const verifyRoute = require('../middleware/authMiddleware');

const {
  prescriptionSchema,
  updatePrescriptionSchema,
} = require('../schema/prescriptionSchema');
const {
  createPrescription,
  getPrescription,
  updatePrescription,
} = require('../controllers/prescriptionController');

const prescriptionRouter = express.Router();

//Create new Prescriptons
prescriptionRouter.post(
  '/prescriptions',
  validate(prescriptionSchema),
  verifyRoute,
  createPrescription
);

// See all the prescriptions
prescriptionRouter.get('/prescriptions', verifyRoute, getPrescription);

//Update the Prescriptions
prescriptionRouter.patch(
  '/prescriptions/:id',
  validate(updatePrescriptionSchema),
  verifyRoute,
  updatePrescription
);

module.exports = prescriptionRouter;
