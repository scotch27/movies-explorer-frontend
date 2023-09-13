import { Link } from "react-router-dom";
import "./AuthForm.css";
import logoMovies from "../../images/logo.svg";

function AuthForm({
  formName,
  title,
  children,
  buttonText,
  footerText,
  onSubmit,
  isFormValid,
  error,
}) {
  return (
    <main className="auth-form">
      <Link className="auth-form__logo" to={"/"}>
        <img src={logoMovies} alt="Логотип" />
      </Link>
      <h1 className="auth-form__title">{title}</h1>
      <form name={formName} id={formName} className="form" onSubmit={onSubmit}>
        <div className="auth-form__input-container">{children}</div>

        <div className="auth-form__error-container">{error} </div>
        <div className="auth-form__button-container">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`auth-form__save-button ${
              isFormValid ? "" : "auth-form__save-button_inactive"
            }`}
          >
            {buttonText ? buttonText : "Сохранение"}
          </button>
          <div className="auth-form__footer">{footerText}</div>
        </div>
      </form>
    </main>
  );
}

export default AuthForm;
