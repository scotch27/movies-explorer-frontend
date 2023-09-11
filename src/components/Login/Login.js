// Login — компонент страницы авторизации.

import React, { useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import useForm from "../../hooks/useForm";
import { PAGES, REGEX_EMAIL } from "../../utils/const";

function Login({handleLogin, message = ""}) {
  const formName = "login";
  const loginEmail = "email";
  const loginPassword = "password";

  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, handleChange, isFormValid, resetForm } =
    useForm(formName);

  const footerText = (
    <>
      Ещё не зарегистрированы?{" "}
      <Link className="auth-form__link" to={PAGES.REGISTER}>
        Регистрация
      </Link>
    </>
  );

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    
    handleLogin(values);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  return (
    <AuthForm
      formName={formName}
      title="Рады видеть!"
      buttonText="Войти"
      footerText={footerText}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      error={message}
    >
      <label className="auth-form__field" htmlFor={loginEmail}>
        E-mail
        <input
          name={loginEmail}
          className="auth-form__input"
          id={loginEmail}
          type="email"
          placeholder="E-mail"
          required
          pattern={REGEX_EMAIL}
          onChange={handleChange}
          value={values[loginEmail] || ""}
        />
        <span className="auth-form__input-error">{errors[loginEmail]}</span>
      </label>

      <label className="auth-form__field" htmlFor={loginPassword}>
        Пароль
        <input
          name={loginPassword}
          className={`auth-form__input ${
            errors[loginPassword] ? "auth-form__input_error" : ""
          }`}
          id={loginPassword}
          type="password"
          placeholder="Пароль"
          required
          minLength="8"
          maxLength="30"
          onChange={handleChange}
          value={values[loginPassword] || ""}
        />
        <span className="auth-form__input-error">{errors[loginPassword]}</span>
      </label>
    </AuthForm>
  );
}

export default Login;
