const Users = require('../models/user');
const {ErrorNotFound} = require('../errors/errors');

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then(user => res.send(user))
    .catch(() => res.status(500).send({message: 'Неизвестная ошибка сервера'}));
};

module.exports.getUserById = (req, res) => {
  Users.findById(req.params.id).orFail(new ErrorNotFound())
  .then(user => res.send(user))
  .catch((err) => {
    console.log(`Ошибка: ${err.name}`);
    if(err.name === 'NotFound') {
      res.status(404).send({message: 'Пользователь с указанным id не найден'});
    } else if(err.name === 'CastError') {
      res.status(400).send({message: 'Переданы некорректные данные'});
    } else {
      res.status(500).send({message: 'Неизвестная ошибка сервера'});
    }
  });
};

module.exports.createUser = (req, res) => {
  const data = req.body;
  Users.create(data)
    .then(user => res.send({data: user}))
    .catch((err) => {
      if(err.name === 'ErrorValidation') {
        res.status(400).send({message: 'Переданы некорректные данные'});
      } else {
        res.status(500).send({message: 'Неизвестная ошибка сервера'});
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
  ).orFail(new ErrorNotFound())
  .then(user => res.send(user))
  .catch((err) => {
    if(err.name === 'ErrorValidation') {
      res.status(400).send({message: 'Переданы некорректные данные'});
    } else if (err.name === 'CastError') {
      res.status(404).send({message: 'Пользователь с указанным id не найден'});
    } else {
      res.status(500).send({message: 'Неизвестная ошибка сервера'});
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
  ).orFail(new ErrorNotFound())
  .then(user => res.send(user))
  .catch((err) => {
    if(err.name === 'ErrorValidation') {
      res.status(400).send({message: 'Переданы некорректные данные'});
    } else if (err.name === 'CastError') {
      res.status(404).send({message: 'Пользователь с указанным id не найден'});
    } else {
      res.status(500).send({message: 'Неизвестная ошибка сервера'});
    }
  });
};