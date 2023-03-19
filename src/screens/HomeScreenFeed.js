import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Popover, OverlayTrigger } from "react-bootstrap";

import {
    followUser,
    unFollowUser,
    getFollowListUser,
    listUserLoadMore,
} from "../actions/userActions";

import { HeaderVertical } from "../components/Header";
import HomeGuess from "../components/HomeGuess";
import Footer from "../components/Footer";
import Message from "../components/Message";
import SearchBox from "../components/SearchBox";
import { ListArticleYourFeed } from "../components/ListArticle";
import PopularTag from "../components/PopularTag";
import ListUnFollowUser from "../components/ListUnFollowUser";
import { ListArticleTrending } from "../components/ListArticle";
import ErrorNotFound from "../components/ErrorNotFound";

import "../css/HomeScreen.css";
import Loader from "../components/Loader";

const HomeScreen = () => {
    let token = Cookies.get("token");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    document.querySelector("title").innerHTML = "Home — DualBlog";

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUnFollowList = useSelector((state) => state.userUnFollowList);

    const userFollowList = useSelector((state) => state.userFollowList);
    const {
        loading,
        users: { users, page, pages },
    } = userFollowList;

    const tagList = useSelector((state) => state.tagList);

    const articleListLoadMore = useSelector(
        (state) => state.articleListLoadMore
    );

    const articleFeedList = useSelector((state) => state.articleFeedList);

    const articleNewList = useSelector((state) => state.articleNewList);

    const userUnFollow = useSelector((state) => state.userUnFollow);

    const userFollow = useSelector((state) => state.userFollow);

    const articleFavorite = useSelector((state) => state.articleFavorite);

    const articleUnFavorite = useSelector((state) => state.articleUnFavorite);

    const userListLoadMore = useSelector((state) => state.userListLoadMore);

    const slider = document.querySelector(".list-user-following-feed");
    let isDown = false;
    let startX;
    let scrollLeft;

    if (slider) {
        slider.addEventListener("mousedown", (e) => {
            isDown = true;
            slider.classList.add("active");
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener("mouseleave", () => {
            isDown = false;
            slider.classList.remove("active");
        });
        slider.addEventListener("mouseup", () => {
            isDown = false;
            slider.classList.remove("active");
        });
        slider.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = x - startX; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
            console.log(walk);
        });
    }

    const [error, setError] = useState(false);

    const [pageUser, setPageUser] = useState(1);

    useEffect(() => {
        if (userInfo && token) {
            if (pageUser === 1) {
                dispatch(getFollowListUser(userInfo.username, token, 1, 20));
            } else {
                dispatch(
                    listUserLoadMore(
                        token,
                        `/api/profiles/${userInfo.username}/followList?limit=20&offset=${pageUser}`,
                        "follow-list"
                    )
                );
            }
        }
    }, [dispatch, token, userInfo, pageUser]);

    useEffect(() => {
        if (
            userUnFollowList.error ||
            userFollowList.error ||
            userLogin.error ||
            tagList.error ||
            articleListLoadMore.error ||
            articleFeedList.error ||
            articleNewList.error
        ) {
            setError(true);
        } else setError(false);
    }, [
        userUnFollowList,
        userLogin,
        tagList,
        userFollowList,
        articleListLoadMore,
        articleNewList,
        articleFeedList,
    ]);

    if (error) {
        return <ErrorNotFound />;
    }
    if (userInfo && token) {
        return (
            <div className="position-relative">
                {articleFavorite.error && (
                    <Message variant="danger">{articleFavorite.error}</Message>
                )}
                {articleUnFavorite.error && (
                    <Message variant="danger">
                        {articleUnFavorite.error}
                    </Message>
                )}
                {userFollow.error && (
                    <Message variant="danger">{userFollow.error}</Message>
                )}
                {userUnFollow.error && (
                    <Message variant="danger">{userUnFollow.error}</Message>
                )}
                <div className="homeScreen-component-vertical d-flex justify-content-between">
                    <aside className="col-1 position-relative">
                        <HeaderVertical isHomePage={true} />
                    </aside>
                    <div className="col-8">
                        {loading ? (
                            <Loader />
                        ) : (
                            users &&
                            users.length > 0 && (
                                <div className="col-12 mt-5">
                                    <div className="mx-auto col-10 list-user-following-feed d-flex">
                                        {users.map((user) => {
                                            return (
                                                <OverlayTrigger
                                                    key={user.username}
                                                    trigger={["click"]}
                                                    placement="bottom"
                                                    rootClose
                                                    overlay={
                                                        <Popover id="popover-user-following">
                                                            <Popover.Body>
                                                                <Link
                                                                    to={`/@${user.username}`}
                                                                    className="text-decoration-none col-9"
                                                                >
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <img
                                                                            src={
                                                                                user.image
                                                                            }
                                                                            alt="follower-img"
                                                                            className="img-fluid rounded-circle border image me-2"
                                                                        />
                                                                        <div>
                                                                            <div className="username">
                                                                                {
                                                                                    user.username
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="bio">
                                                                        {
                                                                            user.bio
                                                                        }
                                                                    </div>
                                                                    <div className="d-flex border-top pt-2 mt-2">
                                                                        {user
                                                                            .followList
                                                                            .length ===
                                                                        0 ? (
                                                                            <>

                                                                            </>
                                                                        ) : user
                                                                              .followList
                                                                              .length ===
                                                                          1 ? (
                                                                            <div className="num-of-follower">
                                                                                {`${user.followList.length} Follower`}
                                                                            </div>
                                                                        ) : (
                                                                            <div className="num-of-follower">
                                                                                {`${user.followList.length} Followers`}
                                                                            </div>
                                                                        )}
                                                                        {user.following ? (
                                                                            <div
                                                                                className="ms-auto btn border-success btn-follow bg-white text-success font-btn rounded-pill"
                                                                                onClick={() => {
                                                                                    if (
                                                                                        userInfo &&
                                                                                        token
                                                                                    ) {
                                                                                        dispatch(
                                                                                            unFollowUser(
                                                                                                user.username,
                                                                                                token
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
                                                                                className="ms-auto btn bg-success text-white btn-follow font-btn rounded-pill"
                                                                                onClick={() => {
                                                                                    if (
                                                                                        userInfo &&
                                                                                        token
                                                                                    ) {
                                                                                        dispatch(
                                                                                            followUser(
                                                                                                user.username,
                                                                                                token
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
                                                                    </div>
                                                                </Link>
                                                            </Popover.Body>
                                                        </Popover>
                                                    }
                                                >
                                                    <img
                                                        src={user.image}
                                                        alt="img-user-following"
                                                        className="image-user rounded-circle border-white me-2"
                                                    />
                                                </OverlayTrigger>
                                            );
                                        })}
                                        {userListLoadMore &&
                                        userListLoadMore.loading ? (
                                            <div className="text-dark d-flex justify-content-center align-items-center">
                                                <div
                                                    className="spinner-border"
                                                    role="status"
                                                >
                                                    <span className="visually-hidden">
                                                        Loading...
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            page &&
                                            pages &&
                                            pages > 1 &&
                                            page < pages && (
                                                <div
                                                    className="icon-more rounded-circle d-flex align-items-center justify-content-center"
                                                    onClick={() => {
                                                        setPageUser(
                                                            (prev) => prev + 1
                                                        );
                                                    }}
                                                >
                                                    <i
                                                        className="fa fa-ellipsis-h"
                                                        aria-hidden="true"
                                                    ></i>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                        <div className="col-12 d-flex justify-content-center mt-2">
                            <div className="col-10" id="list-article">
                                <ListArticleYourFeed />
                            </div>
                        </div>
                    </div>
                    <aside className="col-3 position-relative">
                        <div className="popular-tag p-4 border-start">
                            <div className="mt-2 ms-1 pb-4 border-bottom">
                                <SearchBox />
                            </div>
                            <div className="mt-2 ms-1 pb-2 border-bottom">
                                <ListArticleTrending />
                            </div>
                            <div className="font-subject fw-bold ms-1 mt-2">
                                Recommended topics
                            </div>
                            <PopularTag />

                            <ListUnFollowUser flag={"home"} />

                            <div>
                                <Footer />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        );
    }
    return <HomeGuess />;
};
export default HomeScreen;
