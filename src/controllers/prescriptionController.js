const Appointment = require('../models/appointment');
const Prescription = require('../models/prescription');
const { enqueueNotification } = require('../services/notificationQueue');
//Create Prescription
const createPrescription = async (req, res) => {
  try {
    const { prescription, appointmentId } = req.body;
    const { id, role } = req.user;
    if (role !== 'doctor') {
      return res.status(403).json({
        message: 'Only Doctors can create Prescription!!',
      });
    }

    const appointmentDetails = await Appointment.findById(appointmentId);

    if (!appointmentDetails || appointmentDetails.doctorID.toString() !== id) {
      return res.status(404).json({
        message: 'Invalid Appointment',
      });
    }

    const newPrescription = new Prescription({
      appointmentId: appointmentId,
      doctorId: id,
      patientId: appointmentDetails.patientID,
      details: prescription,
    });

    const savePrescription = await newPrescription.save();
    await enqueueNotification({
      touserID: appointmentDetails.patientID,
      type: 'Prescription',
      message: `New Prescription Added to your Appointment:${appointmentDetails.date_time}`,
      subject: 'New Prescription',
      mobileNumber: '',
    });

    return res.status(200).json({
      message: 'Prescription Added',
      data: savePrescription,
    });
  } catch (error) {
    console.log('Error while creating Prescription ', error);
    res.status(500).json({
      message: error.message,
    });
  }
};

//GET Priscriptions
const getPrescription = async (req, res) => {
  try {
    const { id, role } = req.user;

    let prescriptions;

    if (role === 'patient') {
      prescriptions = await Prescription.find({
        patientId: id,
      }).populate('appointmentId');
    } else if (role === 'doctor') {
      prescriptions = await Prescription.find({
        doctorId: id,
      }).populate('appointmentId');
    }

    // const findPrescriptions = await Prescription.find({
    //   $or: [{
    //     doctorID: id
    //   }, {
    //     patientID: id
    //   }],
    // });

    if (!prescriptions || !prescriptions.length) {
      return res.status(404).json({
        message: 'No Prescriptions Found',
      });
    }
    return res.status(200).json({
      message: 'All Prescriptions',
      data: prescriptions,
    });
  } catch (error) {
    console.log('Error while creating Prescription ', error);
    res.status(500).json({
      message: error.message,
    });
  }
};

//Update Prescriptions

const updatePrescription = async (req, res) => {
  try {
    const { updatedPrescription } = req.body;
    const prescriptionId = req.params.id;

    if (req.user.role !== 'doctor') {
      return res.status(403).json({
        message: 'Doctors only',
      });
    }

    const findPrescription = await Prescription.findById(prescriptionId);

    if (
      !findPrescription ||
      findPrescription.doctorId.toString() !== req.user.id
    ) {
      return res.status(404).json({
        message: 'Prescription not found or unauthorized',
      });
    }

    findPrescription.details = updatedPrescription || findPrescription.details;
    await findPrescription.save();

    await enqueueNotification({
      touserID: findPrescription.patientId,
      type: 'Prescription',
      message: `Your Prescription has Been Updated`,
      subject: 'Prescription Update!!',
      mobileNumber: '',
    });

    return res.status(200).json({
      message: 'Prescription Updated',
      data: findPrescription,
    });
  } catch (error) {
    console.log('Error while creating Prescription ', error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPrescription,
  getPrescription,
  updatePrescription,
};
