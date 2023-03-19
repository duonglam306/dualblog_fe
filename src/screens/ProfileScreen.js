import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";

import {
    getProfileUser,
    followUser,
    unFollowUser,
} from "../actions/userActions";

import { HeaderVertical } from "../components/Header";
import { ListArticleByAuthor } from "../components/ListArticle";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ErrorNotFound from "../components/ErrorNotFound";
import ListFollowUser from "../components/ListFollowUser";

import "../css/ProfileScreen.css";

const ProfileScreen = () => {
    let { userName } = useParams();

    let token = Cookies.get("token");

    document.querySelector("title").innerHTML = `@${userName} — DualBlog`;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userProfile = useSelector((state) => state.userProfile);
    const { profile, loading } = userProfile;

    const userFollowList = useSelector((state) => state.userFollowList);

    const articleYourList = useSelector((state) => state.articleYourList);

    const articleListLoadMore = useSelector(
        (state) => state.articleListLoadMore
    );

    const userUnFollow = useSelector((state) => state.userUnFollow);

    const userFollow = useSelector((state) => state.userFollow);

    useEffect(() => {
        dispatch(getProfileUser(userName, token));
    }, [dispatch, navigate, token, userName]);

    function checkInfo() {
        if (
            userInfo &&
            profile.username !== userInfo.username &&
            !profile.about
        ) {
            return true;
        } else if (!userInfo && !profile.about) {
            return true;
        } else return false;
    }

    const [error, setError] = useState(false);

    useEffect(() => {
        if (
            userProfile.error ||
            userFollowList.error ||
            articleYourList.error ||
            articleListLoadMore.error
        ) {
            setError(true);
        } else setError(false);
    }, [userProfile, userFollowList, articleYourList, articleListLoadMore]);

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
            {loading ? (
                <Loader />
            ) : (
                profile && (
                    <>
                        <div className="profile-component d-flex justify-content-between">
                            <aside className="col-1 position-relative">
                                <HeaderVertical />
                            </aside>
                            <div className="col-8">
                                <div className="col-10 mx-auto mt-4">
                                    <div className="title-page">
                                        {profile.username}
                                    </div>
                                    <nav className="nav mt-4 border-bottom">
                                        <Link
                                            className="text-decoration-none"
                                            to={`/@${userName}`}
                                        >
                                            <div
                                                className={`nav-item py-2 active`}
                                            >
                                                Home
                                            </div>
                                        </Link>
                                        {!checkInfo() && (
                                            <Link
                                                className="text-decoration-none"
                                                to={`/@${userName}/about`}
                                            >
                                                <div
                                                    className={`nav-item py-2 ms-3 `}
                                                >
                                                    About
                                                </div>
                                            </Link>
                                        )}
                                    </nav>
                                </div>
                                <div className="col-12 d-flex justify-content-center">
                                    <div className="col-10" id="list-article">
                                        <ListArticleByAuthor
                                            author={profile.username}
                                            flag="profile"
                                        />
                                    </div>
                                </div>
                            </div>
                            <aside className="col-3 position-relative">
                                <div className="user-profile-aside p-4 border-start">
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
                                    <div className="information mt-3 me-auto">
                                        <div className="image mb-1">
                                            <img
                                                src={profile.image}
                                                alt="user-img"
                                                className="img-fluid rounded-circle border"
                                            />
                                        </div>
                                        <div className="username font-text mb-1">
                                            {profile.username}
                                        </div>
                                        <div className="number-follow font-text mb-1">
                                            {profile.subscriberList.length}{" "}
                                            Followers
                                        </div>
                                        <div className="bio font-text">
                                            {profile.bio}
                                        </div>
                                    </div>
                                    {userInfo &&
                                    userInfo.username === profile.username ? (
                                        <Link
                                            to="/setting"
                                            className="text-success text-decoration-none btn-edit font-btn"
                                        >
                                            Edit Profile
                                        </Link>
                                    ) : (
                                        <>
                                            {userInfo && profile.following ? (
                                                <div
                                                    className="mt-3 btn border-success btn-edit bg-white text-success font-btn rounded-pill"
                                                    onClick={() => {
                                                        if (userInfo && token) {
                                                            dispatch(
                                                                unFollowUser(
                                                                    profile.username,
                                                                    token,
                                                                    "profile"
                                                                )
                                                            );
                                                        } else {
                                                            navigate("/login");
                                                        }
                                                    }}
                                                >
                                                    Following
                                                </div>
                                            ) : (
                                                <div
                                                    className="mt-3 btn bg-success text-white btn-edit font-btn rounded-pill"
                                                    onClick={() => {
                                                        if (userInfo && token) {
                                                            dispatch(
                                                                followUser(
                                                                    profile.username,
                                                                    token,
                                                                    "profile"
                                                                )
                                                            );
                                                        } else {
                                                            navigate("/login");
                                                        }
                                                    }}
                                                >
                                                    Follow
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <ListFollowUser />
                                    <div className="border-top mt-3">
                                        <Footer />
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default ProfileScreen;
