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
  ERROR_MESSAGE_SEARCH_RESULT,
  ERROR_MESSAGE_NOT_FOUND,
} from "../../utils/const";
import { searchMovies, movieToCard } from "../../utils/utils";

// Movies — компонент страницы с поиском по фильмам
function Movies({ loggedIn, onSaveCard, onDeleteCard, savedCards }) {
  const [searchParams, setSearchParams] = useState({
    query: localStorage.getItem("query"),
    isShortMovies: localStorage.getItem("isShortMovies") === "true",
  });

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  function onSearchMovies({ query, isShortMovies }) {
    setErrorMessage("");
    localStorage.setItem("query", query);
    localStorage.setItem("isShortMovies", isShortMovies);
    setSearchParams({ query, isShortMovies });

    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((res) => searchMovies(res, query, isShortMovies))
      .then((movies) => {
        localStorage.setItem("movies", JSON.stringify(movies));
        return movies.map((movie) => movieToCard(movie, savedCards));
      })
      .then((cards) => {
        setMovies(cards);
        if (cards.length === 0) setErrorMessage(ERROR_MESSAGE_NOT_FOUND);
      })
      .catch((error) => {
        setErrorMessage(ERROR_MESSAGE_SEARCH_RESULT);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies"));
    if (movies)
      setMovies(movies.map((movie) => movieToCard(movie, savedCards)));
  }, [savedCards]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          onSearchMovies={onSearchMovies}
          searchParams={searchParams}
        />
        <ErrorMessage message={errorMessage} />
        {isLoading ? (
          <Preloader />
        ) : (
          searchParams.query &&
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
