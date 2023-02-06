const user = require('express').Router();

const {
  getUsers, getUserById, updateUser, updateAvatarUser, getUserMe,
} = require('../controllers/users');
const { getUserByIdValidation, updateUserValidation, updateAvatarUserValidation } = require('../middlewares/validation');

user.get('/users', getUsers);
user.get('/users/me', getUserMe);
user.get('/users/:id', getUserByIdValidation, getUserById);
user.patch('/users/me', updateUserValidation, updateUser);
user.patch('/users/me/avatar', updateAvatarUserValidation, updateAvatarUser);

module.exports = user;
