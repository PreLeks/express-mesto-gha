const jwt = require('jsonwebtoken');
const AuthErr = require('../errors/AuthErr');
const { MSG_UNAUTHORIZED } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'jwt-token');
  } catch (err) {
    next(new AuthErr(MSG_UNAUTHORIZED));
  }
  req.user = payload;
  return next();
};
