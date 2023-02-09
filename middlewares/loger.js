const winston = require('winston');
const expressWinston = require('express-winston');

const reqLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'req.log' }),
  ],
  format: winston.format.json(),
});

const errLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'err.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  reqLogger,
  errLogger,
};
