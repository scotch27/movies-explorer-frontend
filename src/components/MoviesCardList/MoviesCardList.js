// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.

import React, { useState } from "react";
import "./MoviesCardList.css";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards, type =""}) {
  const [isLoading, setIsLoading] = useState(false);
  const [islimit, setIslimit] = useState(false);

//   const cards = undefined;
  function showMore() {
    console.log("showMore");
    setIslimit(true);
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {cards === undefined || cards.length === 0 ? (
        <div className="cards__error-container">
          <div className="cards__error">Ничего не найдено</div>
        </div>
      ) : (
        <>
          <ul className="cards__list">
            {cards.map((card) => (
              <MoviesCard key={card.id} card={card}  type={type}/>
            ))}
          </ul>
          <div className="cards__button-container">
            <button
              type="button"
              disabled={islimit ? true : false}
              className={`cards__button ${
                islimit ? "cards__button_inactive" : ""
              }`}
              onClick={showMore}
            >
              Ещё
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
