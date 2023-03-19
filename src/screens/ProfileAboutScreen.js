import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import dompurify from "dompurify";
import Cookies from "js-cookie";

import {
    updateUser,
    getProfileUser,
    followUser,
    unFollowUser,
} from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

import { HeaderVertical } from "../components/Header";
import Footer from "../components/Footer";
import SearchBox from "../components/SearchBox";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ErrorNotFound from "../components/ErrorNotFound";
import ListFollowUser from "../components/ListFollowUser";

import "../css/ProfileScreen.css";

const ProfileAboutScreen = () => {
    const config = {
        style: {
            font: "0.8em Arial",
        },
        toolbarStickyOffset: 80,
    };
    const sanitizer = dompurify.sanitize;
    let { userName } = useParams();

    let token = Cookies.get("token");

    document.querySelector(
        "title"
    ).innerHTML = `About — @${userName} — DualBlog`;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userProfile = useSelector((state) => state.userProfile);
    const { profile } = userProfile;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading } = userUpdate;

    const userFollowList = useSelector((state) => state.userFollowList);

    const userUnFollow = useSelector((state) => state.userUnFollow);

    const userFollow = useSelector((state) => state.userFollow);

    const [about, setAbout] = useState(
        profile && profile.about ? profile.about : ""
    );
    const [editAbout, setEditAbout] = useState(false);

    useEffect(() => {
        if (!userInfo || !token) {
            navigate(`/@${userName}`);
        }
    }, [userName, userInfo, navigate, token]);

    useEffect(() => {
        dispatch(getProfileUser(userName, token));
    }, [dispatch, navigate, token, userName]);

    const updateHandler = (e) => {
        e.preventDefault();
        setEditAbout(!editAbout);
        dispatch(
            updateUser(
                {
                    image: profile.image,
                    email: profile.email,
                    username: profile.username,
                    bio: profile.bio,
                    about,
                },
                token
            )
        );
    };

    const cancelHandler = () => {
        setEditAbout(!editAbout);
        setAbout(profile.about);
        dispatch({ type: USER_UPDATE_RESET });
    };

    function checkInfo() {
        if (userInfo && profile.username !== userInfo.username && !about) {
            return true;
        } else if (!userInfo && !profile.about) {
            return true;
        } else return false;
    }

    function renderBoxAbout() {
        if (!(userInfo && userInfo.username === profile.username) && about) {
            return (
                <div className="col-12">
                    <div className="col-12 py-5 border-bottom">
                        <div
                            className="about border-0 font-text"
                            dangerouslySetInnerHTML={{
                                __html: sanitizer(about),
                            }}
                        ></div>
                    </div>
                    <div
                        className={`info-follow font-text d-flex mt-3 text-success`}
                    >
                        {`${profile.subscriberList.length} Followers - ${profile.followList.length} Following`}
                    </div>
                </div>
            );
        }
        if (userInfo && userInfo.username === profile.username && about) {
            return (
                <div className="col-12">
                    <div className="col-12 pt-5 py-3 list-btn d-flex justify-content-end">
                        {editAbout ? (
                            <>
                                <div className="me-2">
                                    <button
                                        className="rounded-pill"
                                        onClick={() =>
                                            cancelHandler("username")
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="border-dark text-white bg-dark rounded-pill"
                                        onClick={(e) =>
                                            updateHandler(e, "username")
                                        }
                                    >
                                        Save
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div>
                                <button
                                    className="text-success border-0 fw-bold"
                                    onClick={() => {
                                        setEditAbout(!editAbout);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="col-12 border-bottom pb-5">
                        {editAbout ? (
                            <JoditEditor
                                tabIndex={1}
                                onBlur={(newContent) => setAbout(newContent)}
                                value={about}
                                config={config}
                                id="aboutInput"
                            />
                        ) : (
                            <div
                                className="about border-0 font-text"
                                dangerouslySetInnerHTML={{
                                    __html: sanitizer(about),
                                }}
                            ></div>
                        )}
                    </div>
                    <div
                        className={`info-follow font-text d-flex mt-3 text-success`}
                    >
                        {`${profile.subscriberList.length} Followers - ${profile.followList.length} Following`}
                    </div>
                </div>
            );
        }
        if (userInfo && userInfo.username === profile.username && !about) {
            return (
                <>
                    {editAbout ? (
                        <div className="border-bottom">
                            <div className="col-12 pt-5 pb-3 list-btn d-flex justify-content-end">
                                <div className="me-2">
                                    <button
                                        className="rounded-pill"
                                        onClick={() => cancelHandler()}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="border-dark text-white bg-dark rounded-pill"
                                        onClick={(e) => updateHandler(e)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                            <div className="col-12 pb-5">
                                <JoditEditor
                                    tabIndex={1}
                                    onBlur={(newContent) =>
                                        setAbout(newContent)
                                    }
                                    config={config}
                                    id="aboutInput"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="col-12 py-5 intro-about border-bottom">
                            <div className="col-10 mx-auto">
                                <div className="col-6 mx-auto my-2 font-text title">
                                    Tell the world about yourself
                                </div>
                                <div className="col-8 mx-auto my-2 font-text body">
                                    Here's where you can share more about
                                    yourself: your history, work experience,
                                    accomplishments, interests, dreams, and
                                    more. You can even add images and use rich
                                    text to personalize your bio.
                                </div>
                                <div className="col-6 mx-auto my-2 d-flex justify-content-center">
                                    <div
                                        className="col-6 btn btn-success rounded-pill"
                                        onClick={() => {
                                            setEditAbout(!editAbout);
                                        }}
                                    >
                                        Get Started
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div
                        className={`info-follow font-text d-flex mt-3 text-success`}
                    >
                        {`${profile.subscriberList.length} Followers - ${profile.followList.length} Following`}
                    </div>
                </>
            );
        }
    }

    const [error, setError] = useState(false);

    useEffect(() => {
        if (userProfile.error || userFollowList.error) {
            setError(true);
        } else {
            setError(false);
        }
    }, [userProfile, userFollowList]);

    if (error) {
        return <ErrorNotFound />;
    }
    return (
        profile && (
            <div className="position-relative">
                {userUpdate.error && (
                    <Message variant="danger">{error}</Message>
                )}
                {userFollow.error && (
                    <Message variant="danger">{userFollow.error}</Message>
                )}
                {userUnFollow.error && (
                    <Message variant="danger">{userUnFollow.error}</Message>
                )}
                <div className="profile-component d-flex justify-content-between">
                    <aside className="col-1 position-relative">
                        <HeaderVertical />
                    </aside>
                    <div className="col-8">
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <div className="col-10 mx-auto mt-4">
                                    <div className="title-page">
                                        {profile.username}
                                    </div>
                                    <nav className="nav mt-4 border-bottom">
                                        <Link
                                            className="text-decoration-none"
                                            to={`/@${userName}`}
                                        >
                                            <div className={`nav-item py-2`}>
                                                Home
                                            </div>
                                        </Link>
                                        {!checkInfo() && (
                                            <Link
                                                className="text-decoration-none"
                                                to={`/@${userName}/about`}
                                            >
                                                <div
                                                    className={`nav-item py-2 ms-3 active`}
                                                >
                                                    About
                                                </div>
                                            </Link>
                                        )}
                                    </nav>
                                </div>
                                <div className="col-12 d-flex justify-content-center">
                                    <div className="col-10" id="form-about">
                                        {renderBoxAbout()}
                                    </div>
                                </div>
                            </>
                        )}
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
                                    {profile.subscriberList.length} Followers
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
            </div>
        )
    );
};

export default ProfileAboutScreen;
