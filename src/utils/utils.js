import { MOVIES_API, SHORT_MOVIES_DURATION } from "./const";

// Функция дпоиска фильмов
export function searchMovies(movies, query) {
  if (!query) return movies;
  const modifiedQuery = query.toUpperCase().trim();

  return movies.filter(
    ({ nameRU, nameEN }) =>
      isFind(nameRU, modifiedQuery) || isFind(nameEN, modifiedQuery)
  );
  function isFind(text, search) {
    return text.toUpperCase().trim().indexOf(search) !== -1;
  }
}

// Функция фильтрации фильмов
export function filterMovies(movies, isShortMovies = false) {
  console.log(movies);
  return movies.filter(({ duration }) =>
    isShortMovies ? duration <= SHORT_MOVIES_DURATION : true
  );
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
    _id: getSavedId(movie.id, SavedMovies),
  };

  function getSavedId(id, data) {
    for (let item in data) {
      if (data[item].movieId === id) return data[item]._id;
    }
    return null;
  }
}
