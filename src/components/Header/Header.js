// Header — компонент, который отрисовывает шапку сайта на страницу.
/*
Шапка на главной странице, как и на других страницах, должна менять отображение, 
если пользователь авторизован или не авторизован. Такое поведение нужно сразу 
предусмотреть в вёрстке, даже несмотря на то, что сама авторизация ещё не реализована.
*/

import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Navigation from "./Navigation/Navigation";
import Burger from "./Burger/Burger";
import logoMovies from "../../images/logo.svg";
import { PAGES } from "../../utils/const";

function Header({ loggedIn, classSfx }) {


  return (
    <header className={`header ${classSfx ? `header__${classSfx}`: ""}`}>
      <div className="header__container">
        <Link className="header__logo" to={"/"}>
          <img src={logoMovies} alt="Логотип" className="" />
        </Link>
        {loggedIn ? (
          <>
            <div className="header__navigation">
              <Navigation classSfx={classSfx} />
            </div>
            <div className="header__burger">
              <Burger classSfx={classSfx}/>
            </div>
          </>
        ) : (
          <nav className="header__wrapper">
            <Link
              className="header__button header__register"
              to={PAGES.REGISTER}
            >
              Регистрация
            </Link>
            <Link className="header__button header__login" to={PAGES.LOGIN}>
              Войти
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
