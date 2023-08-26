// AboutProject — компонент с описанием дипломного проекта.

import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project" id="project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__container">
        <div className="project__content">
          <div className="project__info">
            <h3 className="project__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="project__description">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="project__info">
            <h3 className="project__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="project__description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="project__plan">
          <h3 className="project__plan-time project__plan-time_active">
            1 неделя
          </h3>
          <h3 className="project__plan-time">4 недели</h3>
          <p className="project__plan-description">Back-end</p>
          <p className="project__plan-description">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
