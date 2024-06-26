import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Tooltip, OverlayTrigger, Popover } from "react-bootstrap";
import Moment from "react-moment";
import Cookies from "js-cookie";
import _debounce from "lodash/debounce";

import {
  listYourArticle,
  listArticleLoadMore,
  unFavoriteArticle,
  favoriteArticle,
  deleteArticle,
} from "../actions/articleActions";

import Message from "../components/Message";
import Loader from "../components/Loader";
import SearchBox from "../components/SearchBox";
import Footer from "../components/Footer";
import ListUnFollowUser from "../components/ListUnFollowUser";
import EmptyData from "../components/EmptyData";
import { ListArticleTrending } from "../components/ListArticle";
import PopularTag from "../components/PopularTag";
import { HeaderVertical } from "../components/Header";

import "../css/YourArticlesScreen.css";
import "../css/ListArticle.css";
import Img36x36 from "../image/36x36.png";
import Img112x112 from "../image/112x112.png";

function YourArticlesScreen() {
  let token = Cookies.get("token");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const articleYourList = useSelector((state) => state.articleYourList);

  const articleListLoadMore = useSelector((state) => state.articleListLoadMore);

  const tagList = useSelector((state) => state.tagList);

  const articleNewList = useSelector((state) => state.articleNewList);

  const userUnFollowList = useSelector((state) => state.userUnFollowList);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUnFollow = useSelector((state) => state.userUnFollow);

  const userFollow = useSelector((state) => state.userFollow);

  const articleFavorite = useSelector((state) => state.articleFavorite);

  const articleUnFavorite = useSelector((state) => state.articleUnFavorite);

  const articleDelete = useSelector((state) => state.articleDelete);

  const { loading, articles } = articleYourList;

  const [pageYourArticle, setPageYourArticle] = useState(1);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (!userInfo || !token) {
      navigate("/login");
    } else {
      if (pageYourArticle === 1) {
        dispatch(listYourArticle(userInfo.username, pageYourArticle, token));
      } else {
        dispatch(
          listArticleLoadMore(
            token,
            `/api/articles?limit=20&offset=${pageYourArticle}&author=${userInfo.username}`,
            "your-list"
          )
        );
      }
    }
  }, [navigate, userInfo, dispatch, pageYourArticle, token]);

  function tagHandle(str) {
    return str.split(" ").join("-");
  }

  const deleteHandler = () => {
    dispatch(deleteArticle(slug, token, "your-articles"));
    setSlug("");
  };
  useEffect(() => {
    if (
      articleYourList.error ||
      articleListLoadMore.error ||
      tagList.error ||
      articleNewList.error ||
      userUnFollowList.error ||
      userLogin.error
    ) {
      navigate("/login");
    }
  }, [
    navigate,
    articleYourList,
    articleListLoadMore,
    tagList,
    articleNewList,
    userUnFollowList,
    userLogin,
  ]);
  return (
    <div className="position-relative">
      {articleFavorite.error && (
        <Message variant="danger">{articleFavorite.error}</Message>
      )}
      {articleUnFavorite.error && (
        <Message variant="danger">{articleUnFavorite.error}</Message>
      )}
      {articleDelete.error && (
        <Message variant="danger">{articleDelete.error}</Message>
      )}
      {userFollow.error && (
        <Message variant="danger">{userFollow.error}</Message>
      )}
      {userUnFollow.error && (
        <Message variant="danger">{userUnFollow.error}</Message>
      )}
      <div className="modal fade" id="deleteModalYourArticles">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="mx-auto">
                <div className="text-center title font-text">
                  Delete article
                </div>
                <div className="text-center description font-text mb-3">
                  Are you sure you want to delete this article?
                </div>
                <div className="d-flex mx-auto col-6 justify-content-around">
                  <button
                    type="button"
                    className="btn font-btn btn-outline-secondary rounded-pill"
                    data-bs-dismiss="modal">
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn font-btn btn-danger rounded-pill"
                    data-bs-dismiss="modal"
                    onClick={() => deleteHandler()}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="yourArticlesScreen-component d-flex justify-content-between">
        <aside className="col-1 position-relative">
          <HeaderVertical isYourArticlePage={true} />
        </aside>
        <div className="col-8 d-flex justify-content-center">
          <div className="col-10" id="list-article">
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="d-flex align-items-center justify-content-between my-3 pb-3 border-bottom">
                  <div className="font-text title-page">YOUR ARTICLES</div>
                  <Link to="/editor" className="text-decoration-none">
                    <div className="btn btn-success btn-new-article">
                      Write an article
                    </div>
                  </Link>
                </div>
                {userInfo && (
                  <div className="articles-component">
                    {articles &&
                    articles.articles &&
                    articles.articles.length !== 0 ? (
                      <>
                        {articles.articles.map((article, index) => {
                          return (
                            <div
                              key={index}
                              className="article py-4 border-1 border-bottom">
                              <div className="col-12">
                                <Link
                                  to={`/profile/${article.auth_name}`}
                                  className="text-decoration-none text-dark d-flex align-items-center">
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
                                      rootClose
                                      overlay={
                                        <Tooltip className="date">
                                          <Moment format="ddd, MMM DD YYYY HH:mm">
                                            {article.createdAt}
                                          </Moment>
                                        </Tooltip>
                                      }>
                                      <Moment fromNow>
                                        {article.createdAt}
                                      </Moment>
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
                                      <div className="description font-text mt-1">
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
                                          rootClose
                                          overlay={
                                            <Tooltip>Unfavorite</Tooltip>
                                          }>
                                          <div
                                            className="btn-like"
                                            onClick={_debounce(
                                              () => {
                                                if (token && userInfo) {
                                                  dispatch(
                                                    unFavoriteArticle(
                                                      article.slug,
                                                      token,
                                                      "your-list"
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
                                          rootClose
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
                                                      "your-list"
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
                                      <OverlayTrigger
                                        trigger="click"
                                        placement="bottom"
                                        rootClose
                                        overlay={
                                          <Popover id="popover-article">
                                            <Popover.Body>
                                              <Link
                                                to={`/editor/${article.slug}`}
                                                className="text-decoration-none">
                                                <div className="text-dark btn-article mb-2">
                                                  Edit Article
                                                </div>
                                              </Link>
                                              <div
                                                className="btn-article btn-delete"
                                                data-bs-toggle="modal"
                                                data-bs-target="#deleteModalYourArticles">
                                                Delete Article
                                              </div>
                                            </Popover.Body>
                                          </Popover>
                                        }>
                                        <i
                                          className="fa fa-ellipsis-h ms-3"
                                          onClick={() => setSlug(article.slug)}
                                          aria-hidden="true"></i>
                                      </OverlayTrigger>
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
                        {articleListLoadMore && articleListLoadMore.loading && (
                          <Loader />
                        )}
                        {articles.page &&
                          articles.pages &&
                          articles.pages > 1 &&
                          articles.page < articles.pages && (
                            <div className="d-flex justify-content-center">
                              <div
                                className="btn my-3 col-5 text-white bg-dark rounded-0 font-btn"
                                onClick={() => {
                                  setPageYourArticle((prev) => prev + 1);
                                }}>
                                Load More
                              </div>
                            </div>
                          )}
                      </>
                    ) : (
                      <EmptyData />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <aside className="col-3 position-relative">
          <div className="popular-tag p-4 border-start">
            <div className="mt-2 ms-1 pb-4 border-bottom">
              <SearchBox />
            </div>
            {articles && articles.total && articles.totalTag && (
              <div className="pb-1 border-bottom">
                <div className="info-article-tag d-flex ms-1 mb-2">
                  <div className="col-6 num-article">
                    <div className="number font-text title-page">
                      {articles.total}
                    </div>
                    <div className="type font-text">
                      {articles.total > 1 ? "Articles" : "Article"}
                    </div>
                  </div>
                  <div className="col-6 num-author">
                    <div className="number font-text title-page">
                      {articles.totalTag && articles.totalTag.length}
                    </div>
                    <div className="type font-text">
                      {articles.totalTag && articles.totalTag.length > 1
                        ? "Topics"
                        : "Topic"}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-3 ms-1 pb-2 border-bottom">
              <ListArticleTrending />
            </div>
            <div className="font-subject fw-bold mt-2 ms-1">
              Recommended topics
            </div>
            <PopularTag />
            <ListUnFollowUser flag={"article-filter"} />
            <div>
              <Footer />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default YourArticlesScreen;
