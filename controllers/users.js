const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const IncorrectData = require('../errors/IncorrectData');
const ExistEmailError = require('../errors/ExistEmailError');
const {
  INCORRECT_DATA_MESSAGE,
  NOT_FOUND_USER_ID_MESSAGE,
  EXIST_EMAIL_MESSAGE,
} = require('../utils/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'jwt-token', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  Users.find({})
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  Users.findById(req.params.id).orFail(new NotFoundError(NOT_FOUND_USER_ID_MESSAGE))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NotFound') {
        next(err);
      } else if (err.name === 'CastError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.getUserMe = (req, res, next) => {
  const userId = req.user._id;
  Users.findById(userId).orFail(new NotFoundError(NOT_FOUND_USER_ID_MESSAGE))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NotFound') {
        next(err);
      } else if (err.name === 'CastError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name, about, avatar, email, _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ExistEmailError(EXIST_EMAIL_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  ).orFail(new NotFoundError(NOT_FOUND_USER_ID_MESSAGE))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else if (err.name === 'CastError') {
        next(new IncorrectData(NOT_FOUND_USER_ID_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;

  Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new NotFoundError(NOT_FOUND_USER_ID_MESSAGE))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData(INCORRECT_DATA_MESSAGE));
      } else if (err.name === 'CastError') {
        next(new IncorrectData(NOT_FOUND_USER_ID_MESSAGE));
      } else {
        next(err);
      }
    });
};
