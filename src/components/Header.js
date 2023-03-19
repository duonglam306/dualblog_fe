import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip, OverlayTrigger, Popover } from "react-bootstrap";

import { logout } from "../actions/userActions";
import { createArticle, updateArticle } from "../actions/articleActions";
import { USER_REGISTER_RESET } from "../constants/userConstants";

import logo from "../image/logo.png";
import "../css/Header.css";

const HeaderVertical = ({
    isHomePage = false,
    isFavoriteArticlePage = false,
    isYourArticlePage = false,
    isEditorPage = false,
}) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);

    const { userInfo } = userLogin;
    const logoutHandler = () => {
        dispatch(logout());
    };
    return (
        <div className="header-vertical-component p-3 border-end d-flex align-items-center flex-column">
            <Link to="/">
                <div className="d-flex justify-content-center logo">
                    <img src={logo} alt="logo-web" className="img-fluid" />
                </div>
            </Link>
            <div className="mt-5 border-bottom pb-3 border-2">
                <Link to="/" className="text-decoration-none">
                    <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="right"
                        overlay={<Tooltip>Home</Tooltip>}
                    >
                        <div
                            className={`d-flex justify-content-center py-3 font-icon ${
                                isHomePage ? "active" : ""
                            }`}
                        >
                            <i className="fa fa-home" aria-hidden="true"></i>
                        </div>
                    </OverlayTrigger>
                </Link>
                <Link to="/me/favorite" className="text-decoration-none">
                    <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="right"
                        overlay={<Tooltip>Favorites</Tooltip>}
                    >
                        <div
                            className={`d-flex justify-content-center py-3 font-icon ${
                                isFavoriteArticlePage ? "active" : ""
                            }`}
                        >
                            <i
                                className="fa fa-gratipay"
                                aria-hidden="true"
                            ></i>
                        </div>
                    </OverlayTrigger>
                </Link>
                <Link to="/me/articles" className="text-decoration-none">
                    <OverlayTrigger
                        trigger={["hover", "focus"]}
                        placement="right"
                        overlay={<Tooltip>Your Articles</Tooltip>}
                    >
                        <div
                            className={`d-flex justify-content-center py-3 font-icon ${
                                isYourArticlePage ? "active" : ""
                            }`}
                        >
                            <i
                                className="fa fa-file-text-o"
                                aria-hidden="true"
                            ></i>
                        </div>
                    </OverlayTrigger>
                </Link>
            </div>
            <Link to="/editor" className="text-decoration-none">
                <OverlayTrigger
                    trigger={["hover", "focus"]}
                    placement="right"
                    overlay={<Tooltip>New Articles</Tooltip>}
                >
                    <div
                        className={`d-flex justify-content-center py-3 font-icon ${
                            isEditorPage ? "active" : ""
                        }`}
                    >
                        <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                        ></i>
                    </div>
                </OverlayTrigger>
            </Link>
            {userInfo && (
                <div className="d-flex justify-content-center icon-user mt-auto">
                    <OverlayTrigger
                        trigger="click"
                        placement="top"
                        overlay={
                            <Popover id="popover-header">
                                <Popover.Body className="p-0 py-3">
                                    <div
                                        className="popover-item px-3 py-2"
                                        onClick={() => logoutHandler()}
                                    >
                                        Sign Out
                                    </div>

                                    <a
                                        className="popover-item px-3 py-2"
                                        href="/setting"
                                    >
                                        Settings
                                    </a>

                                    <hr />

                                    <Link
                                        to={`/@${userInfo.username}`}
                                        className="text-decoration-none"
                                    >
                                        <div className="popover-item px-3 py-2 info-user d-flex align-items-center">
                                            <div className="col-2">
                                                <img
                                                    src={userInfo.image}
                                                    alt="avt-user"
                                                    className="img-fluid rounded-circle avt-user border border-1"
                                                />
                                            </div>
                                            <div className="col-9">
                                                <div className="user-name">
                                                    {userInfo.username}
                                                </div>
                                                <div className="user-email fw-light">
                                                    {userInfo.email}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Popover.Body>
                            </Popover>
                        }
                        rootClose
                    >
                        <img
                            src={userInfo.image}
                            alt="avt-user"
                            className="img-fluid rounded-circle avt-user border border-1"
                        />
                    </OverlayTrigger>
                </div>
            )}
        </div>
    );
};

const HeaderHorizontal = ({
    isHomePage = false,
    isFavoriteArticlePage = false,
    isYourArticlePage = false,
    isEditorPage = false,
    article = {},
    token = "",
    feature = "create",
}) => {
    const dispatch = useDispatch();

    const [isPublish, setIsPublish] = useState(false);
    const [isSave, setIsSave] = useState(false);

    function checkUrl(str) {
        if (str) {
            if (str.indexOf(".jpg") > -1) {
                return false;
            }
            if (str.indexOf(".jpeg") > -1) {
                return false;
            }
            if (str.indexOf(".gif") > -1) {
                return false;
            }
            if (str.indexOf(".png") > -1) {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }

    useEffect(() => {
        if (
            article.title === "" ||
            article.title?.length > 255 ||
            article.description === "" ||
            article.description?.length > 400 ||
            article.body === "" ||
            checkUrl(article.thumbnailUrl)
        ) {
            if (feature === "create") {
                setIsPublish(false);
            } else {
                setIsSave(false);
            }
        } else {
            if (feature === "create") {
                setIsPublish(true);
            } else {
                setIsSave(true);
            }
        }
    }, [article, feature]);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    const createArticleHandle = () => {
        let tagList = article.tagInputList.map((item) => item.value);
        tagList = [...new Set(tagList)];
        let { title, description, body, thumbnailUrl } = article;
        dispatch(
            createArticle(
                token,
                title,
                description,
                body,
                tagList,
                thumbnailUrl
            )
        );
    };

    const updateArticleHandle = () => {
        let { title, description, body, thumbnailUrl, slug } = article;
        dispatch(
            updateArticle(
                slug,
                {
                    title: title.trim(),
                    description,
                    body,
                    thumbnailUrl,
                },
                token
            )
        );
    };
    return (
        <div className="header-horizontal-component shadow-sm bg-white p-3">
            <div className="container d-flex">
                <Link to="/" className="col-2 text-decoration-none text-dark">
                    <div className="d-flex justify-content-center logo">
                        <img src={logo} alt="logo-web" className="img-fluid" />
                        <div className="mx-2 text-center font-title d-flex align-items-center fw-bold title-web">
                            DualBlog
                        </div>
                    </div>
                </Link>
                <div className="col-10 d-flex">
                    <div className="d-flex col-10 justify-content-end align-items-center border-2 border-end me-3">
                        {feature === "create" ? (
                            <>
                                {isEditorPage && (
                                    <div
                                        className={`btn btn-success rounded-pill ${
                                            isPublish ? "" : "disabled"
                                        }`}
                                        id="btn-publish"
                                        onClick={() => createArticleHandle()}
                                    >
                                        Publish
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {isEditorPage && (
                                    <div
                                        className={`btn btn-success rounded-pill ${
                                            isSave ? "" : "disabled"
                                        }`}
                                        id="btn-save"
                                        onClick={() => updateArticleHandle()}
                                    >
                                        Save
                                    </div>
                                )}
                            </>
                        )}

                        <Link to="/" className="text-decoration-none">
                            <OverlayTrigger
                                trigger={["hover", "focus"]}
                                placement="bottom"
                                overlay={<Tooltip>Home</Tooltip>}
                            >
                                <div
                                    className={`d-flex justify-content-center px-3 font-icon ${
                                        isHomePage ? "active" : ""
                                    }`}
                                >
                                    <i
                                        className="fa fa-home"
                                        aria-hidden="true"
                                    ></i>
                                </div>
                            </OverlayTrigger>
                        </Link>
                        <Link
                            to="/me/favorite"
                            className="text-decoration-none"
                        >
                            <OverlayTrigger
                                trigger={["hover", "focus"]}
                                placement="bottom"
                                overlay={<Tooltip>Favorites</Tooltip>}
                            >
                                <div
                                    className={`d-flex justify-content-center px-3 font-icon ${
                                        isFavoriteArticlePage ? "active" : ""
                                    }`}
                                >
                                    <i
                                        className="fa fa-gratipay"
                                        aria-hidden="true"
                                    ></i>
                                </div>
                            </OverlayTrigger>
                        </Link>
                        <Link
                            to="/me/articles"
                            className="text-decoration-none"
                        >
                            <OverlayTrigger
                                trigger={["hover", "focus"]}
                                placement="bottom"
                                overlay={<Tooltip>Your articles</Tooltip>}
                            >
                                <div
                                    className={`d-flex justify-content-center px-3 font-icon ${
                                        isYourArticlePage ? "active" : ""
                                    }`}
                                >
                                    <i
                                        className="fa fa-file-text-o"
                                        aria-hidden="true"
                                    ></i>
                                </div>
                            </OverlayTrigger>
                        </Link>
                        <Link to="/editor" className="text-decoration-none">
                            <OverlayTrigger
                                trigger={["hover", "focus"]}
                                placement="bottom"
                                overlay={<Tooltip>New article</Tooltip>}
                            >
                                <div
                                    className={`d-flex justify-content-center px-3 font-icon ${
                                        isEditorPage ? "active" : ""
                                    }`}
                                >
                                    <i
                                        className="fa fa-pencil-square-o"
                                        aria-hidden="true"
                                    ></i>
                                </div>
                            </OverlayTrigger>
                        </Link>
                    </div>

                    {userInfo && (
                        <div className="d-flex justify-content-center align-items-center icon-user">
                            <OverlayTrigger
                                trigger="click"
                                placement="bottom"
                                overlay={
                                    <Popover id="popover-header">
                                        <Popover.Body className="p-0 py-3">
                                            <Link
                                                to={`/@${userInfo.username}`}
                                                className="text-decoration-none"
                                            >
                                                <div className="popover-item px-3 py-2 info-user d-flex align-items-center">
                                                    <div className="col-2">
                                                        <img
                                                            src={userInfo.image}
                                                            alt="avt-user"
                                                            className="img-fluid rounded-circle avt-user border border-1"
                                                        />
                                                    </div>
                                                    <div className="col-9">
                                                        <div className="user-name">
                                                            {userInfo.username}
                                                        </div>
                                                        <div className="user-email fw-light">
                                                            {userInfo.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>

                                            <hr />
                                            <a
                                                className="popover-item px-3 py-2"
                                                href="/setting"
                                            >
                                                Settings
                                            </a>
                                            <div
                                                className="popover-item px-3 py-2"
                                                onClick={() => logoutHandler()}
                                            >
                                                Sign Out
                                            </div>
                                        </Popover.Body>
                                    </Popover>
                                }
                                rootClose
                            >
                                <img
                                    src={userInfo.image}
                                    alt="avt-user"
                                    className="img-fluid rounded-circle avt-user border border-1"
                                />
                            </OverlayTrigger>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const HeaderGuess = ({ activate = false }) => {
    const [navbar, setNavbar] = useState(false);
    const dispatch = useDispatch();

    const changeBackground = () => {
        let header = document.querySelector(".header-guess-component");
        if (header && window.scrollY >= header.scrollHeight) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    useEffect(() => {
        changeBackground();
        window.addEventListener("scroll", changeBackground);
        return () => {
            window.removeEventListener("scroll", changeBackground);
        };
    }, []);

    return (
        <>
            <div className="header-guess-component sticky-top">
                <nav
                    className={`navbar navbar-light border-bottom border-dark ${
                        navbar ? "bg-white" : "bg-warning"
                    }`}
                >
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center col-12 py-2">
                            <Link
                                to="/"
                                className="text-decoration-none text-dark"
                            >
                                <div className="d-flex col-4">
                                    <img
                                        src={logo}
                                        alt="logo-web"
                                        className="img-fluid"
                                    />
                                    <div className="mx-2 text-center font-title d-flex align-items-center fw-bold title-web">
                                        DualBlog
                                    </div>
                                </div>
                            </Link>
                            <div className="col-4 btn-author d-flex justify-content-end">
                                {!activate && (
                                    <Link to="/login">
                                        <div
                                            className="btn font-btn btn-white text-dark"
                                            onClick={() => {
                                                dispatch(logout());
                                            }}
                                        >
                                            Sign In
                                        </div>
                                    </Link>
                                )}

                                <Link to="/register">
                                    <div
                                        className={`btn font-btn text-white rounded-pill fw-bold ${
                                            navbar ? "btn-success" : "btn-dark"
                                        }`}
                                        onClick={() =>
                                            dispatch({
                                                type: USER_REGISTER_RESET,
                                            })
                                        }
                                    >
                                        Get Started
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default HeaderGuess;
export { HeaderVertical, HeaderHorizontal };
