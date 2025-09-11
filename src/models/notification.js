// //type, message, user, read/unread status, timestamps

// const mongoose = require('mongoose');

// const notificationSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   message: {
//     type: String,
//   },
//   type: {
//     type: String,
//   },
//   read: {
//     type: Boolean,
//     default: false,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
// });

// const Notification = mongoose.model('Notification', notificationSchema);
// module.exports = Notification;
