import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { searchMovies, movieToCard } from "../../utils/utils";
import { ERROR_MSG_NOT_FOUND } from "../../utils/const";

// Movies — компонент страницы с поиском по фильмам
function SavedMovies({ loggedIn, savedCards, onDeleteCard }) {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);

  function onSearchMovies({ query, isShortMovies }) {
    setErrorMessage("");
    setSearchParams({ query, isShortMovies });

    let movies = searchMovies(savedCards, query, isShortMovies);
    setMovies(movies);
    if (movies.length === 0) setErrorMessage(ERROR_MSG_NOT_FOUND);
  }

  useEffect(() => {
    // console.log("useEffect [] SavedMovies");
    setMovies(savedCards);
  }, []);

  useEffect(() => {
    // console.log("useEffect [cards] SavedMovies");
    setMovies(
      searchParams.query
        ? searchMovies(
            savedCards,
            searchParams.query,
            searchParams.isShortMovies
          )
        : savedCards
    );
  }, [savedCards]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="saved-movies">
        <SearchForm onSearchMovies={onSearchMovies} />
        {errorMessage ? (
          <ErrorMessage message={errorMessage} />
        ) : (
          <MoviesCardList
            cards={movies}
            isSaved={true}
            onDeleteCard={onDeleteCard}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
