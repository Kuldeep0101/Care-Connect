const express = require('express');
const verifyRoute = require('../middleware/authMiddleware');
const {
  bookAppointment,
  getUserAppointments,
  updateAppointmentStatus,
} = require('../controllers/appointmentController');
const appointmentRouter = express.Router();

appointmentRouter.post('/appointments/book', verifyRoute, bookAppointment);
appointmentRouter.get('/appointments', verifyRoute, getUserAppointments);
appointmentRouter.patch(
  '/appointments/:id',
  verifyRoute,
  updateAppointmentStatus
);

module.exports = appointmentRouter;
