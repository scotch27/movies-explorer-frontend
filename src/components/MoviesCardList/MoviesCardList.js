// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.

import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { SHOW_CARDS } from "../../utils/const";

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
    console.log("getInitialCardCount: screenWidth " + screenWidth);
    console.log("getInitialCardCount: SHOW_CARDS " + SHOW_CARDS.length);
    for (let i = 0; i < SHOW_CARDS.length; i++) {
      
      console.log("getInitialCardCount: " + SHOW_CARDS[i].initial);
      if (screenWidth > SHOW_CARDS[i].width) {
        console.log("getInitialCardCount: " + SHOW_CARDS[i].initial);
        return SHOW_CARDS[i].initial;
      }
    }
  }

  function getShowMoreCardCount() {
    const screenWidth = window.innerWidth;
    console.log("getShowMoreCardCount: screenWidth " + screenWidth);
    for (let i = 0; i < SHOW_CARDS.length; i++) {
      
      console.log("getInitialCardCount: " + SHOW_CARDS[i].initial);
      if (screenWidth > SHOW_CARDS[i].width) {
        console.log("getShowMoreCardCount: " + SHOW_CARDS[i].initial);
        return SHOW_CARDS[i].showMore;
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (!isSaved) {
        function handleResize() {
          setShowCardsCount(getInitialCardCount());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, 500);
  });

  return (
    <section className="cards">
      <>
        <ul className="cards__list">
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
