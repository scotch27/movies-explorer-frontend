// Navigation — компонент, который отвечает за меню навигации на сайте.

import "./Navigation.css";

function Navigation() {
  return (
    <div className="navigation">
      <div className="navigation__container">
        <a className="navigation__films" href="/">Фильмы</a>
        <a className="navigation__myfilms" href="/">Сохранённые фильмы</a>
      </div>
    </div>
  );
}

export default Navigation;
