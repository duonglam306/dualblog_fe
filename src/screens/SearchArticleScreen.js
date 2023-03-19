import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Moment from "react-moment";
import Cookies from "js-cookie";

import {
    searchArticle,
    searchArticleRelative,
    unFavoriteArticle,
    favoriteArticle,
    listArticleLoadMore,
} from "../actions/articleActions";
import {
    searchUserRelative,
    followUser,
    unFollowUser,
} from "../actions/userActions";
import { searchTagRelative, listTag } from "../actions/tagActions";

import { HeaderVertical } from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ListUnFollowUser from "../components/ListUnFollowUser";
import { ListArticleTrending } from "../components/ListArticle";
import Message from "../components/Message";
import SearchBox from "../components/SearchBox";
import ErrorNotFound from "../components/ErrorNotFound";

import Empty from "../image/empty.svg";
import "../css/ListArticle.css";
import "../css/SearchScreen.css";
import MedalFirst from "../image/medal_first.png";
import MedalSecond from "../image/medal_second.png";
import MedalThird from "../image/medal_third.png";

function SearchArticleScreen() {
    let { keyword } = useParams();
    let newKeyword = keyword.split("-").join(" ");
    keyword = keyword.split("-").join(" ");

    let token = Cookies.get("token");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const articleSearch = useSelector((state) => state.articleSearch);

    const {
        loading,
        articles: { articles, page, pages },
    } = articleSearch;

    const articleListLoadMore = useSelector(
        (state) => state.articleListLoadMore
    );

    const tagSearchRelative = useSelector((state) => state.tagSearchRelative);

    const userSearchRelative = useSelector((state) => state.userSearchRelative);

    const articleNewList = useSelector((state) => state.articleNewList);

    const userUnFollow = useSelector((state) => state.userUnFollow);

    const userFollow = useSelector((state) => state.userFollow);

    const articleFavorite = useSelector((state) => state.articleFavorite);

    const articleUnFavorite = useSelector((state) => state.articleUnFavorite);

    const userUnFollowList = useSelector((state) => state.userUnFollowList);

    const tagList = useSelector((state) => state.tagList);
    const { tags } = tagList;

    const [pageArticle, setPageArticle] = useState(1);

    useEffect(() => {
        dispatch(listTag());
    }, [dispatch]);

    useEffect(() => {
        if (pageArticle === 1) {
            dispatch(searchArticle(keyword, pageArticle, token));
        } else {
            dispatch(
                listArticleLoadMore(
                    token,
                    `/api/articles/search?limit=20&offset=${pageArticle}&keyword=${keyword}`,
                    "search-list"
                )
            );
        }

        dispatch(searchArticleRelative(keyword, token));
        dispatch(searchUserRelative(keyword, token));
        dispatch(searchTagRelative(keyword));
    }, [dispatch, keyword, pageArticle, navigate, token]);

    function tagHandle(str) {
        return str.split(" ").join("-");
    }

    function checkArrayEmpty(arr1, arr2) {
        if (arr1 && arr1.length === 0 && arr2 && arr2.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    const [error, setError] = useState(false);

    useEffect(() => {
        if (
            articleSearch.error ||
            articleListLoadMore.error ||
            tagSearchRelative.error ||
            userSearchRelative.error ||
            userUnFollowList.error ||
            tagList.error ||
            articleNewList.error
        ) {
            setError(true);
        } else setError(false);
    }, [
        articleSearch,
        articleListLoadMore,
        tagSearchRelative,
        userSearchRelative,
        userUnFollowList,
        tagList,
        articleNewList,
    ]);

    if (error) {
        return <ErrorNotFound />;
    }
    return (
        <div className="position-relative">
            {articleFavorite.error && (
                <Message variant="danger">{articleFavorite.error}</Message>
            )}
            {articleUnFavorite.error && (
                <Message variant="danger">{articleUnFavorite.error}</Message>
            )}
            {userFollow.error && (
                <Message variant="danger">{userFollow.error}</Message>
            )}
            {userUnFollow.error && (
                <Message variant="danger">{userUnFollow.error}</Message>
            )}
            <div className="searchScreen-component d-flex justify-content-between">
                <aside className="col-1 position-relative">
                    <HeaderVertical />
                </aside>
                <div className="col-8 d-flex justify-content-center">
                    <div className="col-10" id="list-data">
                        <div className="my-3 col-12 d-flex align-items-center">
                            <div className="btn me-2 icon-tag rounded-circle bg-opacity-25 bg-secondary">
                                <i
                                    className="fa fa-search"
                                    aria-hidden="true"
                                ></i>
                            </div>
                            <div className="col-10 font-text title-page d-flex">
                                <div className="sub-title-page me-2">
                                    Results for
                                </div>
                                {newKeyword}
                            </div>
                        </div>

                        <div className="articles-component">
                            <nav className="nav mt-2 border-bottom">
                                <Link
                                    className="text-decoration-none"
                                    to={`/search/articles/${keyword}`}
                                >
                                    <div className={`nav-item py-2 active`}>
                                        Articles
                                    </div>
                                </Link>
                                <Link
                                    className="text-decoration-none"
                                    to={`/search/users/${keyword}`}
                                >
                                    <div className={`nav-item py-2 ms-3`}>
                                        People
                                    </div>
                                </Link>
                                <Link
                                    className="text-decoration-none"
                                    to={`/search/tags/${keyword}`}
                                >
                                    <div className={`nav-item py-2 ms-3`}>
                                        Topics
                                    </div>
                                </Link>
                            </nav>

                            {loading ? (
                                <Loader />
                            ) : (
                                <div className="py-3 list-article">
                                    {articles && articles.length !== 0 ? (
                                        <>
                                            {articles.map((article, index) => {
                                                return (
                                                    <div
                                                        className="article py-4 d-flex justify-content-between border-1 border-bottom"
                                                        key={index}
                                                    >
                                                        <div className="col-7">
                                                            <Link
                                                                to={`/@${article.auth_name}`}
                                                                className="text-decoration-none text-dark"
                                                            >
                                                                <div className="author d-flex">
                                                                    <div>
                                                                        <img
                                                                            src={
                                                                                article.auth_image
                                                                            }
                                                                            alt="avt-author"
                                                                            className="img-fluid rounded-circle me-1 border"
                                                                        />
                                                                    </div>
                                                                    <div className="name d-flex align-items-center fw-bold">
                                                                        {
                                                                            article.auth_name
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            <Link
                                                                to={`/article/${article.slug}`}
                                                                className="text-decoration-none text-black"
                                                                key={index}
                                                            >
                                                                <div className="title fw-bold">
                                                                    {
                                                                        article.title
                                                                    }
                                                                </div>
                                                                <div className="description font-text mt-1">
                                                                    {
                                                                        article.description
                                                                    }
                                                                </div>
                                                            </Link>
                                                            <div className="d-flex mt-1 justify-content-between align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="date me-1">
                                                                        <OverlayTrigger
                                                                            trigger={[
                                                                                "hover",
                                                                                "focus",
                                                                            ]}
                                                                            placement="bottom"
                                                                            overlay={
                                                                                <Tooltip className="date">
                                                                                    <Moment format="ddd, MMM DD YYYY HH:mm">
                                                                                        {
                                                                                            article.createdAt
                                                                                        }
                                                                                    </Moment>
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Moment
                                                                                fromNow
                                                                            >
                                                                                {
                                                                                    article.createdAt
                                                                                }
                                                                            </Moment>
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                    {article.tagList.map(
                                                                        (
                                                                            tag
                                                                        ) => {
                                                                            return (
                                                                                <Link
                                                                                    to={`/tag/${tagHandle(
                                                                                        tag
                                                                                    )}`}
                                                                                    className="text-decoration-none me-1"
                                                                                    key={
                                                                                        tag
                                                                                    }
                                                                                >
                                                                                    <div
                                                                                        key={
                                                                                            tag
                                                                                        }
                                                                                        className="tag rounded-pill px-2 py-1 text-center"
                                                                                    >
                                                                                        {
                                                                                            tag
                                                                                        }
                                                                                    </div>
                                                                                </Link>
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    {article.favorited ? (
                                                                        <OverlayTrigger
                                                                            trigger={[
                                                                                "hover",
                                                                                "focus",
                                                                            ]}
                                                                            placement="top"
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    Unfavorite
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <div
                                                                                className="btn-like"
                                                                                onClick={() => {
                                                                                    if (
                                                                                        token &&
                                                                                        userInfo
                                                                                    ) {
                                                                                        dispatch(
                                                                                            unFavoriteArticle(
                                                                                                article.slug,
                                                                                                token,
                                                                                                "search"
                                                                                            )
                                                                                        );
                                                                                    } else {
                                                                                        navigate(
                                                                                            "/login"
                                                                                        );
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <i className="fa fa-heart"></i>
                                                                            </div>
                                                                        </OverlayTrigger>
                                                                    ) : (
                                                                        <OverlayTrigger
                                                                            trigger={[
                                                                                "hover",
                                                                                "focus",
                                                                            ]}
                                                                            placement="top"
                                                                            overlay={
                                                                                <Tooltip>
                                                                                    Favorite
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <div
                                                                                className="btn-like"
                                                                                onClick={() => {
                                                                                    if (
                                                                                        token &&
                                                                                        userInfo
                                                                                    ) {
                                                                                        dispatch(
                                                                                            favoriteArticle(
                                                                                                article.slug,
                                                                                                token,
                                                                                                "search"
                                                                                            )
                                                                                        );
                                                                                    } else {
                                                                                        navigate(
                                                                                            "/login"
                                                                                        );
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <i className="fa fa-heart-o"></i>
                                                                            </div>
                                                                        </OverlayTrigger>
                                                                    )}
                                                                    <div className="ms-2">
                                                                        {
                                                                            article.favoriteCount
                                                                        }
                                                                    </div>
                                                                    <Link
                                                                        to={`/article/${article.slug}`}
                                                                        className="text-decoration-none text-black d-flex"
                                                                    >
                                                                        <div className="ms-2">
                                                                            <i
                                                                                className="fa fa-comments-o"
                                                                                aria-hidden="true"
                                                                            ></i>
                                                                        </div>
                                                                        <div className="ms-2">
                                                                            {
                                                                                article
                                                                                    .commentList
                                                                                    .length
                                                                            }
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <Link
                                                                to={`/article/${article.slug}`}
                                                                className="text-decoration-none text-black d-flex"
                                                            >
                                                                <img
                                                                    src={
                                                                        article.thumbnail_url
                                                                    }
                                                                    alt="img-article"
                                                                    className="img-fluid border"
                                                                />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {articleListLoadMore &&
                                            articleListLoadMore.loading ? (
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
                                                                setPageArticle(
                                                                    (prev) =>
                                                                        prev + 1
                                                                );
                                                            }}
                                                        >
                                                            Load More
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        <div className="notice-empty-data text-center">
                                            <div className="col-6 mx-auto">
                                                <img src={Empty} alt="empty" />
                                            </div>
                                            <div>
                                                Make sure all words are spelled
                                                correctly. <br /> Try different
                                                keywords. <br />
                                                Try more general keywords.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <aside className="col-3 position-relative">
                    <div className="popular-tag p-4 border-start">
                        <div className="pb-3 border-bottom">
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
                            <div className="mt-2 ms-1">
                                <SearchBox />
                            </div>
                        </div>
                        {tagSearchRelative.loading ? (
                            <Loader />
                        ) : (
                            tagSearchRelative.tags.tags &&
                            tagSearchRelative.tags.tags.length !== 0 && (
                                <div className="tag-search-relative mt-3 pb-3 border-bottom">
                                    <div className="title-list font-text mb-2 d-flex align-items-center">
                                        Topics matching {newKeyword}
                                    </div>

                                    <div className="d-flex list-tag-search">
                                        {tagSearchRelative.tags.tags.map(
                                            (tag) => {
                                                return (
                                                    <Link
                                                        to={`/tag/${tagHandle(
                                                            tag.name
                                                        )}`}
                                                        className="text-decoration-none mb-1 me-1"
                                                        key={tag.name}
                                                    >
                                                        <div className="item-tag px-3 py-1 rounded-pill d-flex align-items-center justify-content-center">
                                                            {tag.name}
                                                        </div>
                                                    </Link>
                                                );
                                            }
                                        )}
                                        {tagSearchRelative.tags.pages > 1 && (
                                            <Link
                                                className="text-decoration-none"
                                                to={`/search/tags/${keyword}`}
                                            >
                                                <div className="btn-see-more mt-2 text-success">
                                                    See all
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                        {userSearchRelative.loading ? (
                            <Loader />
                        ) : (
                            userSearchRelative.users.users &&
                            userSearchRelative.users.users.length !== 0 && (
                                <div className="user-search-relative mt-3 pb-3 border-bottom">
                                    <div className="title-list font-text mb-2 d-flex align-items-center">
                                        People matching {newKeyword}
                                    </div>

                                    {userSearchRelative.users.users.map(
                                        (user) => {
                                            return (
                                                <div
                                                    key={user.username}
                                                    className="d-flex user-info mb-2"
                                                >
                                                    <Link
                                                        className="text-decoration-none col-9"
                                                        to={`/@${user.username}`}
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={user.image}
                                                                alt="follower-img"
                                                                className="img-fluid image me-2 rounded-circle border"
                                                            />
                                                            <div className="username">
                                                                {user.username}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <div className="col-3 d-flex justify-content-center align-items-center">
                                                        {userInfo &&
                                                        userInfo.username ===
                                                            user.username ? (
                                                            <div className="col-12 btn btn-secondary btn-self font-btn rounded-pill">
                                                                You
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {user.following ? (
                                                                    <div
                                                                        className="col-12 btn border-success btn-follow bg-white text-success font-btn rounded-pill"
                                                                        onClick={() => {
                                                                            if (
                                                                                userInfo &&
                                                                                token
                                                                            ) {
                                                                                dispatch(
                                                                                    unFollowUser(
                                                                                        user.username,
                                                                                        token,
                                                                                        "search-relative-list"
                                                                                    )
                                                                                );
                                                                            } else {
                                                                                navigate(
                                                                                    "/login"
                                                                                );
                                                                            }
                                                                        }}
                                                                    >
                                                                        Following
                                                                    </div>
                                                                ) : (
                                                                    <div
                                                                        className="col-12 btn bg-success text-white btn-follow font-btn rounded-pill"
                                                                        onClick={() => {
                                                                            if (
                                                                                userInfo &&
                                                                                token
                                                                            ) {
                                                                                dispatch(
                                                                                    followUser(
                                                                                        user.username,
                                                                                        token,
                                                                                        "search-relative-list"
                                                                                    )
                                                                                );
                                                                            } else {
                                                                                navigate(
                                                                                    "/login"
                                                                                );
                                                                            }
                                                                        }}
                                                                    >
                                                                        Follow
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                    {userSearchRelative.users.pages > 1 && (
                                        <Link
                                            className="text-decoration-none"
                                            to={`/search/users/${keyword}`}
                                        >
                                            <div className="btn-see-more mt-2 text-success">
                                                See all
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            )
                        )}

                        {checkArrayEmpty(
                            tagSearchRelative.tags.tags,
                            userSearchRelative.users.users
                        ) && (
                            <>
                                <div className="mt-3 pb-3 border-bottom">
                                    <ListArticleTrending />
                                </div>
                                <div className="mt-3 pb-3 border-bottom">
                                    <div className="font-subject fw-bold mt-2 ms-1">
                                        Recommended topics
                                    </div>
                                    <div className="list-tag d-flex ">
                                        {tags && tags.length > 0
                                            ? tags.map((tag, index) => {
                                                  if (index === 0) {
                                                      return (
                                                          <Link
                                                              to={`/tag/${tagHandle(
                                                                  tag.name
                                                              )}`}
                                                              className="text-decoration-none"
                                                              key={index}
                                                          >
                                                              <div className="item-tag item-first p-2 m-1 d-flex align-items-center justify-content-center">
                                                                  <img
                                                                      className="medal img-fluid me-1"
                                                                      src={
                                                                          MedalFirst
                                                                      }
                                                                      alt="tag-medal"
                                                                  />{" "}
                                                                  {tag.name}
                                                              </div>
                                                          </Link>
                                                      );
                                                  }
                                                  if (index === 1) {
                                                      return (
                                                          <Link
                                                              to={`/tag/${tagHandle(
                                                                  tag.name
                                                              )}`}
                                                              className="text-decoration-none"
                                                              key={index}
                                                          >
                                                              <div className="item-tag item-second p-2 m-1 d-flex align-items-center justify-content-center">
                                                                  <img
                                                                      className="medal img-fluid me-1"
                                                                      src={
                                                                          MedalSecond
                                                                      }
                                                                      alt="tag-medal"
                                                                  />{" "}
                                                                  {tag.name}
                                                              </div>
                                                          </Link>
                                                      );
                                                  }
                                                  if (index === 2) {
                                                      return (
                                                          <Link
                                                              to={`/tag/${tagHandle(
                                                                  tag.name
                                                              )}`}
                                                              className="text-decoration-none"
                                                              key={index}
                                                          >
                                                              <div className="item-tag item-third p-2 m-1 d-flex align-items-center justify-content-center">
                                                                  <img
                                                                      className="medal img-fluid me-1"
                                                                      src={
                                                                          MedalThird
                                                                      }
                                                                      alt="tag-medal"
                                                                  />{" "}
                                                                  {tag.name}
                                                              </div>
                                                          </Link>
                                                      );
                                                  }
                                                  return (
                                                      <Link
                                                          to={`/tag/${tagHandle(
                                                              tag.name
                                                          )}`}
                                                          className="text-decoration-none"
                                                          key={index}
                                                      >
                                                          <div className="item-tag p-2 m-1 d-flex align-items-center justify-content-center">
                                                              {tag.name}
                                                          </div>
                                                      </Link>
                                                  );
                                              })
                                            : "No tags are here... yet."}
                                    </div>
                                </div>
                                <ListUnFollowUser flag={"search"} />
                            </>
                        )}
                        <Footer />
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default SearchArticleScreen;
