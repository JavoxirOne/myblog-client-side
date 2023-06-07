import { useState, useEffect } from "react";
import "./index.css";
import Home from "./pages/home/home";
import Detail from "./pages/detail/detail";
import Category from "./pages/category/category";
import Footer from "./components/footer/footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomSwitch from "./components/customSwitch/customSwitch";
import axios from "axios";
import Header from "./components/header/header";
import ScrollToTop from "./components/scrollToTop/scrollToTop";
import Loader from "./components/loader/loader";
import config from "./config";
import { useCategories } from "./hooks/useCategory";
function App() {
  const categories = useCategories()
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Router>
      {loading && <Loader />}
      {!loading && (
        <>
          <Header categories={categories} />
          
          <ScrollToTop />
          <CustomSwitch>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Detail />} />
            <Route path="/category/:id" element={<Category />} />
          </CustomSwitch>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
