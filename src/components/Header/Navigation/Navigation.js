// Navigation — компонент, который отвечает за меню навигации на сайте.

import { Link } from "react-router-dom";
import "./Navigation.css";
import { PAGES } from "../../../utils/const";

function Navigation({isMainPage}) {
  const buttonClasses = `navigation__button ${
    isMainPage === true ? "navigation__button-main" : ""
  }`;

  return (
    <div className="navigation">
      <div className="navigation__container">
        <Link className={`${buttonClasses} navigation__films`} to={PAGES.MOVIES}>
          Фильмы
        </Link>
        <Link
          className={`${buttonClasses} navigation__myfilms`}
          to={PAGES.SAVED_MOVIES}
        >
          Сохранённые фильмы
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
