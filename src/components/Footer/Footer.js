// Footer — презентационный компонент, который отрисовывает подвал.

import "./Footer.css";

function Footer() {
  return (
    <section className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <ul className="footer__menu">
          <li className="footer__item">
            <a
              href="https://practicum.yandex.ru"
              rel="noreferrer"
              target="_blank"
              className="footer__link"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a
              href="https://github.com/scotch27"
              rel="noreferrer"
              target="_blank"
              className="footer__link"
            >
              Github
            </a>
          </li>
        </ul>
        <p className="footer__copyright">
          © {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}

export default Footer;
