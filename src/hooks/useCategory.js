import { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(config.apiHost + "/api/v1/category/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return categories;
};