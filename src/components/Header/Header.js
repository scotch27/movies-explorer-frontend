// Header — компонент, который отрисовывает шапку сайта на страницу.
/*
Шапка на главной странице, как и на других страницах, должна менять отображение, 
если пользователь авторизован или не авторизован. Такое поведение нужно сразу 
предусмотреть в вёрстке, даже несмотря на то, что сама авторизация ещё не реализована.
*/

import "./Header.css";
import Navigation from "./Navigation/Navigation";
// import { Link, useLocation } from "react-router-dom";
import logoMovies from "../../images/logo.svg";

const auth = false;

function Header() {
  return (
    <section className="header">
      <div className="header__container">
        <img
          src={logoMovies}
          alt="Логотип места в России"
          className="header__logo"
        />
        {auth && <Navigation />}
        <div className="header__wrapper">
          <a className="header__register" href="/">
            Регистрация
          </a>
          <a className="header__login" href="/">
            Войти
          </a>
        </div>
      </div>
    </section>
  );
}

export default Header;
