// Main — компонент страницы «О проекте»

import './Main.css';
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";

function Main() {
  return (
    <div className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </div>
  );
}

export default Main;


/*
Promo — компонент с вёрсткой баннера страницы «О проекте».
NavTab — компонент с навигацией по странице «О проекте».
AboutProject — компонент с описанием дипломного проекта.
Techs — компонент с использованными технологиями.
AboutMe — компонент с информацией о студенте.
Portfolio — компонент со ссылками на другие проекты.
*/