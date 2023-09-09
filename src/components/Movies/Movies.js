import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { searchMovies } from "../../utils/utils";

// Movies — компонент страницы с поиском по фильмам
function Movies({ loggedIn, cards }) {
  const [searchParams, setSearchParams] = useState({
    query: localStorage.getItem("query"),
    isShortMovies: (localStorage.getItem("isShortMovies")==="true"),
  });

  const [movies, setMovies] = useState([]);

  const onSearchMovies = ({ query, isShortMovies }) => {
    console.log(searchParams);

    localStorage.setItem("query", query);
    localStorage.setItem("isShortMovies", isShortMovies);

    moviesApi
      .getMovies()
      .then((res) => searchMovies(res, query, isShortMovies))
      .then((res) => setMovies(res))
      .then((res) => console.log(res))
      .catch(console.error);
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm onSearchMovies={onSearchMovies} searchParams={searchParams} />
        <MoviesCardList cards={movies} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
