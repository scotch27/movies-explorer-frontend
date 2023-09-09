import { SHORT_MOVIES_DURATION } from "./const";

// Функция дпоиска фильмов
export function searchMovies(movies, query, isShortMovies = false) {
  const modifiedQuery = query.toUpperCase().trim();

  return movies.filter(
    ({ nameRU, nameEN, duration }) =>
      (isShortMovies ? duration <= SHORT_MOVIES_DURATION : true) &&
      (isFind(nameRU, modifiedQuery) || isFind(nameEN, modifiedQuery))
  );

  function isFind(text, search) {
    return text.toUpperCase().trim().indexOf(search) !== -1;
  }
}

// Функция преобразования длительностb фильма в строку для отображения
export function durationToString(duration) {
  return `${Math.floor(duration/60)}ч${duration % 60}м`;
}