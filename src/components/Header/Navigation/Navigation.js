// Navigation — компонент, который отвечает за меню навигации на сайте.

import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import { PAGES } from "../../../utils/const";
import profileIcon from "../../../images/profile-icon.svg";

function Navigation({ isMainPage }) {
  const buttonClasses = (isActive) =>
    `navigation__button ${isActive ? "navigation__button_active" : ""} ${
      isMainPage === true ? "navigation__button-main" : ""
    }`;

  return (
    <section className="navigation">
      <nav className="navigation__container">
        <NavLink
          to={PAGES.MOVIES}
          className={({ isActive }) => buttonClasses(isActive)}
        >
          Фильмы
        </NavLink>
        <NavLink
          className={({ isActive }) => buttonClasses(isActive)}
          to={PAGES.SAVED_MOVIES}
        >
          Сохранённые фильмы
        </NavLink>
      </nav>
      <div className="navigation__wrapper">
        <Link
          className={`navigation__button navigation__profile ${
            isMainPage ? "navigation__profile_main" : ""
          }`}
          to={PAGES.PROFILE}
        >
          <span className="navigation__profile-text">Аккаунт</span>
          <img
            className="navigation__profile-icon"
            src={profileIcon}
            alt="Аккаунт"
          />
        </Link>
      </div>
    </section>
  );
}

export default Navigation;
