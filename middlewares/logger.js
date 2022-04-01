const dayjs = require("dayjs");

const logger = (req, res, next) => {
  console.log(`Request for ${req.protocol}://${req.get("host")}${req.originalUrl} at ${dayjs().format()}`);
  next();
};

module.exports = logger;
