const SERVER_ERROR_CODE = 500;
const SERVER_ERROR_MESSAGE = 'Неизвестная ошибка сервера';
const NOT_FOUND_ROUTE_MESSAGE = 'Запрашиваемый адрес запроса не найден';
const NOT_FOUND_USER_ID_MESSAGE = 'Пользователь с указанным id не найден.';
const NOT_FOUND_CARD_ID_MESSAGE = 'Карточка с указанным id не найдена.';
const NOT_RIGHTS_MESSAGE = 'У вас нет прав на удаление';
const INCORRECT_DATA_MESSAGE = 'Переданы не корректные данные';
const LOGIN_ERROR_MESSAGE = 'Неверное имя пользователя или пароль';
const NOT_REGISTERED_MESSAGE = 'Необходима авторизация.';
const EXIST_EMAIL_MESSAGE = 'Пользователь с таким Email уже существует.';

module.exports = {
  SERVER_ERROR_CODE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_ROUTE_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  LOGIN_ERROR_MESSAGE,
  NOT_FOUND_USER_ID_MESSAGE,
  NOT_FOUND_CARD_ID_MESSAGE,
  NOT_RIGHTS_MESSAGE,
  NOT_REGISTERED_MESSAGE,
  EXIST_EMAIL_MESSAGE,
};
