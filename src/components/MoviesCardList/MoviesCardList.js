// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// Количество карточек, которые отображаются на странице, зависит от ширины экрана устройства.
// Ширина 1280px — 4 ряда карточек. Кнопка «Ещё» загружает дополнительный ряд карточек.
// Ширина 768px — 4 ряда карточек. Кнопка «Ещё» загружает дополнительный ряд карточек.
// Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки.

import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards, isSaved = false, onSaveCard, onDeleteCard }) {
  const [showCardsCount, setShowCardsCount] = useState(getInitialCardCount());

  //   const cards = undefined;
  function showMore() {
    setShowCardsCount(showCardsCount + getShowMoreCardCount());
    console.log("showMore");
    // setIslimit(true);
  }

  function getInitialCardCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) return 5;
    if (screenWidth < 768) return 4;
    if (screenWidth <= 1010) return 4 * 2;
    if (screenWidth < 1280) return 4 * 3;
    return 4 * 4;
  }

  function getShowMoreCardCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) return 2;
    if (screenWidth < 768) return 1;
    if (screenWidth <= 1010) return 1 * 2;
    if (screenWidth < 1280) return 1 * 3;
    return 1 * 4;
  }

  useEffect(() => {
    if (!isSaved) {
      function handleResize() {
        setShowCardsCount(getInitialCardCount());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  });

  return (
    <section className="cards">
      <>
        <ul className="cards__list">
          {console.log("Length " + showCardsCount)}
          {(isSaved ? cards : cards.slice(0, showCardsCount)).map((card) => (
            <MoviesCard
              key={card.movieId}
              card={card}
              isSaved={isSaved}
              onSaveCard={onSaveCard}
              onDeleteCard={onDeleteCard}
            />
          ))}
        </ul>
        {!isSaved && showCardsCount < cards.length && (
          <div className="cards__button-container">
            <button type="button" className="cards__button" onClick={showMore}>
              Ещё
            </button>
          </div>
        )}
      </>
    </section>
  );
}

export default MoviesCardList;
