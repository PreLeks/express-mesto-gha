const { CODE_NOT_FOUND, CODE_MSG_NOT_FOUND_RESOURCE } = require('constants');

module.exports.notFoundResource = (req, res) => {
  res.status(CODE_NOT_FOUND).send({ message: CODE_MSG_NOT_FOUND_RESOURCE });
};
