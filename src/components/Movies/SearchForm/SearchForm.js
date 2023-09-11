// SearchForm — форма поиска, куда пользователь будет вводить запрос.

import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import { ERROR_MSG_EMPTY_REQUEST } from "../../../utils/const";

function SearchForm({ onSearchMovies, searchParams }) {
  const formName = "searchForm";

  const [query, setQuery] = useState("");
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");

  function handleChangeQuery(e) {
    setQuery(e.target.value);
  }

  function handleCheckIsShortMovies(e) {
    setIsShortMovies(!isShortMovies);
    setIsSubmit(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);
  }

  useEffect(() => {
    // console.log(searchParams);
    if (!searchParams) return;
    if (searchParams.isShortMovies)
      setIsShortMovies(searchParams.isShortMovies);
    if (searchParams.query) {
      setQuery(searchParams.query);
    }
  }, []);

  useEffect(() => {
    if (isSubmit === true) {
      setIsSubmit(false);
      if (query.length === 0) {
        setMessage(ERROR_MSG_EMPTY_REQUEST);
        return;
      }
      setMessage("");
      onSearchMovies({ query, isShortMovies });
    }
  }, [isSubmit]);

  return (
    <section className="search">
      <form
        className="search__form"
        id={formName}
        onSubmit={handleSubmit}
        noValidate={true}
      >
        <label className="search__field" htmlFor="query">
          <input
            name="query"
            className="search__input"
            id="query"
            type="text"
            placeholder="Фильм"
            required
            onChange={handleChangeQuery}
            value={query}
          />
          <button className="search__button" type="submit">
            Найти
          </button>
        </label>
        <div className="search__filter">
          <input
            name="isShortMovies"
            id="isShortMovies"
            className="search__filter-checkbox"
            type="checkbox"
            onChange={handleCheckIsShortMovies}
            checked={isShortMovies}
          ></input>
          <span className="search__filter-text">Короткометражки</span>
        </div>
      </form>
      <div className="search__error">{message}</div>
    </section>
  );
}

export default SearchForm;
