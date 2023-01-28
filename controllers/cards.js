const Cards = require('../models/card');
const { ErrorNotFound } = require('../errors/Errors');
const {
  CODE_INCORRECT_DATA,
  CODE_MSG_INCORRECT_DATA,
  CODE_NOT_FOUND,
  CODE_MSG_NOT_FOUND_CARD,
  CODE_ERROR_SERVER,
  CODE_MSG_ERROR_SERVER,
} = require('../utils/constants');

const getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(CODE_ERROR_SERVER).send({ message: CODE_MSG_ERROR_SERVER }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Cards.create({ name, link, owner })
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(CODE_INCORRECT_DATA).send({ message: CODE_MSG_INCORRECT_DATA });
      } else {
        res.status(CODE_ERROR_SERVER).send({ message: CODE_MSG_ERROR_SERVER });
      }
    });
};

const deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId).orFail(new ErrorNotFound())
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(CODE_NOT_FOUND).send({ message: CODE_MSG_NOT_FOUND_CARD });
      } else if (err.name === 'CastError') {
        res.status(CODE_INCORRECT_DATA).send({ message: CODE_MSG_INCORRECT_DATA });
      } else {
        res.status(CODE_ERROR_SERVER).send({ message: CODE_MSG_ERROR_SERVER });
      }
    });
};

const likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new ErrorNotFound())
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(CODE_NOT_FOUND).send({ message: CODE_MSG_NOT_FOUND_CARD });
      } else if (err.name === 'CastError') {
        res.status(CODE_INCORRECT_DATA).send({ message: CODE_MSG_INCORRECT_DATA });
      } else {
        res.status(CODE_ERROR_SERVER).send({ message: CODE_MSG_ERROR_SERVER });
      }
    });
};

const dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new ErrorNotFound())
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(CODE_NOT_FOUND).send({ message: CODE_MSG_NOT_FOUND_CARD });
      } else if (err.name === 'CastError') {
        res.status(CODE_INCORRECT_DATA).send({ message: CODE_MSG_INCORRECT_DATA });
      } else {
        res.status(CODE_ERROR_SERVER).send({ message: CODE_MSG_ERROR_SERVER });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
