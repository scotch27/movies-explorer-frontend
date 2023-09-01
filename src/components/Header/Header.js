// Header — компонент, который отрисовывает шапку сайта на страницу.
/*
Шапка на главной странице, как и на других страницах, должна менять отображение, 
если пользователь авторизован или не авторизован. Такое поведение нужно сразу 
предусмотреть в вёрстке, даже несмотря на то, что сама авторизация ещё не реализована.
*/

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Navigation from "./Navigation/Navigation";
import logoMovies from "../../images/logo.svg";
import menuImage from "../../images/menu.svg";
// import profileIcon from "../../images/profile.svg";
import profileIcon from "../../images/profile-icon.svg";
import { PAGES } from "../../utils/const";

function Header({ loggedIn, userData, signOut, isMainPage = false }) {
  // const [isMainPage, setIsMainPage] = useState();

  // const curentLocation = useLocation();

  // console.log(curentLocation.pathname);

  const handleOpen = () => {
    console.log("handleOpen!");
  };

  // React.useEffect(() => {
  //   setIsMainPage(curentLocation.pathname === PAGES.MAIN);
  // }, [curentLocation]);

  return (
    <section className={`header ${isMainPage ? "header__main" : ""}`}>
      {console.log("isMainPage: " + isMainPage)}
      <div className="header__container">
        <Link className="header__logo" to={"/"}>
          <img src={logoMovies} alt="Логотип" className="" />
        </Link>
        {loggedIn ? (
          <>
            <div className="header__navigation">
              <Navigation isMainPage={isMainPage} />
            </div>
            <div className="header__burger">
              <button onClick={handleOpen} className="header__burger-button" />
            </div>
          </>
        ) : (
          <div className="header__wrapper">
            <Link
              className="header__button header__register"
              to={PAGES.REGISTER}
            >
              Регистрация
            </Link>
            <Link className="header__button header__login" to={PAGES.LOGIN}>
              Войти
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Header;
