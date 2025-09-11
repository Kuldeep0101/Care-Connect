const { Worker } = require('bullmq');
const redisConfig = require('../config/redisConfig');
const User = require('../models/user');
const sendEmailNotification = require('./sendEmailNotificationj');
const sendSmsNotification = require('./sendSmsnotification');

//new Worker instance that listens to the 'notifications' queue

const notificationWorker = new Worker(
  'notifications',
  async (job) => {
    console.log(`Processing job ${job.id} with data:`, job.data);
    try {
      const { touserID, message, type, subject, mobileNumber } = job.data; //touserID can cause typo issue
      const checkToUserID = await User.findById(touserID);
      if (!checkToUserID) {
        throw new Error('No user found for Notification');
      }

      //nodemailer and twilio logic below

      await sendEmailNotification(checkToUserID.email, subject, message);

      await sendSmsNotification(mobileNumber, message);
      console.log(
        `Sending ${type} notification to ${checkToUserID.email}: ${message}`
      );
    } catch (error) {
      console.log(`Failed to process notification job ${job.id}:`, error);
      throw error;
    }
  },
  {
    connection: redisConfig,
    concurrency: 5, //number of processes to run simultaneously
    attempts: 3, //maximum retry attempts if a job fails
    backoff: {
      type: 'exponential',
      delay: 1000, //Start with 1 second delay for the first retry
    },
  }
);

module.exports = notificationWorker;
