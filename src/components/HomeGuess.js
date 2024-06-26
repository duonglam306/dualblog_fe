import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HeaderGuess from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Trending from "../components/Trending";
import ListArticleGlobalFeed from "../components/ListArticle";
import PopularTag from "../components/PopularTag";

import "../css/HomeScreen.css";
import { useEffect } from "react";

const HomeGuess = () => {
  const tagList = useSelector((state) => state.tagList);
  const articleListLoadMore = useSelector((state) => state.articleListLoadMore);
  const articlePopularList = useSelector((state) => state.articlePopularList);
  const articleList = useSelector((state) => state.articleList);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      tagList.error ||
      articleList.error ||
      articleListLoadMore.error ||
      articlePopularList.error
    ) {
      navigate("/login");
    }
  }, [tagList, articleList, articlePopularList, articleListLoadMore, navigate]);

  return (
    <>
      <HeaderGuess />
      <Banner />
      <Trending />
      <div className="homeScreen-component mt-5">
        <div className="container d-flex justify-content-between">
          <div className="col-7" id="list-article">
            <ListArticleGlobalFeed />
          </div>
          <aside className="col-4 position-relative">
            <div className="popular-tag">
              <div className="font-subject fw-bold">
                DISCOVER MORE OF WHAT MATTERS TO YOU
              </div>
              <PopularTag />
              <div>
                <Footer />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};
export default HomeGuess;
