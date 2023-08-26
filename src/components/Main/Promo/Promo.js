// Promo — компонент с вёрсткой баннера страницы «О проекте».

import "./Promo.css";
import landingLogo from "../../../images/landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a className="promo__link" href="#project">
          Узнать больше
        </a>
        <img className="promo__logo" src={landingLogo} alt="Логотип web" />
      </div>
    </section>
  );
}

export default Promo;
