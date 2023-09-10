// MoviesCard — компонент одной карточки фильма.

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { durationToString } from "../../utils/utils";

function MoviesCard({ card, type, onSaveCard, onDeleteCard }) {
  const cardLikeButtonClassName = `card__like ${
    card._id && "card__like_active"
  }`;

  function handleLikeClick(e) {
    onSaveCard(card);
  }

  function handleDeleteClick() {
    console.log("Delete card");
    onDeleteCard(card)
  }

  return (
    <li className="card">
      <a
        href={card.trailerLink}
        className="card__link"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          alt={card.nameRU}
          src={card.image}
        />
      </a>

      <div className="card__container">
        <div className="card__info">
          <h2 className="card__text">{card.nameRU}</h2>
          {type === "saved" ? (
            <button
              className="card__delete"
              type="button"
              aria-label="Удалить"
              onClick={handleDeleteClick}
            />
          ) : (
            <button
              className={cardLikeButtonClassName}
              type="button"
              aria-label="Поставить лайк"
              onClick={card._id ? handleDeleteClick : handleLikeClick}
            />
          )}
        </div>
        <div className="card__duration">{durationToString(card.duration)}</div>
      </div>
    </li>
  );
}

export default MoviesCard;
