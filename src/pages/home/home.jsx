import React from "react";
import Card from "../../components/card/card";
import { useState, useEffect } from "react";
import axios from "axios";
import CardPlaceholder from "../../components/cardPlaceholder/cardPlaceholder";
import config from "../../config";
import CardPlaceholderList from "../../components/cardPlaceholderList/cardPlaceholderList";
const Home = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  

  useEffect(() => {
    const articlesUrl = config.apiHost + "/api/v1/article/";
    const categoriesUrl = config.apiHost + "/api/v1/category/";

    const fetchData = async () => {
      const [resultArticles, resultCategories] = await axios.all([
        axios.get(articlesUrl),
        axios.get(categoriesUrl),
      ]);
      setArticles(resultArticles.data);
      setCategories(resultCategories.data);
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  

  return (
    <>
      {!isLoaded ? (
        <CardPlaceholderList />
      ) : (
        <div>
          {categories
            .filter((category) =>
              articles.some((article) => article.category.id === category.id)
            )
            .map((category) => (
              <section className="news" key={category.id}>
                <div className="container">
                  <h3 className="news__title">{category.title}</h3>
                  {articles.map((article) => {
                    if (article.category.id === category.id) {
                      return <Card article={article} key={article.id} />;
                    }
                  })}
                </div>
              </section>
            ))}
        </div>
      )}
    </>
  );
};

export default Home;
