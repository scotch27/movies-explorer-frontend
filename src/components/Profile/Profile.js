// Profile — компонент страницы с профилем пользователя.

import React, { useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";
import Header from "../Header/Header";
import useForm from "../../hooks/useForm";
import { REGEX_EMAIL, REGEX_NAME } from "../../utils/const";

function Profile({ onUpdateUser, loggedIn, signOut, message = "" }) {
  const formName = "profileForm";
  const profileName = "name";
  const profileEmail = "email";

  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, handleChange, isFormValid, resetForm } =
    useForm(formName);
  const [profileEditing, setProfileEditing] = useState(false);
  const [activeButton, setActiveBotton] = useState(false);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onUpdateUser(values);
    // setErrorApi("Ошибка при сохранении профиля");
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm, loggedIn]);

  useEffect(() => {
    if (
      isFormValid &&
      currentUser &&
      (currentUser.name !== values[profileName] ||
        currentUser.email !== values[profileEmail])
    )
      setActiveBotton(true);
    else setActiveBotton(false);
  }, [isFormValid, currentUser, values]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" id={formName} onSubmit={handleSubmit}>
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
                  placeholder="от 2 до 30 символов"
                  required
                  pattern={REGEX_NAME}
                  minLength="2"
                  maxLength="30"
                  onChange={handleChange}
                  value={values[profileName] || ""}
                  disabled={!profileEditing ? true : false}
                />
              </div>
              <span className="profile__input-error">
                {errors[profileName]}
              </span>
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
                  placeholder="E-mail"
                  required
                  pattern={REGEX_EMAIL}
                  onChange={handleChange}
                  value={values[profileEmail] || ""}
                  disabled={!profileEditing ? true : false}
                />
              </div>
              <span className="profile__input-error">
                {errors[profileEmail]}
              </span>
            </div>
          </div>

          <div className="profile__error-container">{message}</div>
          <div className="profile__button-container">
            {profileEditing ? (
              <button
                type="submit"
                disabled={!activeButton ? true : false}
                className={`profile__save-button ${
                  activeButton ? "" : "profile__save-button_inactive"
                }`}
              >
                Сохранить
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="profile__edit-button"
                  onClick={() => setProfileEditing(true)}
                >
                  Редактировать
                </button>
                <button
                  type="button"
                  className="profile__logout"
                  onClick={signOut}
                >
                  Выйти из аккаунта
                </button>
              </>
            )}
          </div>
        </form>
      </main>
    </>
  );
}

export default Profile;
