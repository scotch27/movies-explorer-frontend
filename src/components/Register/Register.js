// Register — компонент страницы регистрации.
import React, { useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import useForm from "../../hooks/useForm";
import { PAGES } from "../../utils/const";

function Register() {
  const formName = "register";
  const registerName = "name";
  const registerEmail = "email";
  const registerPassword = "password";

  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, handleChange, isFormValid, resetForm } =
    useForm(formName);
  const [errorApi, setErrorApi] = useState();

  const footerText = (
    <>
      Уже зарегистрированы?{" "}
      <Link className="auth-form__link" to={PAGES.LOGIN}>
        Войти
      </Link>
    </>
  );

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    setErrorApi("Что-то пошло не так");
    console.log("handleSubmit Register");
  }

  return (
    <AuthForm
      formName={formName}
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      footerText={footerText}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      error={errorApi}
    >
      <label className="auth-form__field" htmlFor={registerName}>
        Имя
        <input
          name={registerName}
          className="auth-form__input"
          id={registerName}
          type="text"
          placeholder="от 2 до 30 символов"
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values[registerName] || ""}
        />
        <span className="auth-form__input-error">{errors[registerName]}</span>
      </label>

      <label className="auth-form__field" htmlFor={registerEmail}>
        E-mail
        <input
          name={registerEmail}
          className="auth-form__input"
          id={registerEmail}
          type="email"
          placeholder="E-mail"
          required
          onChange={handleChange}
          value={values[registerEmail] || ""}
        />
        <span className="auth-form__input-error">{errors[registerEmail]}</span>
      </label>

      <label className="auth-form__field" htmlFor={registerPassword}>
        Пароль
        <input
          name={registerPassword}
          className={`auth-form__input ${
            errors[registerPassword] ? "auth-form__input_error" : ""
          }`}
          id={registerPassword}
          type="password"
          placeholder="более 8 символов"
          required
          minLength="8"
          maxLength="30"
          onChange={handleChange}
          value={values[registerPassword] || ""}
        />
        <span className="auth-form__input-error">
          {errors[registerPassword]}
        </span>
      </label>
    </AuthForm>
  );
}

export default Register;
