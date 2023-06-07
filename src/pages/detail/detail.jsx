import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faPinterest,
  faReddit,
  faTelegram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import Card from "../../components/card/card";
import axios from "axios";
import config from "../../config";
import moment from "moment";
import ArticleDetailPlaceholder from "../../components/articleDetailPlaceholder/articleDetailPlaceholder";
import CardPlaceholderList from "../../components/cardPlaceholderList/cardPlaceholderList";
const Detail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [recArticles, setRecArticles] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [isArticleLoaded, setIsArticleLoaded] = useState(false);
  const [isRecArticlesLoaded, setIsRecArticlesLoaded] = useState(false);

  const convertTimestampToDateString = (timestamp) => {
    return (moment(timestamp).format("DD MMM YYYY") + "").toUpperCase();
  };
  useEffect(() => {
    // get the article details and recommended articles data from the backend
    axios
      .get(`${config.apiHost}/api/v1/article/${id}`)
      .then((response) => {
        console.log(response.data.article);
        setCategoryTitle(response.data.article.category.title);
        setArticle(response.data.article);
        setIsArticleLoaded(true);
        setRecArticles(response.data.recommended_articles);
        setIsRecArticlesLoaded(true);
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
        console.log(response.data.article);
        setCategoryTitle(response.data.article.category.title);
        setArticle(response.data.article);
        setIsArticleLoaded(true);
        setRecArticles(response.data.recommended_articles);
        setIsRecArticlesLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isArticleLoaded ? (
        
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
            <div style={{ display: "flex", gap: "32px", marginBottom: "16px" }}>
              <div style={{ color: "#bababa" }}>
                <FontAwesomeIcon icon={faEye} /> {article.views}
              </div>
              <div style={{ color: "#bababa" }}>
                {convertTimestampToDateString(article.created_at)}
              </div>
              <div style={{ color: "#bababa" }}>
                {categoryTitle.toUpperCase()}
              </div>
            </div>
            <div
              className="article__content"
              dangerouslySetInnerHTML={{ __html: article.description }}
            />
          </div>
        </section>
      ) : (
        <ArticleDetailPlaceholder />
      )}

      <section className="actions">
        <div className="container">
          <div className="article__share">
            {/* <strong style={{color: "#1f2949"}}>Share:</strong> */}
            <a
              href={`https://t.me/share/url?text="Hey, check it out!"&url=${window.location.href}`}
              target="_blank"
              style={{ backgroundColor: "transparent", fontSize: "32px" }}
            >
              <FontAwesomeIcon
                icon={faTelegram}
                bounce
                style={{ color: "#239AD6" }}
              />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              style={{ backgroundColor: "transparent", fontSize: "32px" }}
            >
              <FontAwesomeIcon
                icon={faFacebook}
                bounce
                style={{ color: "#0080FF" }}
              />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}&text="Hey, check it out!"`}
              target="_blank"
              style={{ backgroundColor: "transparent", fontSize: "32px" }}
            >
              <FontAwesomeIcon
                icon={faTwitter}
                bounce
                style={{ color: "#1C9CEA" }}
              />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title="Hey, check it out!"`}
              target="_blank"
              style={{ backgroundColor: "transparent", fontSize: "32px" }}
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                bounce
                style={{ color: "#0073AF" }}
              />
            </a>
            <a
              href={`https://pinterest.com/pin/create/button/?url=${
                window.location.href
              }&media=${
                config.apiHost + article.image
              }&description="Hey, check it out. The article from Javohir's personal blog!"`}
              target="_blank"
              style={{ backgroundColor: "transparent", fontSize: "32px" }}
            >
              <FontAwesomeIcon
                icon={faPinterest}
                bounce
                style={{ color: "#bd081c" }}
              />
            </a>
            <a
              href={`https://www.reddit.com/submit?url=${window.location.href}&title="Hey, check it out!"`}
              target="_blank"
              style={{ backgroundColor: "transparent", fontSize: "32px" }}
            >
              <FontAwesomeIcon
                icon={faReddit}
                bounce
                style={{ color: "#ff4500" }}
              />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${window.location.href}`}
              target="_blank"
              style={{ backgroundColor: "transparent", fontSize: "32px" }}
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                bounce
                style={{ color: "#25d366" }}
              />
            </a>
          </div>
          {/* <div className="rec-line"></div> */}
        </div>
      </section>

      {isRecArticlesLoaded ? (
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
      ) : (
        <CardPlaceholderList />
      )}
    </>
  );
};

export default Detail;
