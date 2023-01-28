const Users = require('../models/user');
const { ErrorNotFound } = require('../errors/Errors');
const {
  CODE_INCORRECT_DATA,
  CODE_MSG_INCORRECT_DATA,
  CODE_NOT_FOUND,
  CODE_MSG_NOT_FOUND_USER,
  CODE_ERROR_SERVER,
  CODE_MSG_ERROR_SERVER,
} = require('../utils/constants');

const getUsers = (req, res) => {
  Users.find({})
    .then((user) => res.send(user))
    .catch(() => res.status(CODE_ERROR_SERVER).send({ message: CODE_MSG_ERROR_SERVER }));
};

const getUserById = (req, res) => {
  Users.findById(req.params.id).orFail(new ErrorNotFound())
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(CODE_NOT_FOUND).send({ message: CODE_MSG_NOT_FOUND_USER });
      } else if (err.name === 'CastError') {
        res.status(CODE_INCORRECT_DATA).send({ message: CODE_MSG_INCORRECT_DATA });
      } else {
        res.status(CODE_ERROR_SERVER).send({ message: CODE_MSG_ERROR_SERVER });
      }
    });
};

const createUser = (req, res) => {
  const data = req.body;
  Users.create(data)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(CODE_INCORRECT_DATA).send({ message: CODE_MSG_INCORRECT_DATA });
      } else {
        res.status(CODE_ERROR_SERVER).send({ message: CODE_MSG_ERROR_SERVER });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  ).orFail(new ErrorNotFound())
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(CODE_NOT_FOUND).send({ message: CODE_MSG_NOT_FOUND_USER });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(CODE_INCORRECT_DATA).send({ message: CODE_MSG_INCORRECT_DATA });
      } else {
        res.status(CODE_ERROR_SERVER).send({ message: CODE_MSG_ERROR_SERVER });
      }
    });
};

const updateAvatarUser = (req, res) => {
  const { avatar } = req.body;

  Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new ErrorNotFound())
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(CODE_NOT_FOUND).send({ message: CODE_MSG_NOT_FOUND_USER });
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(CODE_INCORRECT_DATA).send({ message: CODE_MSG_INCORRECT_DATA });
      } else {
        res.status(CODE_ERROR_SERVER).send({ message: CODE_MSG_ERROR_SERVER });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatarUser,
};
