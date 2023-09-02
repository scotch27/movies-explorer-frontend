// SearchForm — форма поиска, куда пользователь будет вводить запрос.

import React, { useEffect, useState } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import "./SearchForm.css";
import useForm from "../../../hooks/useForm";

function SearchForm() {
  const formName = "searchForm";
  const searchQuery = "query";
  const searShortFilm = "shortFilm";

  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, handleChange, isFormValid, resetForm } =
    useForm(formName);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    console.log("SearchForm");
  }

  function handleCheckBox(e) {
    
    console.log("handleCheckBox");
    // onCheckBoxClicked(movieName, e.target.checked);
    // setIsShortFilm(e.target.checked);
  }


  return (
    <section className="search">
      <form className="search__form" id={formName} onSubmit={handleSubmit}>
          <div className="search__field" htmlFor={searchQuery}>
            <input
              name={searchQuery}
              className="search__input"
              id={searchQuery}
              type="text"
              placeholder="Фильм"
              required
              onChange={handleChange}
              value={values[searchQuery] || ""}
            />
            <button className="search__button" type="submit">Найти</button>
          </div>
        <div className="search__filter">
          <input
            name={searShortFilm}
            id={searShortFilm}
            className="search__filter-checkbox"
            type="checkbox"
            onChange={handleCheckBox}
            checked={values[searShortFilm]}
          ></input>
          <span className="search__filter-text">
            Короткометражки
          </span>
        </div>
      </form>
      <div className="search__error">{errors[searchQuery]}</div>
    </section>
  );
}

export default SearchForm;
