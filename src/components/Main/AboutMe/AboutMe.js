// AboutMe — компонент с информацией о студенте.

import "./AboutMe.css";
import avatar from "../../../images/avatar.png";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__content">
          <h3 className="about-me__subtitle">Виталий</h3>
          <h4 className="about-me__caption">Фронтенд-разработчик, 30 лет</h4>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/scotch27"
            className="about-me__github"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={avatar} className="about-me__avatar" alt="Фотография студента Виталия" />
      </div>
    </section>
  );
}

export default AboutMe;
