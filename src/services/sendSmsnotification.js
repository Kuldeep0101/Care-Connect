const twilio = require('twilio');

require('dotenv').config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSmsNotification(mobileNumber, message) {
  try {
    const messgaeInstance = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+919193669281',
    });
    console.log('SMS Sent Successfully with SID:', messgaeInstance.sid);
  } catch (error) {
    console.log('Error sending SMS', error.message);
  }
}

module.exports = sendSmsNotification;
