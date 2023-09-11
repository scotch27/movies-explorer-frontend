export const MAIN_API = "https://api.explorer.nomoreparties.co";
// export const MAIN_API = "http://localhost:2000";
export const MOVIES_API = "https://api.nomoreparties.co";

export const PAGES = {
  MAIN: "/",
  LOGIN: "/signin",
  REGISTER: "/signup",
  PROFILE: "/profile",
  MOVIES: "/movies",
  SAVED_MOVIES: "/saved-movies",
};

export const REGEX_EMAIL = "[a-z0-9_\\-\\.]+@[a-z0-9_\\-\\.]+[a-z0-9]+\\.[a-z]{2,4}";
export const REGEX_NAME = "[A-Za-zА-Яа-яЁё0-9\\s\\-]{2,}";

export const SHORT_MOVIES_DURATION = 40;

export const ERROR_MSG_EMPTY_REQUEST = "Нужно ввести ключевое слово";
export const ERROR_MSG_NOT_FOUND = "Ничего не найдено";
export const ERROR_MSG_SEARCH_RESULT = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";

export const ERROR_MSG_LOGIN_BAD = "Вы ввели неправильный логин или пароль";
export const ERROR_MSG_LOGIN_TOCKEN_FORMAT = "При авторизации произошла ошибка. Токен не передан или передан не в том формате";
export const ERROR_MSG_LOGIN_TOCKEN_BAD = "При авторизации произошла ошибка. Переданный токен некорректен";

export const ERROR_MSG_DUBLICATE_EMAIL = "Пользователь с таким email уже существует";
export const ERROR_MSG_REGISTER_OTHER = "При регистрации пользователя произошла ошибка";
export const ERROR_MSG_PROFILE_OTHER = "При обновлении профиля произошла ошибка";

export const ERROR_MSG_SERVER = "На сервере произошла ошибка";
export const ERROR_MSG_PAGE_NOT_FOUND = "Страница по указанному маршруту не найдена";