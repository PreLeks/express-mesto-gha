const cards = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { createCardValidation, searchCardIdValidation } = require('../middlewares/validation');

cards.get('/cards', getCards);
cards.post('/cards', createCardValidation, createCard);
cards.delete('/cards/:cardId', searchCardIdValidation, deleteCard);
cards.put('/cards/:cardId/likes', searchCardIdValidation, likeCard);
cards.delete('/cards/:cardId/likes', searchCardIdValidation, dislikeCard);

module.exports = cards;
