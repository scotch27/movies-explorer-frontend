import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import { searchMovies, movieToCard } from "../../utils/utils";

// Movies — компонент страницы с поиском по фильмам
function Movies({ loggedIn, onSaveCard, onDeleteCard, savedCards }) {
  const [searchParams, setSearchParams] = useState({
    query: localStorage.getItem("query"),
    isShortMovies: localStorage.getItem("isShortMovies") === "true",
  });

  const [movies, setMovies] = useState([]);

  function onSearchMovies({ query, isShortMovies }) {
    console.log(searchParams);
    console.log(savedCards);

    localStorage.setItem("query", query);
    localStorage.setItem("isShortMovies", isShortMovies);

    moviesApi
      .getMovies()
      .then((res) => searchMovies(res, query, isShortMovies))
      .then((movies) => {
        localStorage.setItem("movies", JSON.stringify(movies));
        return movies.map((movie) => movieToCard(movie, savedCards))
      })
      .then((cards) => {
        setMovies(cards);
      })
      .catch(console.error);
  }

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('movies'));
  
    console.log("useEffect ");
    console.log(movies);
    if(movies) setMovies(movies.map((movie) => movieToCard(movie, savedCards)));
  }, [savedCards]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          onSearchMovies={onSearchMovies}
          searchParams={searchParams}
        />
        <MoviesCardList
          cards={movies}
          onSaveCard={onSaveCard}
          onDeleteCard={onDeleteCard}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
