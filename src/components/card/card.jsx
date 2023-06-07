import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";
const Card = ({ article }) => {
  const convertTimestampToDateString = (timestamp) => {
    return moment(timestamp).format("DD MMM YYYY");
  };
  function updateViews(article_id, inc_views) {
    axios
      .put(`${config.apiHost}/api/v1/article/${article_id}/`, {
        views: inc_views + 1,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div
      className="card"
      onClick={() => updateViews(article.id, article.views)}
    >
      <div className="card__container">
        <div className="card__content">
          <div className="card__header">
            <div>
              <a href="" className="main-badge">
                {article.category.title}
              </a>
            </div>
            <div className="card__date">
              {convertTimestampToDateString(article.created_at)}
            </div>
            <div className="card__views">
              <FontAwesomeIcon icon={faEye} /> {article.views}
            </div>
          </div>
          <div className="card__body">
            <h3 className="card__title">
              <Link
                to={`/article/${article.id}`}
                className="card__title-link"
              >
                {article.title}
              </Link>
            </h3>
            <p className="card__text">
              {article.description_lite.substring(0, 100)}
            </p>
          </div>
        </div>
        <div
          className="card__img"
          style={{
            backgroundImage:
              "url('" + config.apiHost + article.image + "')",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Card;
