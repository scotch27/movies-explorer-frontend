import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

// Movies — компонент страницы с поиском по фильмам
function Movies({ loggedIn, cards }) {
  const [searchParams, setSearchParams] = useState({
    query: localStorage.getItem("query"),
    isShortMovies: (localStorage.getItem("isShortMovies")==="true"),
  });

  const onSearchMovies = ({ query, isShortMovies }) => {
    console.log("onSearchMovies");
    console.log(searchParams);

    localStorage.setItem("query", query);
    localStorage.setItem("isShortMovies", isShortMovies);
    moviesApi
      .getMovies()
      .then((res) => console.log(res))
      .catch(console.error);
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm onSearchMovies={onSearchMovies} searchParams={searchParams} />
        <MoviesCardList cards={cards} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
