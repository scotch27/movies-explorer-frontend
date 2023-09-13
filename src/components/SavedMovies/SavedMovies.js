import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { searchMovies, filterMovies, movieToCard } from "../../utils/utils";
import { ERROR_MSG_NOT_FOUND } from "../../utils/const";

// Movies — компонент страницы с поиском по фильмам
function SavedMovies({ loggedIn, savedCards, onDeleteCard }) {
  const [isSearch, setIsSearch] = useState(false);
  const [movies, setMovies] = useState([]);
  const [localQuery, setLocalQuery] = useState("");
  const [localIsShort, setLocalIsShort] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  function onSearchMovies({ query, isShortMovies }) {
    setLocalQuery(query);
    setIsSearch(true);
  }

  function onFilterMovies(isShortMovies){
    setLocalIsShort(isShortMovies);
    setIsSearch(true);
  }

  useEffect(() => {
    setErrorMessage("");
    let movies = localQuery ? searchMovies(savedCards, localQuery) : savedCards;
    movies = filterMovies(movies, localIsShort);
    setMovies(movies);
    if (movies.length === 0 && isSearch) setErrorMessage(ERROR_MSG_NOT_FOUND);
  }, [savedCards, localQuery, localIsShort]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="saved-movies">
        <SearchForm onSearchMovies={onSearchMovies} 
          onShortMovies= {onFilterMovies}/>
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
