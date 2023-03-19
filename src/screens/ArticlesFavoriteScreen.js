import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import Moment from "react-moment";
import Cookies from "js-cookie";

import Loader from "../components/Loader";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox";
import ListUnFollowUser from "../components/ListUnFollowUser";
import Message from "../components/Message";
import ErrorNotFound from "../components/ErrorNotFound";
import EmptyData from "../components/EmptyData";
import { ListArticleTrending } from "../components/ListArticle";
import PopularTag from "../components/PopularTag";
import { HeaderVertical } from "../components/Header";

import {
    listArticleFavorite,
    unFavoriteArticle,
    listArticleLoadMore,
} from "../actions/articleActions";

import "../css/ArticlesFavoriteScreen.css";
import "../css/ListArticle.css";

function ArticlesFavoriteScreen() {
    let token = Cookies.get("token");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const articleFavoriteList = useSelector(
        (state) => state.articleFavoriteList
    );

    const userUnFollowList = useSelector((state) => state.userUnFollowList);

    const articleFavorite = useSelector((state) => state.articleFavorite);

    const articleUnFavorite = useSelector((state) => state.articleUnFavorite);

    const tagList = useSelector((state) => state.tagList);

    const articleNewList = useSelector((state) => state.articleNewList);

    const articleListLoadMore = useSelector(
        (state) => state.articleListLoadMore
    );

    const [pageArticleFavorite, setPageArticleFavorite] = useState(1);

    const {
        loading,
        articles: { total, totalAuthor, authImages, articles, page, pages },
    } = articleFavoriteList;

    useEffect(() => {
        if (!userInfo || !token) {
            navigate("/login");
        } else {
            if (pageArticleFavorite === 1) {
                dispatch(
                    listArticleFavorite(
                        userInfo.username,
                        pageArticleFavorite,
                        token
                    )
                );
            } else {
                dispatch(
                    listArticleLoadMore(
                        token,
                        `/api/articles?limit=20&offset=${pageArticleFavorite}&favorited=${userInfo.username}`,
                        "favorite-list"
                    )
                );
            }
        }
    }, [
        navigate,
        userInfo,
        token,
        dispatch,
        articleUnFavorite,
        pageArticleFavorite,
    ]);

    const [error, setError] = useState(false);

    useEffect(() => {
        if (
            userLogin.error ||
            articleFavoriteList.error ||
            userUnFollowList.error ||
            tagList.error ||
            articleNewList.error ||
            articleListLoadMore.error
        ) {
            setError(true);
        } else setError(false);
    }, [
        userLogin,
        userUnFollowList,
        tagList,
        articleNewList,
        articleListLoadMore,
        articleFavoriteList,
    ]);

    function tagHandle(str) {
        return str.split("").join("-");
    }
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
            <div className="articlesFavoriteScreen-component d-flex justify-content-between">
                <aside className="col-1 position-relative">
                    <HeaderVertical isFavoriteArticlePage={true} />
                </aside>
                <div className="col-8 d-flex justify-content-center">
                    <div className="col-10" id="list-article">
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <div className="d-flex align-items-center my-3 pb-3 border-bottom">
                                    <div className="btn me-2 icon-tag rounded-circle bg-opacity-25 bg-secondary">
                                        <i
                                            className="fa fa-heart"
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                    <div className="font-text title-page">
                                        FAVORITE LIST
                                    </div>
                                </div>
                                <div className="articles-component">
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
                                                                                        className="tag rounded-pill px-2 py-1"
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
                                                                    <Link
                                                                        to={`/article/${article.slug}`}
                                                                        className="text-decoration-none text-black d-flex"
                                                                    >
                                                                        <div className="me-2">
                                                                            <i
                                                                                className="fa fa-comments-o"
                                                                                aria-hidden="true"
                                                                            ></i>
                                                                        </div>
                                                                        <div className="me-2">
                                                                            {
                                                                                article
                                                                                    .commentList
                                                                                    .length
                                                                            }
                                                                        </div>
                                                                    </Link>
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
                                                                                            "list-favorite"
                                                                                        )
                                                                                    );
                                                                                } else {
                                                                                    navigate(
                                                                                        "/login"
                                                                                    );
                                                                                }
                                                                            }}
                                                                        >
                                                                            <i
                                                                                className="fa fa-trash"
                                                                                aria-hidden="true"
                                                                            ></i>
                                                                        </div>
                                                                    </OverlayTrigger>
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
                                                                setPageArticleFavorite(
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
                                        <EmptyData />
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <aside className="col-3 position-relative">
                    <div className="popular-tag p-4 border-start">
                        <div className="mt-2 ms-1 pb-4 border-bottom">
                            <SearchBox />
                        </div>
                        {total && authImages && (
                            <div className="pb-3 border-bottom">
                                <div className="info-article-tag d-flex ms-1 mb-2">
                                    <div className="col-6 num-article">
                                        <div className="number font-text title-page">
                                            {total}
                                        </div>
                                        <div className="type font-text">
                                            {total > 1 ? "Articles" : "Article"}
                                        </div>
                                    </div>
                                    <div className="col-6 num-author">
                                        <div className="number font-text title-page">
                                            {totalAuthor}
                                        </div>
                                        <div className="type font-text">
                                            {totalAuthor > 1
                                                ? "Writers"
                                                : "Writer"}
                                        </div>
                                    </div>
                                </div>
                                <div className="list-auth mt-3">
                                    {authImages &&
                                        totalAuthor > 0 &&
                                        authImages.map((item, index) => {
                                            return (
                                                <img
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
                        <div className="mt-2 ms-1 pb-2 border-bottom">
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

export default ArticlesFavoriteScreen;
