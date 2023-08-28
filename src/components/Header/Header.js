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
// import profileIcon from "../../images/profile.svg";
import profileIcon from "../../images/profile-icon.svg";

function Header({ loggedIn, userData, signOut }) {
  // const [location, setLocation] = useState({ name: "", link: "" });

  const curentLocation = useLocation();

  loggedIn = true;
  // console.log(curentLocation.pathname);

  // React.useEffect(() => {
  //   if (loggedIn) {
  //     setLocation({ name: "Выйти", link: "" });
  //   } else if (curentLocation.pathname === "/sign-in") {
  //     setLocation({ name: "Регистрация", link: "/sign-up" });
  //   } else {
  //     setLocation({ name: "Войти", link: "/sign-in" });
  //   }
  // }, [curentLocation, loggedIn]);

  const profileMarkup = loggedIn ? (
    <Link
      className={`header__button header__profile ${
        curentLocation.pathname === "/" ? "header__profile_main" : ""
      }`}
      to={"/profile"}
    >
      <span className=" header__profile-text">Аккаунт</span>
      <img className="header__profile-icon" src={profileIcon} alt="Аккаунт" />
    </Link>
  ) : (
    <>
      <Link className="header__button header__register" to={"/signup"}>
        Регистрация
      </Link>
      <Link className="header__button header__login" to={"/signin"}>
        Войти
      </Link>
    </>
  );

  return (
    <section className="header">
      <div className="header__container">
        <Link className="header__logo" to={"/"}>
          <img src={logoMovies} alt="Логотип" className="" />
        </Link>

        {/* {loggedIn && <Navigation />} */}
        <div className="header__wrapper">{profileMarkup}</div>
      </div>
    </section>
  );
}

export default Header;
