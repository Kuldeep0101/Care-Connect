const { default: mongoose } = require('mongoose');
const { z } = require('zod');

const notificationSchema = z.object({
  toUserId: z.string().refine(mongoose.Types.ObjectId.isValid, {
    message: 'Invalid toUserID',
  }),
  message: z.string().trim().min(1, 'Message Required'),
  type: z.enum(['appointment', 'prescription', 'reminder'], {
    message: 'Invalid message',
  }),
});

module.exports = notificationSchema;
