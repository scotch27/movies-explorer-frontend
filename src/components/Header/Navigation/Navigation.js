// Navigation — компонент, который отвечает за меню навигации на сайте.

import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import { PAGES } from "../../../utils/const";
import profileIcon from "../../../images/profile-icon.svg";

function Navigation({ classSfx }) {
  const addClassName = (className) =>
    className + (classSfx ? ` ${className}_${classSfx}` : "");

  const buttonClasses = (isActive) =>
    `${addClassName("navigation__button")} ${
      isActive ? " navigation__button_active" : ""
    }`;

  return (
    <div className={addClassName("navigation")}>
      <nav className={addClassName("navigation__container")}>
      <NavLink
          to={PAGES.MAIN}
          className={({ isActive }) => `navigation__button_home ${buttonClasses(isActive)}`}
        >
          Главная
        </NavLink>

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
      <div className={addClassName("navigation__wrapper")}>
        <Link
          className={
            "navigation__button " + addClassName("navigation__profile")
          }
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
    </div>
  );
}

export default Navigation;
