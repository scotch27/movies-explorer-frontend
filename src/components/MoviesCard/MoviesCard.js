// MoviesCard — компонент одной карточки фильма.

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ card }) {

  const cardLikeButtonClassName = `card__like ${
    card.saved && "card__like_active"
  }`;

  function handleLikeClick() {
    card.saved = !card.saved;
    console.log(card);
  }


  return (
    <li className="card">
      <a
        href={card.image}
        className="card__link"
        target="_blank"
        rel="noreferrer"
      >
        <img className="card__image" alt={card.nameRU} src={card.image} />
      </a>

      <div className="card__container">
        <div className="card__info">
          <h2 className="card__text">{card.nameRU}</h2>
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          />
        </div>
        <div className="card__duration">{card.duration}</div>
      </div>
    </li>
  );
}

export default MoviesCard;
