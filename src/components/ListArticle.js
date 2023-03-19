import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Moment from "react-moment";
import Cookies from "js-cookie";

import Loader from "../components/Loader";
import EmptyData from "../components/EmptyData";

import {
    listArticle,
    listYourArticle,
    listArticleNew,
    listArticleFeed,
    favoriteArticle,
    unFavoriteArticle,
    listArticleRelativeAuthor,
    listArticleRelativeTag,
    listArticleLoadMore,
} from "../actions/articleActions";

import "../css/ListArticle.css";

function tagHandle(str) {
    return str.split(" ").join("-");
}

function ListArticleYourFeed() {
    let token = Cookies.get("token");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const articleListLoadMore = useSelector(
        (state) => state.articleListLoadMore
    );

    const articleFeedList = useSelector((state) => state.articleFeedList);

    const {
        loading,
        articles: { articles, page, pages },
    } = articleFeedList;

    const [pageYourFeed, setPageYourFeed] = useState(1);
    useEffect(() => {
        if (token) {
            if (pageYourFeed === 1) {
                dispatch(listArticleFeed(token, pageYourFeed));
            } else {
                dispatch(
                    listArticleLoadMore(
                        token,
                        `/api/articles/feed?limit=20&offset=${pageYourFeed}`,
                        "feed-list"
                    )
                );
            }
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate, pageYourFeed, token]);

    return (
        <div className="articles-component">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {userInfo && (
                        <nav className="nav mt-2 border-bottom">
                            <Link className="text-decoration-none" to={"/"}>
                                <div className={`nav-item py-2 me-3`}>Home</div>
                            </Link>
                            <Link
                                className="text-decoration-none"
                                to={"/following"}
                            >
                                <div className={`nav-item py-2 active`}>
                                    Following
                                </div>
                            </Link>
                        </nav>
                    )}
                    {articles && articles.length !== 0 ? (
                        <div>
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
                                                <div className="col-12 author d-flex">
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
                                                        {article.auth_name}
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link
                                                to={`/article/${article.slug}`}
                                                className="text-decoration-none text-black"
                                            >
                                                <div className="title fw-bold">
                                                    {article.title}
                                                </div>
                                                <div className="description font-text mt-1">
                                                    {article.description}
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
                                                            <Moment fromNow>
                                                                {
                                                                    article.createdAt
                                                                }
                                                            </Moment>
                                                        </OverlayTrigger>
                                                    </div>
                                                    {article.tagList.map(
                                                        (tag) => {
                                                            return (
                                                                <Link
                                                                    to={`/tag/${tagHandle(
                                                                        tag
                                                                    )}`}
                                                                    className="text-decoration-none me-1"
                                                                    key={tag}
                                                                >
                                                                    <div
                                                                        key={
                                                                            tag
                                                                        }
                                                                        className="tag rounded-pill px-2 py-1 text-center"
                                                                    >
                                                                        {tag}
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
                                                                                "list-feed"
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
                                                                                "list-feed"
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
                                                        {article.favoriteCount}
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
                                                className="text-decoration-none text-black"
                                            >
                                                <img
                                                    src={article.thumbnail_url}
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
                                                setPageYourFeed(
                                                    (prev) => prev + 1
                                                );
                                            }}
                                        >
                                            Load More
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <EmptyData />
                    )}
                </>
            )}
        </div>
    );
}

function ListArticleGlobalFeed() {
    let token = Cookies.get("token");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const articleListLoadMore = useSelector(
        (state) => state.articleListLoadMore
    );

    const articleList = useSelector((state) => state.articleList);
    const {
        loading,
        articles: { articles, page, pages },
    } = articleList;

    const [pageGlobalFeed, setPageGlobalFeed] = useState(1);
    useEffect(() => {
        if (pageGlobalFeed === 1) {
            dispatch(listArticle("", pageGlobalFeed, "", "", token));
        } else {
            dispatch(
                listArticleLoadMore(
                    token,
                    `/api/articles?limit=20&offset=${pageGlobalFeed}`,
                    "global-list"
                )
            );
        }
    }, [dispatch, navigate, pageGlobalFeed, token]);

    return (
        <div className="articles-component">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {userInfo && (
                        <nav className="nav mt-2 border-bottom">
                            <Link className="text-decoration-none" to={"/"}>
                                <div className={`nav-item py-2 me-3 active`}>
                                    Home
                                </div>
                            </Link>
                            <Link
                                className="text-decoration-none"
                                to={"/following"}
                            >
                                <div className={`nav-item py-2`}>Following</div>
                            </Link>
                        </nav>
                    )}
                    {articles && articles.length !== 0 ? (
                        <div>
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
                                                <div className="col-12 author d-flex">
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
                                                        {article.auth_name}
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link
                                                to={`/article/${article.slug}`}
                                                className="text-decoration-none text-black"
                                            >
                                                <div className="title fw-bold">
                                                    {article.title}
                                                </div>
                                                <div className="description font-text mt-1">
                                                    {article.description}
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
                                                            <Moment fromNow>
                                                                {
                                                                    article.createdAt
                                                                }
                                                            </Moment>
                                                        </OverlayTrigger>
                                                    </div>
                                                    {article.tagList.map(
                                                        (tag) => {
                                                            return (
                                                                <Link
                                                                    to={`/tag/${tagHandle(
                                                                        tag
                                                                    )}`}
                                                                    className="text-decoration-none me-1"
                                                                    key={tag}
                                                                >
                                                                    <div
                                                                        key={
                                                                            tag
                                                                        }
                                                                        className="tag rounded-pill px-2 py-1 text-center"
                                                                    >
                                                                        {tag}
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
                                                                                "list"
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
                                                                                "list"
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
                                                        {article.favoriteCount}
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
                                                className="text-decoration-none text-black"
                                            >
                                                <img
                                                    src={article.thumbnail_url}
                                                    alt="img-article"
                                                    className="img-fluid thumbnail border"
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
                                                setPageGlobalFeed(
                                                    (prev) => prev + 1
                                                );
                                            }}
                                        >
                                            Load More
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <EmptyData />
                    )}
                </>
            )}
        </div>
    );
}

function ListArticleByAuthor({ author, flag }) {
    let token = Cookies.get("token");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const articleYourList = useSelector((state) => state.articleYourList);

    const articleListLoadMore = useSelector(
        (state) => state.articleListLoadMore
    );

    const {
        loading,
        articles: { articles, page, pages },
    } = articleYourList;

    const [pageArticleAuthor, setPageArticleAuthor] = useState(1);

    useEffect(() => {
        if (pageArticleAuthor === 1) {
            dispatch(listYourArticle(author, pageArticleAuthor, token));
        } else {
            dispatch(
                listArticleLoadMore(
                    token,
                    `/api/articles?limit=20&offset=${pageArticleAuthor}&author=${author}`,
                    "your-list"
                )
            );
        }
    }, [dispatch, pageArticleAuthor, author, token]);

    return (
        <div className="articles-component">
            {loading ? (
                <Loader />
            ) : (
                <div>
                    {articles && articles.length !== 0 ? (
                        <>
                            {articles.map((article, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="article py-4 d-flex justify-content-between border-1 border-bottom"
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
                                                        {article.auth_name}
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
                                                <div className="description font-text mt-1">
                                                    {article.description}
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
                                                            <Moment fromNow>
                                                                {
                                                                    article.createdAt
                                                                }
                                                            </Moment>
                                                        </OverlayTrigger>
                                                    </div>
                                                    {article.tagList.map(
                                                        (tag) => {
                                                            return (
                                                                <Link
                                                                    to={`/tag/${tagHandle(
                                                                        tag
                                                                    )}`}
                                                                    className="text-decoration-none me-1"
                                                                    key={tag}
                                                                >
                                                                    <div
                                                                        key={
                                                                            tag
                                                                        }
                                                                        className="tag rounded-pill px-2 py-1"
                                                                    >
                                                                        {tag}
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
                                                                                "your-list"
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
                                                                                "your-list"
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
                                                        {article.favoriteCount}
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
                                                    src={article.thumbnail_url}
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
                                                setPageArticleAuthor(
                                                    (prev) => prev + 1
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
                        <>
                            <EmptyData />

                            {flag === "profile" ? (
                                <Link
                                    to="/editor"
                                    className="text-decoration-none col-12 d-flex justify-content-center mt-2"
                                >
                                    <div className="btn btn-success btn-new-article">
                                        Write an article
                                    </div>
                                </Link>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

function ListArticleRelativeByAuthor({ author, slug }) {
    let token = Cookies.get("token");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const articleRelativeAuthor = useSelector(
        (state) => state.articleRelativeAuthor
    );
    const {
        articles: { articles, total },
        loading,
    } = articleRelativeAuthor;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(listArticleRelativeAuthor(author, slug, token));
    }, [dispatch, slug, author, token]);

    return (
        <div className="articles-component">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {articles && articles.length !== 0 && (
                        <div className="sub-title mt-3">More from {author}</div>
                    )}
                    {articles &&
                        articles.length !== 0 &&
                        articles.map((article, index) => {
                            return (
                                <div
                                    key={index}
                                    className="article py-4 d-flex justify-content-between border-1 border-bottom"
                                >
                                    <div className="col-7">
                                        <Link
                                            to={`/@${article.auth_name}`}
                                            className="text-decoration-none text-dark"
                                        >
                                            <div className="author d-flex">
                                                <div>
                                                    <img
                                                        src={article.auth_image}
                                                        alt="avt-author"
                                                        className="img-fluid rounded-circle me-1 border"
                                                    />
                                                </div>
                                                <div className="name d-flex align-items-center fw-bold">
                                                    {article.auth_name}
                                                </div>
                                            </div>
                                        </Link>
                                        <div>
                                            <Link
                                                to={`/article/${article.slug}`}
                                                className="text-decoration-none text-black"
                                                key={index}
                                            >
                                                <div className="title fw-bold">
                                                    {article.title}
                                                </div>
                                                <div className="description font-text mt-1">
                                                    {article.description}
                                                </div>
                                            </Link>
                                        </div>
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
                                                        <Moment fromNow>
                                                            {article.createdAt}
                                                        </Moment>
                                                    </OverlayTrigger>
                                                </div>
                                                {article.tagList.map((tag) => {
                                                    return (
                                                        <Link
                                                            to={`/tag/${tagHandle(
                                                                tag
                                                            )}`}
                                                            key={tag}
                                                            className="text-decoration-none me-1"
                                                        >
                                                            <div
                                                                key={tag}
                                                                className="tag rounded-pill px-2 py-1"
                                                            >
                                                                {tag}
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
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
                                                                            "relative-author"
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
                                                                            "relative-author"
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
                                                    {article.favoriteCount}
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
                                                            article.commentList
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
                                                src={article.thumbnail_url}
                                                alt="img-article"
                                                className="img-fluid border"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    {total > 5 && (
                        <Link
                            to={`/@${author}`}
                            className="text-decoration-none d-flex"
                        >
                            <div className="author-article-more btn btn-success mt-3 col-5 mx-auto rounded-pill">
                                Read more from {`${author}`}
                            </div>
                        </Link>
                    )}
                </>
            )}
        </div>
    );
}

function ListArticleRelativeByTag({ tag, slug }) {
    let token = Cookies.get("token");

    const dispatch = useDispatch();

    const articleRelativeTag = useSelector((state) => state.articleRelativeTag);
    const {
        articles: { articles, total },
        loading,
    } = articleRelativeTag;

    useEffect(() => {
        dispatch(listArticleRelativeTag(tag, slug, token));
    }, [dispatch, tag, slug, token]);

    return (
        <div className="articles-relative-tag-component articles-component">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {articles && total !== 0 && (
                        <div className="sub-title mb-2">More from DualBlog</div>
                    )}
                    {articles &&
                        total !== 0 &&
                        articles.map((article, index) => {
                            return (
                                <div
                                    key={index}
                                    className="article d-flex justify-content-between mb-2"
                                >
                                    <div className="col-9 pe-1">
                                        <Link
                                            to={`/@${article.auth_name}`}
                                            className="text-decoration-none text-dark"
                                        >
                                            <div className="author d-flex">
                                                <div>
                                                    <img
                                                        src={article.auth_image}
                                                        alt="avt-author"
                                                        className="img-fluid rounded-circle me-1 border"
                                                    />
                                                </div>
                                                <div className="name d-flex align-items-center">
                                                    {article.auth_name}
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
                                    <div className="col-3 my-auto">
                                        <img
                                            src={article.thumbnail_url}
                                            alt="img-article"
                                            className="img-fluid border"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                </>
            )}
        </div>
    );
}

function ListArticleTrending() {
    const dispatch = useDispatch();

    const articleNewList = useSelector((state) => state.articleNewList);
    const {
        articles: { articles, total },
        loading,
    } = articleNewList;

    useEffect(() => {
        dispatch(listArticleNew());
    }, [dispatch]);

    return (
        <div className="articles-trending-component articles-component">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {articles && total !== 0 && (
                        <div className="title-list font-text mb-2 d-flex align-items-center">
                            <span className="badge bg-success me-1">New</span>{" "}
                            What We're Reading Today
                        </div>
                    )}
                    {articles &&
                        total !== 0 &&
                        articles.map((article, index) => {
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
                                                        src={article.auth_image}
                                                        alt="avt-author"
                                                        className="img-fluid rounded-circle me-1 border"
                                                    />
                                                </div>
                                                <div className="name d-flex align-items-center">
                                                    {article.auth_name}
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
                        })}
                </>
            )}
        </div>
    );
}

export default ListArticleGlobalFeed;
export {
    ListArticleByAuthor,
    ListArticleRelativeByTag,
    ListArticleRelativeByAuthor,
    ListArticleTrending,
    ListArticleYourFeed,
};
