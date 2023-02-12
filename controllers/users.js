const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const NotFoundErr = require('../errors/NotFoundErr');
const IncorrectData = require('../errors/IncorrectData');
const AlreadyRegEmailErr = require('../errors/AlreadyRegEmailErr');
const {
  MSG_INCORRECT_DATA,
  MSG_NOT_FOUND_USER,
  MSG_EMAIL_REGISTERED,
} = require('../utils/constants');

const login = (req, res, next) => {
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

const getUsers = (req, res, next) => {
  Users.find({})
    .then((user) => res.send(user))
    .catch(next);
};

const getUserById = (req, res, next) => {
  Users.findById(req.params.id).orFail(new NotFoundErr(MSG_NOT_FOUND_USER))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NotFound') {
        next(err);
      } else if (err.name === 'CastError') {
        next(new IncorrectData(MSG_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

const getUserMe = (req, res, next) => {
  const userId = req.user._id;
  Users.findById(userId).orFail(new NotFoundErr(MSG_NOT_FOUND_USER))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NotFound') {
        next(err);
      } else if (err.name === 'CastError') {
        next(new IncorrectData(MSG_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
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
        next(new AlreadyRegEmailErr(MSG_EMAIL_REGISTERED));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectData(MSG_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  ).orFail(new NotFoundErr(MSG_NOT_FOUND_USER))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData(MSG_INCORRECT_DATA));
      }
      return next(err);
    });
};

const updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;

  Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new NotFoundErr(MSG_NOT_FOUND_USER))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData(MSG_INCORRECT_DATA));
      }
      return next(err);
    });
};

module.exports = {
  login,
  getUsers,
  getUserById,
  getUserMe,
  createUser,
  updateUser,
  updateAvatarUser,
};
