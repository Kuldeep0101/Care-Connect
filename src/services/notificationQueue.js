const { Queue } = require("bullmq");
const redisConfig = require("../config/redisConfig");

//new BullMQ queue instance
const notificationQueue = new Queue("notifications", {
  connection: redisConfig, //connect the queue to your Redis instance
});

async function enqueueNotification(data) {
  try {
    await notificationQueue.add("notifications_to_send", data);
    console.log("Notification job queued successfully with data:", data);
  } catch (error) {
    console.error("Failed to add notification to job queue", error);
    throw error;
  }
}

module.exports = {
  notificationQueue,
  enqueueNotification,
};
