const Users = require('../models/user');
const {NotFoundError} = require('../errors/Errors');
const {SERVER_ERROR_CODE, SERVER_ERROR_MESSAGE, INCORRECT_DATA_CODE, INCORRECT_DATA_CODE_MESSAGE, NOT_FOUND_CODE} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then(user => res.send(user))
    .catch(() => res.status(SERVER_ERROR_CODE).send({message: SERVER_ERROR_MESSAGE}));
};

module.exports.getUserById = (req, res) => {
  Users.findById(req.params.id).orFail(new NotFoundError())
  .then(user => res.send(user))
  .catch((err) => {
    console.log(`Ошибка: ${err.name}`);
    if(err.name === 'NotFound') {
      res.status(NOT_FOUND_CODE).send({message: 'Пользователь с указанным id не найден.'});
    } else if(err.name === 'CastError') {
      res.status(INCORRECT_DATA_CODE).send({message: INCORRECT_DATA_CODE_MESSAGE});
    } else {
      res.status(SERVER_ERROR_CODE).send({message: SERVER_ERROR_MESSAGE});
    }
  });
};

module.exports.createUser = (req, res) => {
  const data = req.body;
  Users.create(data)
    .then(user => res.send({data: user}))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        res.status(INCORRECT_DATA_CODE).send({message: INCORRECT_DATA_CODE_MESSAGE});
      } else {
        res.status(SERVER_ERROR_CODE).send({message: SERVER_ERROR_MESSAGE});
      }
    });
};

module.exports.updateUser = (req, res) => {
  const {name, about} = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    {name, about},
    {
    new: true,
    runValidators: true,
    upsert: false
    }
  ).orFail(new NotFoundError())
  .then(user => res.send(user))
  .catch((err) => {
    if(err.name === 'ValidationError') {
      res.status(INCORRECT_DATA_CODE).send({message: INCORRECT_DATA_CODE_MESSAGE});
    } else if (err.name === 'CastError') {
      res.status(NOT_FOUND_CODE).send({message: 'Пользователь с указанным id не найден'});
    } else {
      res.status(SERVER_ERROR_CODE).send({message: SERVER_ERROR_MESSAGE});
    }
  });
};

module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;

  Users.findByIdAndUpdate(
    req.user._id,
    {avatar},
    {
    new: true,
    runValidators: true
    }
  ).orFail(new NotFoundError())
  .then(user => res.send(user))
  .catch((err) => {
    if(err.name === 'ValidationError') {
      res.status(INCORRECT_DATA_CODE).send({message: INCORRECT_DATA_CODE_MESSAGE});
    } else if (err.name === 'CastError') {
      res.status(NOT_FOUND_CODE).send({message: 'Пользователь с указанным id не найден'});
    } else {
      res.status(SERVER_ERROR_CODE).send({message: SERVER_ERROR_MESSAGE});
    }
  });
};