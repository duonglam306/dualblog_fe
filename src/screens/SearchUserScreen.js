import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import { searchArticleRelative } from "../actions/articleActions";
import {
    searchUser,
    searchUserRelative,
    followUser,
    unFollowUser,
    listUserLoadMore,
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

function SearchUserScreen() {
    let { keyword } = useParams();
    let newKeyword = keyword.split("-").join(" ");
    keyword = keyword.split("-").join(" ");

    let token = Cookies.get("token");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userSearch = useSelector((state) => state.userSearch);
    const {
        loading,
        users: { users, page, pages },
    } = userSearch;

    const articleSearchRelative = useSelector(
        (state) => state.articleSearchRelative
    );
    const tagSearchRelative = useSelector((state) => state.tagSearchRelative);
    const userListLoadMore = useSelector((state) => state.userListLoadMore);

    const userUnFollowList = useSelector((state) => state.userUnFollowList);

    const tagList = useSelector((state) => state.tagList);

    const articleNewList = useSelector((state) => state.articleNewList);

    const userUnFollow = useSelector((state) => state.userUnFollow);

    const userFollow = useSelector((state) => state.userFollow);

    const [pageUser, setPageUser] = useState(1);

    useEffect(() => {
        dispatch(listTag());
    }, [dispatch]);

    useEffect(() => {
        if (pageUser === 1) {
            dispatch(searchUser(keyword, pageUser, token));
        } else {
            dispatch(
                listUserLoadMore(
                    token,
                    `/api/users/search?limit=20&offset=${pageUser}&keyword=${keyword}`,
                    "search-list"
                )
            );
        }

        dispatch(searchArticleRelative(keyword, token));
        dispatch(searchUserRelative(keyword, token));
        dispatch(searchTagRelative(keyword));
    }, [dispatch, keyword, navigate, token, pageUser]);

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
            userSearch.error ||
            userListLoadMore.error ||
            articleSearchRelative.error ||
            tagSearchRelative.error ||
            userUnFollowList.error ||
            tagList.error ||
            articleNewList.error
        ) {
            setError(true);
        } else setError(false);
    }, [
        userSearch,
        userListLoadMore,
        articleSearchRelative,
        tagSearchRelative,
        userUnFollowList,
        tagList,
        articleNewList,
    ]);

    if (error) {
        return <ErrorNotFound />;
    }
    return (
        <div className="position-relative">
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
                                    <div className={`nav-item py-2`}>
                                        Articles
                                    </div>
                                </Link>
                                <Link
                                    className="text-decoration-none"
                                    to={`/search/users/${keyword}`}
                                >
                                    <div
                                        className={`nav-item py-2 ms-3 active`}
                                    >
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
                                <div className="list-user py-3">
                                    {users && users.length !== 0 ? (
                                        <>
                                            {users.map((user) => {
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
                                                                <div className="image me-2">
                                                                    <img
                                                                        src={
                                                                            user.image
                                                                        }
                                                                        alt="follower-img"
                                                                        className="img-fluid rounded-circle border"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <div className="username">
                                                                        {
                                                                            user.username
                                                                        }
                                                                    </div>
                                                                    <div className="bio">
                                                                        {
                                                                            user.bio
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <div className="col-3 d-flex justify-content-center align-items-center">
                                                            {userInfo &&
                                                            userInfo.username ===
                                                                user.username ? (
                                                                <div className="col-8 btn btn-secondary btn-self font-btn rounded-pill">
                                                                    You
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    {user.following ? (
                                                                        <div
                                                                            className="col-8 btn border-success btn-follow bg-white text-success font-btn rounded-pill"
                                                                            onClick={() => {
                                                                                if (
                                                                                    userInfo &&
                                                                                    token
                                                                                ) {
                                                                                    dispatch(
                                                                                        unFollowUser(
                                                                                            user.username,
                                                                                            token,
                                                                                            "search-list"
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
                                                                            className="col-8 btn bg-success text-white btn-follow font-btn rounded-pill"
                                                                            onClick={() => {
                                                                                if (
                                                                                    userInfo &&
                                                                                    token
                                                                                ) {
                                                                                    dispatch(
                                                                                        followUser(
                                                                                            user.username,
                                                                                            token,
                                                                                            "search-list"
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
                                            })}
                                            {userListLoadMore &&
                                            userListLoadMore.loading ? (
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
                                                                setPageUser(
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
                        {articleSearchRelative.loading ? (
                            <Loader />
                        ) : (
                            articleSearchRelative.articles.articles &&
                            articleSearchRelative.articles.articles.length !==
                                0 && (
                                <div className="article-search-relative mt-3 pb-3 border-bottom">
                                    <div className="title-list font-text mb-2 d-flex align-items-center">
                                        Articles matching {newKeyword}
                                    </div>

                                    {articleSearchRelative.articles.articles.map(
                                        (article, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="article d-flex justify-content-between mb-2"
                                                >
                                                    <div>
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
                                                                <div className="name d-flex align-items-center">
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
                                                                {article.title}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                    {articleSearchRelative.articles.pages >
                                        1 && (
                                        <Link
                                            className="text-decoration-none"
                                            to={`/search/articles/${keyword}`}
                                        >
                                            <div className="btn-see-more mt-2 text-success">
                                                See all
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            )
                        )}
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
                        {checkArrayEmpty(
                            articleSearchRelative.articles.articles,
                            tagSearchRelative.tags.tags
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
                                        {tagList.tags && tagList.tags.length > 0
                                            ? tagList.tags.map((tag, index) => {
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

export default SearchUserScreen;
