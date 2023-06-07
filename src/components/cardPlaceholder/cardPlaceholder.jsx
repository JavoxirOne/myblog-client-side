import React from "react";
import "./cardPlaceholder.css";

const CardPlaceholder = () => {
  return (
    <div className="card-placeholder">
      <div className="card-placeholder__container">
        <div className="card-placeholder__details">
          <div className="card-placeholder__details-top">
            <div className="card-placeholder__category"></div>
            <div className="card-placeholder__date"></div>
            <div className="card-placeholder__views"></div>
          </div>
          <div className="card-placeholder__title"></div>
          <div className="card-placeholder__description"></div>
        </div>
        <div className="card-placeholder__img"></div>
      </div>
    </div>
  );
};

export default CardPlaceholder;
