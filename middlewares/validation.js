const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const IncorrectData = require('../errors/IncorrectData');

const validationURL = (value) => {
  if (!validator.isURL((value), { require_protocol: true })) {
    throw new IncorrectData('Невалидный URL-адрес');
  } else {
    return value;
  }
};

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().custom(validationURL).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const updateAvatarUserValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validationURL),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(validationURL),
  }),
});

const searchCardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  getUserByIdValidation,
  updateUserValidation,
  updateAvatarUserValidation,
  loginUserValidation,
  createUserValidation,
  createCardValidation,
  searchCardIdValidation,
};
