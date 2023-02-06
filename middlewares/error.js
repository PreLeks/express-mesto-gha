const { INTERNAL_SERVER_ERROR, MSG_SERVER_ERROR } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).json({ message: MSG_SERVER_ERROR });
  }

  next();
};
