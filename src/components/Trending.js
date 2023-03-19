import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";

import { listArticlePopular } from "../actions/articleActions";

import "../css/Trending.css";

const Trending = () => {
    const dispatch = useDispatch();
    const articlePopularList = useSelector((state) => state.articlePopularList);
    const {
        loading,
        articles: { articles },
    } = articlePopularList;

    useEffect(() => {
        dispatch(listArticlePopular());
    }, [dispatch]);

    function dateHandle(str) {
        let date = new Date(str);
        return (
            date.toDateString().substring(4, 10) +
            "," +
            date.toDateString().substring(10, 15)
        );
    }
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                articles &&
                articles.length > 0 && (
                    <div className="trending-component border-bottom py-3">
                        <div className="container">
                            <div>
                                <i
                                    className="fa fa-star rounded-circle p-1 m-1 border border-dark"
                                    aria-hidden="true"
                                ></i>
                                <span className="font-text fw-bold font-subject">
                                    TRENDING ON DUALBLOG
                                </span>
                            </div>
                            <div className="articles d-flex justify-content-start py-2">
                                {articles.map((article, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="article col-4 pb-4 d-flex justify-content-between"
                                        >
                                            <div className="col-2 id">
                                                0{index + 1}
                                            </div>
                                            <div className="col-10">
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
                                                                className="img-fluid rounded-circle me-1"
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
                                                    <div className="date">
                                                        {dateHandle(
                                                            article.createdAt
                                                        )}
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default Trending;
