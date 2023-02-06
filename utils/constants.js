const INTERNAL_SERVER_ERROR = 500;
const MSG_SERVER_ERROR = 'Внутренняя ошибка сервера';

const MSG_NOT_FOUND_RESOURCE = 'Запрашиваемый ресурс не найден';
const MSG_NOT_FOUND_USER = 'Указанный пользователь не найден';
const MSG_NOT_FOUND_CARD = 'Указанная карточка не найдена';

const MSG_INCORRECT_DATA = 'Переданы некорректные данные';

const MSG_UNAUTHORIZED = 'Необходимо авторизироваться';
const MSG_INCORRECT_LOGIN_OR_PASSWORD = 'Неверное имя пользователя или пароль';
const MSG_EMAIL_REGISTERED = 'Указанный Email уже зарегистрирован';
const MSG_NOT_DELETE_SELECTED_CARD = 'У Вас нет возможности удалить выбранную карточку';

module.exports = {
  INTERNAL_SERVER_ERROR,
  MSG_SERVER_ERROR,
  MSG_NOT_FOUND_RESOURCE,
  MSG_NOT_FOUND_USER,
  MSG_NOT_FOUND_CARD,
  MSG_INCORRECT_DATA,
  MSG_UNAUTHORIZED,
  MSG_INCORRECT_LOGIN_OR_PASSWORD,
  MSG_EMAIL_REGISTERED,
  MSG_NOT_DELETE_SELECTED_CARD,
};
