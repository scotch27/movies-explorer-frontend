import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { searchMovies, movieToCard } from "../../utils/utils";

// Movies — компонент страницы с поиском по фильмам
function SavedMovies({ loggedIn, savedCards, onDeleteCard }) {
  const [movies, setMovies] = useState([]);
  const [request, setRequest] = useState({});

  function onSearchMovies({ query, isShortMovies }) {
    console.log(query);
    console.log(isShortMovies);
    console.log(savedCards);

    setRequest({ query, isShortMovies });

    let movies = searchMovies(savedCards, query, isShortMovies);
    setMovies(movies);
    // console.log(movies);
  }

  useEffect(() => {
    console.log("useEffect [] SavedMovies");
    setMovies(savedCards);
  }, []);

  useEffect(() => {
    console.log("useEffect [cards] SavedMovies");
    setMovies(
      request.query
        ? searchMovies(savedCards, request.query, request.isShortMovies)
        : savedCards
    );
  }, [savedCards]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm onSearchMovies={onSearchMovies} />
        <MoviesCardList
          cards={movies}
          type="saved"
          onDeleteCard={onDeleteCard}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
