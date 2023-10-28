import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Moment from "react-moment";
import Cookies from "js-cookie";
import _debounce from "lodash/debounce";

import PopularTag from "../components/PopularTag";
import { HeaderVertical } from "../components/Header";
import Footer from "../components/Footer";
import ListUnFollowUser from "../components/ListUnFollowUser";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import Message from "../components/Message";
import EmptyData from "../components/EmptyData";

import {
  listArticle,
  unFavoriteArticle,
  favoriteArticle,
  listArticleLoadMore,
} from "../actions/articleActions";

import "../css/ListArticle.css";
import "../css/ArticlesByTagScreen.css";
import Img36x36 from "../image/36x36.png";
import Img112x112 from "../image/112x112.png";

function ArticlesByTagScreen() {
  let { tag } = useParams();
  let newTag = tag
    .split("-")
    .map((item) => item[0].toUpperCase() + item.substring(1))
    .join(" ");
  tag = tag.split("-").join(" ");

  let token = Cookies.get("token");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const articleFavorite = useSelector((state) => state.articleFavorite);

  const articleUnFavorite = useSelector((state) => state.articleUnFavorite);

  const articleList = useSelector((state) => state.articleList);

  const articleListLoadMore = useSelector((state) => state.articleListLoadMore);

  const userUnFollowList = useSelector((state) => state.userUnFollowList);

  const tagList = useSelector((state) => state.tagList);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const {
    loading,
    articles: { articles, page, pages, total, totalAuthor, authImages },
  } = articleList;

  const [pageArticleTag, setPageArticleTag] = useState(1);

  useEffect(() => {
    if (pageArticleTag === 1) {
      dispatch(listArticle(tag, pageArticleTag, "", "", token));
    } else {
      dispatch(
        listArticleLoadMore(
          token,
          `/api/articles?limit=20&offset=${pageArticleTag}&tag=${tag}`,
          "global-list"
        )
      );
    }
  }, [dispatch, pageArticleTag, navigate, tag, token]);

  useEffect(() => {
    if (
      articleList.error ||
      articleListLoadMore.error ||
      userUnFollowList.error ||
      tagList.error
    ) {
      navigate("/login")
    }
  }, [articleList, articleListLoadMore, userUnFollowList, tagList, navigate]);

  function tagHandle(str) {
    return str.split(" ").join("-");
  }
  return (
    <div className="position-relative">
      {articleFavorite.error && (
        <Message variant="danger">{articleFavorite.error}</Message>
      )}
      {articleUnFavorite.error && (
        <Message variant="danger">{articleUnFavorite.error}</Message>
      )}
      <div className="articlesByTagScreen-component d-flex justify-content-between">
        <aside className="col-1 position-relative">
          <HeaderVertical />
        </aside>
        <div className="col-8 d-flex justify-content-center">
          <div className="col-10" id="list-article">
            <div className="d-flex align-items-center my-3 pb-3 border-bottom">
              <div className="btn me-2 icon-tag rounded-circle bg-opacity-25 bg-secondary">
                <i className="fa fa-tag" aria-hidden="true"></i>
              </div>
              <div className="font-text title-page">{newTag}</div>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <div className="articles-component">
                {articles && articles.length !== 0 ? (
                  <>
                    {articles.map((article, index) => {
                      return (
                        <div
                          key={index}
                          className="article py-4 border-1 border-bottom">
                          <div className="col-12">
                            <Link
                              to={`/profile/${article.auth_name}`}
                              className="text-decoration-none text-dark">
                              <div className="author d-flex">
                                <div>
                                  <img
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null; // prevents looping
                                      currentTarget.src = Img36x36;
                                    }}
                                    src={article.auth_image}
                                    alt="avt-author"
                                    className="img-fluid rounded-circle me-1 border"
                                  />
                                </div>
                                <div className="name d-flex align-items-center fw-bold">
                                  {article.auth_name}
                                </div>
                              </div>
                              <div className="date mx-2 mb-2">.</div>
                              <div className="date">
                                <OverlayTrigger
                                  trigger={["hover", "focus"]}
                                  placement="bottom"
                                  overlay={
                                    <Tooltip className="date">
                                      <Moment format="ddd, MMM DD YYYY HH:mm">
                                        {article.createdAt}
                                      </Moment>
                                    </Tooltip>
                                  }>
                                  <Moment fromNow>{article.createdAt}</Moment>
                                </OverlayTrigger>
                              </div>
                            </Link>
                          </div>
                          <div className="d-flex">
                            <div className="col-9">
                              <div className="title-description">
                                <Link
                                  to={`/article/${article.slug}`}
                                  className="text-decoration-none text-black"
                                  key={index}>
                                  <div className="title fw-bold">
                                    {article.title}
                                  </div>
                                  <div className="description font-text  mt-1">
                                    {article.description}
                                  </div>
                                </Link>
                              </div>
                              <div className="d-flex mt-1 justify-content-between align-items-center">
                                <div className="d-flex align-items-center flex-wrap">
                                  {article.tagList.map((tag) => {
                                    return (
                                      <Link
                                        to={`/tag/${tagHandle(tag)}`}
                                        className="text-decoration-none me-1 mb-1"
                                        key={tag}>
                                        <div
                                          key={tag}
                                          className="tag rounded-pill px-2 py-1 text-center">
                                          {tag}
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                                <div className="d-flex align-items-center">
                                  {article.favorited ? (
                                    <OverlayTrigger
                                      trigger={["hover", "focus"]}
                                      placement="top"
                                      overlay={<Tooltip>Unfavorite</Tooltip>}>
                                      <div
                                        className="btn-like"
                                        onClick={_debounce(
                                          () => {
                                            if (token && userInfo) {
                                              dispatch(
                                                unFavoriteArticle(
                                                  article.slug,
                                                  token,
                                                  "list"
                                                )
                                              );
                                            } else {
                                              navigate("/login");
                                            }
                                          },
                                          100,
                                          { maxWait: 60000 }
                                        )}>
                                        <i className="fa fa-heart"></i>
                                      </div>
                                    </OverlayTrigger>
                                  ) : (
                                    <OverlayTrigger
                                      trigger={["hover", "focus"]}
                                      placement="top"
                                      overlay={<Tooltip>Favorite</Tooltip>}>
                                      <div
                                        className="btn-like"
                                        onClick={_debounce(
                                          () => {
                                            if (token && userInfo) {
                                              dispatch(
                                                favoriteArticle(
                                                  article.slug,
                                                  token,
                                                  "list"
                                                )
                                              );
                                            } else {
                                              navigate("/login");
                                            }
                                          },
                                          100,
                                          { maxWait: 60000 }
                                        )}>
                                        <i className="fa fa-heart-o"></i>
                                      </div>
                                    </OverlayTrigger>
                                  )}
                                  <div className="ms-2">
                                    {article.favoriteCount}
                                  </div>
                                  <Link
                                    to={`/article/${article.slug}`}
                                    className="text-decoration-none text-black d-flex">
                                    <div className="ms-2">
                                      <i
                                        className="fa fa-comments-o"
                                        aria-hidden="true"></i>
                                    </div>
                                    <div className="ms-2">
                                      {article.commentList.length}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className="col-3">
                              <Link
                                to={`/article/${article.slug}`}
                                className="text-decoration-none text-black d-flex justify-content-center">
                                <img
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = Img112x112;
                                  }}
                                  src={article.thumbnail_url}
                                  alt="img-article"
                                  className="img-fluid border thumbnail"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {articleListLoadMore && articleListLoadMore.loading ? (
                      <Loader />
                    ) : (
                      page &&
                      pages &&
                      pages > 1 &&
                      page < pages && (
                        <div className="d-flex justify-content-center">
                          <div
                            className="btn my-3 col-5 text-white bg-dark rounded-0 font-btn"
                            onClick={() => {
                              setPageArticleTag((prev) => prev + 1);
                            }}>
                            Load More
                          </div>
                        </div>
                      )
                    )}
                  </>
                ) : (
                  <EmptyData />
                )}
              </div>
            )}
          </div>
        </div>
        <aside className="col-3 position-relative">
          <div className="popular-tag p-4 border-start">
            {!userInfo && (
              <div className="btn-author-no-signIn d-flex justify-content-between">
                <div className="col-8">
                  <Link to="/register">
                    <div className="col-12 btn font-btn text-white rounded-pill fw-bold btn-dark">
                      Get Started
                    </div>
                  </Link>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <Link to="/login">
                    <div className="btn font-btn btn-white text-success fw-bold">
                      Sign In
                    </div>
                  </Link>
                </div>
              </div>
            )}
            <div className="mt-2 ms-1 pb-4 border-bottom">
              <SearchBox />
            </div>
            {total && authImages && (
              <div className="pb-3 border-bottom">
                <div className="info-article-tag d-flex ms-1 mb-2">
                  <div className="col-6 num-article">
                    <div className="number font-text title-page">{total}</div>
                    <div className="type font-text">
                      {total > 1 ? "Articles" : "Article"}
                    </div>
                  </div>
                  <div className="col-6 num-author">
                    <div className="number font-text title-page">
                      {totalAuthor}
                    </div>
                    <div className="type font-text">
                      {authImages.length > 1 ? "Writers" : "Writer"}
                    </div>
                  </div>
                </div>
                <div className="list-auth mt-3">
                  {authImages &&
                    authImages.length > 0 &&
                    authImages.map((item, index) => {
                      return (
                        <img
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = Img36x36;
                          }}
                          key={index}
                          src={item}
                          alt="avt-auth"
                          className="img-fluid rounded-circle"
                          id={`auth-${index + 1}`}
                        />
                      );
                    })}
                </div>
              </div>
            )}
            <PopularTag tag={tag} />
            {userUnFollowList.listUnFollow &&
              userUnFollowList.listUnFollow.length > 0 && (
                <div className="mt-2 ms-1 pb-2 border-bottom">
                  <ListUnFollowUser flag="home" />
                </div>
              )}

            <div>
              <Footer />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default ArticlesByTagScreen;
