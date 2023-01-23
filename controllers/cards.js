const Cards = require('../models/card');
const {NotFoundError} = require('../errors/Errors');
const {SERVER_ERROR_CODE, SERVER_ERROR_MESSAGE, INCORRECT_DATA_CODE, INCORRECT_DATA_CODE_MESSAGE, NOT_FOUND_CODE} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(SERVER_ERROR_CODE).send({message: SERVER_ERROR_MESSAGE}));
};

module.exports.createCard = (req, res) => {
  const {name, link} = req.body;
  const owner = req.user._id;
  Cards.create({name, link, owner})
    .then(cards => res.send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(INCORRECT_DATA_CODE).send({message: INCORRECT_DATA_CODE_MESSAGE});
      } else {
        res.status(SERVER_ERROR_CODE).send({message: SERVER_ERROR_MESSAGE});
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId).orFail(new NotFoundError())
    .then(cards => res.send(cards))
    .catch((err) => {
      if(err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({message: 'Карточка с указанным _id не найдена.'});
      } else if (err.name === 'CastError') {
        res.status(INCORRECT_DATA_CODE).send({message: INCORRECT_DATA_CODE_MESSAGE});
      } else {
        res.status(SERVER_ERROR_CODE).send({message: SERVER_ERROR_MESSAGE});
      }
    });
};

module.exports.likeCard  = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
    ).orFail(new NotFoundError())
    .then(cards => res.send(cards))
    .catch((err) => {
      if(err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({message: 'Карточка с указанным _id не найдена.'});
      } else if (err.name === 'CastError') {
        res.status(INCORRECT_DATA_CODE).send({message: INCORRECT_DATA_CODE_MESSAGE});
      } else {
        res.status(SERVER_ERROR_CODE).send({message: SERVER_ERROR_MESSAGE});
      }
    });
};

module.exports.dislikeCard  = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
    ).orFail(new NotFoundError())
    .then(cards => res.send(cards))
    .catch((err) => {
      if(err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({message: 'Карточка с указанным _id не найдена.'});
      } else if (err.name === 'CastError') {
        res.status(INCORRECT_DATA_CODE).send({message: INCORRECT_DATA_CODE_MESSAGE});
      } else {
        res.status(SERVER_ERROR_CODE).send({message: SERVER_ERROR_MESSAGE});
      }
    });
};