import { MOVIES_API, SHORT_MOVIES_DURATION } from "./const";

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
  return `${Math.floor(duration / 60)}ч${duration % 60}м`;
}

//конвертер фильмов в карточку фильмов
export function movieToCard(movie, SavedMovies = []) {
  // console.log(SavedMovies);
  return {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: MOVIES_API + movie.image.url,
    trailerLink: movie.trailerLink,
    thumbnail: MOVIES_API + movie.image.formats.thumbnail.url,
    movieId: movie.id,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    saved: isSaved(movie.id, SavedMovies),
  };

  function isSaved(id, data) {
    for (let item in data) {
      if (data[item].movieId === id) return true;
    }
    return false;
  }
}
