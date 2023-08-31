// Navigation — компонент, который отвечает за меню навигации на сайте.

import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { PAGES } from "../../../utils/const";

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
    </section>
  );
}

export default Navigation;
