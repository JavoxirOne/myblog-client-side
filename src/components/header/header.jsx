import React from "react";
import myblog from "../../assets/myblog.jpg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from 'moment'

const Header = ({ categories }) => {
  console.log(categories)
  return (
    <header className="header">
      <div className="header__content">
        <nav className="navbar">
          <div className="container-lg">
            <div className="navbar-content">
              <div>
                <Link to={"/"} className="header__logo">
                  <img
                    src={myblog}
                    alt=""
                    width="64px"
                    height="64px"
                    style={{ borderRadius: "100%" }}
                  />
                  <div className="header__logo-text">
                    <span>javohir nurmatjonov</span>
                    <small>Personal blog</small>
                  </div>
                </Link>
              </div>
              <ul className="header__navigation">
                {categories.map((category) => (
                  <li className="list__item" key={category.id}>
                    <Link
                      to={"/category/" + category.id}
                      className="item__link"
                      state={{ id: category.id }}
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div>
                <a href="" className="main-btn">
                  Subscribe
                </a>
              </div>
            </div>
          </div>
        </nav>
        <section className="home">
          <div className="container">
            <div className="home__content">
              <small className="home__subtitle">
              👋 HELLO
              </small>
              <h1 className="home__title">
              Insights about my personal and work life, and the in-betweens
              </h1>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header;
