// Navigation — компонент, который отвечает за меню навигации на сайте.

import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({isMainPage}) {
  const buttonClasses = `navigation__button ${
    isMainPage === true ? "navigation__button-main" : ""
  }`;

  return (
    <div className="navigation">
      <div className="navigation__container">
        <Link className={`${buttonClasses} navigation__films`} to={"/movies"}>
          Фильмы
        </Link>
        <Link
          className={`${buttonClasses} navigation__myfilms`}
          to={"/saved-movies"}
        >
          Сохранённые фильмы
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
