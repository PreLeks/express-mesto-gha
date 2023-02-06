const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');
const { NOT_REGISTERED_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'jwt-token');
  } catch (err) {
    next(new AuthorizationError(NOT_REGISTERED_MESSAGE));
  }
  req.user = payload;
  return next();
};
