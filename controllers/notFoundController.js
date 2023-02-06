const { MSG_NOT_FOUND_RESOURCE } = require('../utils/constants');
const NotFoundErr = require('../errors/NotFoundErr');

const notFoundController = (req, res, next) => {
  next(new NotFoundErr(MSG_NOT_FOUND_RESOURCE));
};

module.exports = notFoundController;
