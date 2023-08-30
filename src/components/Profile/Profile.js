// Profile — компонент страницы с профилем пользователя.

// import React, { useEffect, useContext, useState } from 'react';
import React, {useEffect} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";
import Header from "../Header/Header";
import useForm from "../../hooks/useForm";

function Profile({ loggedIn, signOut}) {
  const formName = "profileForm";
  const profileName = "name";
  const profileEmail = "email";

  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, handleChange, isFormValid, resetForm } = useForm(formName);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" id={formName}>
          <div className="profile__input-containers">
            <div className="profile__input-container">
              <div className="profile__field">
                <label className="profile__label" htmlFor={profileName}>
                  Имя
                </label>
                <input
                  name={profileName}
                  className="profile__input"
                  id={profileName}
                  type="text"
                  required
                  minLength="2"
                  maxLength="30"
                  onChange={handleChange}
                  value={values[profileName] || ""}
                />
              </div>
              <span className="profile__input-error">{errors[profileName]}</span>
            </div>

            <div className="profile__input-container">
              <div className="profile__field">
                <label className="profile__label" htmlFor={profileEmail}>
                  E-mail
                </label>
                <input
                  name={profileEmail}
                  className="profile__input"
                  id={profileEmail}
                  type="email"
                  required
                  onChange={handleChange}
                  value={values[profileEmail] || ""}
                />
              </div>
              <span className="profile__input-error">{errors[profileEmail]}</span>
            </div>
          </div>

          <div className="profile__button-container">
            <button
              type="submit"
              disabled={!isFormValid ? true : false}
              className="profile__save-button"
            >
              Редактировать
            </button>

            <button type="button" className="profile__logout" onClick={signOut}>
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
