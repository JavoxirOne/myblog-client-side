import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../../components/card/card";
import axios from "axios";
import CardPlaceholderList from "../../components/cardPlaceholderList/cardPlaceholderList";
import config from "../../config";

const Category = () => {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    axios
      .get(config.apiHost + "/api/v1/article?category_id=" + id)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    axios
      .get(config.apiHost + "/api/v1/category/" + id)
      .then((response) => {
        setCategoryTitle(response.data.title);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [id]);

  return (
    <>
      {isLoaded ? (
        <section className="news">
          <div className="container">
            <h3 className="news__title">{categoryTitle}</h3>
            {articles
              .map((article) => (
                <Card article={article} key={article.id} />
              ))}
          </div>
        </section>
      ) : (
        <CardPlaceholderList />
      )}
    </>
  );
};

export default Category;