const User = require('../models/appointment');
const Notification = require('../models/notification');

const sendNotifications = async (req, res) => {
  try {
    const { toUserID, type, message } = req.body;
    //if called from another fn, then above will be passed as arguements, not in req

    const isValidToUserID = await User.findById(toUserID);
    console.log(isValidToUserID);
    if (!isValidToUserID) {
      return res.status(404).json({
        message: 'User not found !!',
      });
    }

    const notification = new Notification({
      user: toUserID,
      message: message,
      type: type,
      read,
      createdAt,
    });
    notification.save();

    //Send the notification externally

    return res.status(200).json({
      message: 'notification sent!!',
      data: {
        id: notification._id,
        message: notification.message,
        type: notification.type,
      },
    });
  } catch (error) {
    console.log(console.error(error.message));
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = sendNotifications;
