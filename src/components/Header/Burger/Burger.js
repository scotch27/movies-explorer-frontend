import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import "./Burger.css";

function Burger({ classSfx }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    console.log("Burger handleOpen!");
  };

  const handleClose = () => {
    setIsOpen(false);
    console.log("Burger handleClose!");
  };

  return (
    <div className="burger">
      <button
        type="button"
        onClick={handleOpen}
        className={`burger__button ${
          classSfx ? `burger__button_${classSfx}` : ""
        }`}
      />
      <div
        className={`burger__popup ${isOpen && "burger__popup_open"}`}
        id={`popup-burger`}
      >
        <button
          type="button"
          className="burger__close-button"
          aria-label="Закрыть"
          onClick={handleClose}
        />
        <Navigation classSfx="burger" />
      </div>
    </ div>
  );
}

export default Burger;
