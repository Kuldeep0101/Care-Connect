require('dotenv').config();

module.exports = {
  redis_port: process.env.REDIS_PORT,
  redis_host: process.env.REDIS_HOST,
};
