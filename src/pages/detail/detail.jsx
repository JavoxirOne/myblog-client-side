import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/card/card";
import axios from "axios";
import config from "../../config";
import moment from "moment";
const Detail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [recArticles, setRecArticles] = useState([]);
  const convertTimestampToDateString = (timestamp) => {
    return (moment(timestamp).format("DD MMM YYYY") + "").toUpperCase();
  };
  useEffect(() => {
    // get the article details and recommended articles data from the backend
    axios
      .get(`${config.apiHost}/api/v1/article/${id}`)
      .then((response) => {
        setArticle(response.data.article);
        setRecArticles(response.data.recommended_articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleClickRecommendedArticle = (articleId) => {
    // get the new details of the clicked recommended article
    axios
      .get(`${config.apiHost}/api/v1/article/${articleId}`)
      .then((response) => {
        setArticle(response.data.article);
        setRecArticles(response.data.recommended_articles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <section className="article">
        <div className="container">
          <div className="article__img">
            <img
              src={config.apiHost + article.image}
              alt={article.title}
              width="100%"
            />
          </div>
          
          <div>
            <h3 className="article__title">{article.title}</h3>
          </div>
          <div style={{display: 'flex', gap: '32px', marginBottom: '16px'}}>
            <div style={{ color: "#bababa" }}>
              <FontAwesomeIcon icon={faEye} /> {article.views}
            </div>
            <div style={{ color: "#bababa" }}>
              {convertTimestampToDateString(article.created_at)}
            </div>
            <div style={{ color: "#bababa" }}>
              {article.category.title.toUpperCase()}
            </div>
          </div>
          <div
            className="article__content"
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
        </div>
      </section>
      <div className="container">
        <div className="article__share">
          <strong>Share:</strong>
          <a
            href={`https://t.me/share/url?text="Hey, check it out!"&url=${window.location.href}`}
            className="main-btn"
            target="_blank"
            style={{ backgroundColor: "#39a5ff" }}
          >
            Telegram
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            className="main-btn"
            target="_blank"
            style={{ backgroundColor: "#2d54e2" }}
          >
            Facebook
          </a>
        </div>
        <div className="rec-line"></div>
      </div>
      <section className="rec">
        <div className="container">
          <h3 className="news__title">Other interesting posts</h3>
          <div className="rec__content">
            {recArticles.map((article) => (
              <Card
                article={article}
                onClick={() => handleClickRecommendedArticle(article.id)}
                key={article.id}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detail;
