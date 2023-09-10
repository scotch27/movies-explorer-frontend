import React from "react";
import "./ErrorMessage.css";

function ErrorMessage({ message }) {
 
  return (
    <section className="error-message">
      {message && (
        <div className="error-message__container">
          <div className="error-message__text">{message}</div>
        </div>
      )}
    </section>
  );
}

export default ErrorMessage;
