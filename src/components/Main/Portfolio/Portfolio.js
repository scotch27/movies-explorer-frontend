// Portfolio — компонент со ссылками на другие проекты.

import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__container">
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a
              href="https://github.com/scotch27/how-to-learn"
              rel="noreferrer"
              target="_blank"
              className="portfolio__link"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              href="https://scotch27.github.io/russian-travel/"
              rel="noreferrer"
              target="_blank"
              className="portfolio__link"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__item">
            <a
              href="https://scotch27.github.io/mesto/"
              rel="noreferrer"
              target="_blank"
              className="portfolio__link"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
