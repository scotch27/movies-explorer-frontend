// SearchForm — форма поиска, куда пользователь будет вводить запрос.

import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import { ERROR_MESSAGE_EMPTY_REQUEST } from "../../../utils/const";

function SearchForm({ onSearchMovies, data }) {
  const formName = "searchForm";

  const [query, setQuery] = React.useState("");
  const [isShortFilm, setIsShortFilm] = React.useState(false);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [message, setMessage] = React.useState("");

  function handleChangeQuery(e) {
    setQuery(e.target.value);
  }

  function handleCheckIsShortFilm(e) {
    setIsShortFilm(!isShortFilm);
    setIsSubmit(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmit(true);
  }

  useEffect(() => {
    if (data) {
      setQuery(data.query ? data.query : query);
      setIsShortFilm(data.isShortFilm ? data.isShortFilm : isShortFilm);
    }
  }, []);

  useEffect(() => {
    if (isSubmit === true) {
      setIsSubmit(false);
      if (query.length === 0) {
        setMessage(ERROR_MESSAGE_EMPTY_REQUEST);
        return;
      }
      setMessage("");
      onSearchMovies({ query, isShortFilm });
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
            name="isShortFilm"
            id="isShortFilm"
            className="search__filter-checkbox"
            type="checkbox"
            onChange={handleCheckIsShortFilm}
            checked={isShortFilm}
          ></input>
          <span className="search__filter-text">Короткометражки</span>
        </div>
      </form>
      <div className="search__error">{message}</div>
    </section>
  );
}

export default SearchForm;
