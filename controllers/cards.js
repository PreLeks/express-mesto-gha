const Cards = require('../models/card');
const IncorrectData = require('../errors/IncorrectData');
const {
  MSG_INCORRECT_DATA,
  MSG_NOT_FOUND_CARD,
  MSG_NOT_DELETE_SELECTED_CARD,
} = require('../utils/constants');
const NotPossibilityDelErr = require('../errors/NotPossibilityDelErr');
const NotFoundErr = require('../errors/NotFoundErr');

const getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Cards.create({ name, link, owner })
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData(MSG_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundErr(MSG_NOT_FOUND_CARD))
    .then((cards) => res.send(cards))
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

const dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundErr(MSG_NOT_FOUND_CARD))
    .then((cards) => res.send(cards))
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

const deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId).orFail(new NotFoundErr(MSG_NOT_FOUND_CARD))
    .then((card) => {
      const user = String(req.user._id);
      const cardOwner = String(card.owner);
      if (user === cardOwner) {
        Cards.findByIdAndRemove(req.params.cardId)
          .then((deletedCard) => res.send(deletedCard));
      } else {
        next(new NotPossibilityDelErr(MSG_NOT_DELETE_SELECTED_CARD));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData(MSG_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
};
