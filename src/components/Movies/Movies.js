import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import {
  ERROR_MSG_SEARCH_RESULT,
  ERROR_MSG_NOT_FOUND,
} from "../../utils/const";
import { searchMovies, filterMovies, movieToCard } from "../../utils/utils";

// Movies — компонент страницы с поиском по фильмам
function Movies({ loggedIn, onSaveCard, onDeleteCard, savedCards }) {
  const [isSearch, setIsSearch] = useState(false);
  const [localQuery, setLocalQuery] = useState(localStorage.getItem("query"));
  const [localIsShort, setLocalIsShort] = useState(
    localStorage.getItem("isShortMovies") === "true"
  );

  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function onSearchMovies({ query, isShortMovies }) {
    console.log("onSearchMovies: ");
    setErrorMessage("");
    localStorage.setItem("query", query);
    localStorage.setItem("isShortMovies", isShortMovies);
    setLocalQuery(query);
    setLocalIsShort(isShortMovies);
    setIsSearch(true);
    setIsLoading(true);
    if (allMovies.length > 0) {
      search(allMovies);
      setIsLoading(false);
    } else {
      moviesApi
        .getMovies()
        .then((res) => {
          setAllMovies(res);
          search(res);
        })
        .catch((error) => {
          setErrorMessage(ERROR_MSG_SEARCH_RESULT);
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    function search(allMovies) {
      let movies = searchMovies(allMovies, query);
      localStorage.setItem("movies", JSON.stringify(movies));
      movies = filterMovies(movies, isShortMovies);
      const cards = movies.map((movie) => movieToCard(movie, savedCards));
      setMovies(cards);
      if (cards.length === 0) setErrorMessage(ERROR_MSG_NOT_FOUND);
    }
  }

  function onFilterMovies(isShortMovies) {
    setErrorMessage("");
    localStorage.setItem("isShortMovies", isShortMovies);
    setLocalIsShort(isShortMovies);
    let movies = JSON.parse(localStorage.getItem("movies"));
    movies = filterMovies(movies, isShortMovies);
    setMovies(movies.map((movie) => movieToCard(movie, savedCards)));
    if (movies.length === 0 && isSearch) setErrorMessage(ERROR_MSG_NOT_FOUND);
    setIsSearch(true);
  }

  useEffect(() => {
    let movies = JSON.parse(localStorage.getItem("movies"));
    movies = filterMovies(movies, localIsShort);
    if (movies)
      setMovies(movies.map((movie) => movieToCard(movie, savedCards)));
  }, [savedCards]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          onSearchMovies={onSearchMovies}
          searchParams={{ query: localQuery, isShortMovies: localIsShort }}
          onShortMovies={onFilterMovies}
        />
        <ErrorMessage message={errorMessage} />
        {isLoading ? (
          <Preloader />
        ) : (
          localQuery &&
          !errorMessage && (
            <MoviesCardList
              cards={movies}
              onSaveCard={onSaveCard}
              onDeleteCard={onDeleteCard}
            />
          )
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
