import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import JoditEditor from "jodit-react";
import Moment from "react-moment";
import { Popover, OverlayTrigger, Tooltip } from "react-bootstrap";
import dompurify from "dompurify";

import { getDetailArticle } from "../actions/articleActions";
import {
    getProfileUser,
    followUser,
    unFollowUser,
} from "../actions/userActions";
import { favoriteArticle, unFavoriteArticle } from "../actions/articleActions";
import {
    listComment,
    listCommentLoadMore,
    createComment,
    deleteComment,
} from "../actions/commentActions";

import { HeaderVertical } from "../components/Header";
import SearchBox from "../components/SearchBox";
import {
    ListArticleRelativeByAuthor,
    ListArticleRelativeByTag,
} from "../components/ListArticle";
import CommentInfo from "../components/CommentInfo";
import Footer from "../components/Footer";
import ListUnFollowUser from "../components/ListUnFollowUser";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ErrorNotFound from "../components/ErrorNotFound";

import "../css/ArticleScreen.css";

const ArticleScreen = () => {
    const token = Cookies.get("token");

    const sanitizer = dompurify.sanitize;
    const { slug } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const config = {
        style: {
            font: "0.8em Arial",
        },
        toolbarStickyOffset: 80,
        toolbar: false,
        minHeight: "100px",
    };

    const commentListLoadMore = useSelector(
        (state) => state.commentListLoadMore
    );

    const articleRelativeTag = useSelector((state) => state.articleRelativeTag);

    const userUnFollowList = useSelector((state) => state.userUnFollowList);

    const userUnFollow = useSelector((state) => state.userUnFollow);

    const userFollow = useSelector((state) => state.userFollow);

    const articleFavorite = useSelector((state) => state.articleFavorite);

    const articleUnFavorite = useSelector((state) => state.articleUnFavorite);

    const articleDelete = useSelector((state) => state.articleDelete);

    const commentList = useSelector((state) => state.commentList);
    const {
        comments: { comments, total, page, pages },
    } = commentList;

    const [isMinimize, setIsMinimize] = useState(true);

    const [comment, setComment] = useState("");
    const [reply, setReply] = useState("");
    const [pageComment, setPageComment] = useState(1);

    const articleDetails = useSelector((state) => state.articleDetails);
    const { article, loading } = articleDetails;

    const userProfile = useSelector((state) => state.userProfile);
    const { profile } = userProfile;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const articleRelativeAuthor = useSelector(
        (state) => state.articleRelativeAuthor
    );

    const [isMinimizeListBtn, setIsMinimizeListBtn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [error, setError] = useState(false);

    const changeBackground = () => {
        let btn = document.getElementById("btn-feature-bottom");
        let header = document.querySelector(".header-vertical-component");
        if (btn && window.scrollY + header.scrollHeight >= btn.offsetTop) {
            setIsMinimizeListBtn(false);
        } else {
            setIsMinimizeListBtn(true);
        }
    };

    const minimizeFormHandler = () => {
        if (!userInfo) {
            navigate("/login");
        }
        setIsMinimize(!isMinimize);
    };

    useEffect(() => {
        if (pageComment === 1) {
            dispatch(listComment(slug, pageComment));
        } else {
            dispatch(
                listCommentLoadMore(
                    `/api/articles/${slug}/comments?limit=10&offset=${pageComment}`
                )
            );
        }
    }, [dispatch, pageComment, slug]);

    useEffect(() => {
        dispatch(getDetailArticle(slug, token));
        changeBackground();
        window.addEventListener("scroll", changeBackground);
        return () => {
            window.removeEventListener("scroll", changeBackground);
        };
    }, [dispatch, slug, token]);

    useEffect(() => {
        if (article) {
            document.querySelector(
                "title"
            ).innerHTML = `${article.title} — Dual Blog`;
            dispatch(getProfileUser(article.auth_name, token));
        }
    }, [article, token, dispatch]);

    const createCommentHandler = (parent) => {
        if (!userInfo || !token) {
            navigate("/login");
        }
        if (parent) {
            dispatch(createComment(slug, parent, reply, token, "reply"));
        } else {
            dispatch(createComment(slug, parent, comment, token, "comment"));
        }
    };

    const deleteCommentHandler = (id) => {
        if (!userInfo || !token) {
            navigate("/login");
        }
        dispatch(deleteComment(slug, id, token, "comment"));
    };
    useEffect(() => {
        if (
            commentListLoadMore.error ||
            articleRelativeTag.error ||
            userUnFollowList.error ||
            commentList.error ||
            articleDetails.error ||
            userProfile.error ||
            articleRelativeAuthor.error
        ) {
            setError(true);
        } else setError(false);
    }, [
        commentListLoadMore,
        articleRelativeTag,
        userUnFollowList,
        commentList,
        articleDetails,
        userProfile,
        articleRelativeAuthor,
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
            {articleDelete.error && (
                <Message variant="danger">{articleDelete.error}</Message>
            )}
            {userFollow.error && (
                <Message variant="danger">{userFollow.error}</Message>
            )}
            {userUnFollow.error && (
                <Message variant="danger">{userUnFollow.error}</Message>
            )}
            <div
                className={`modal-comment ${isOpen ? "" : "d-none"}`}
                id="modal-create-comment"
            >
                <div className="modal-comment-overlay"></div>
                <div className="modal-comment-content p-3">
                    <div className="modal-comment-header d-flex justify-content-between align-items-center">
                        <div className="title-modal font-text">
                            Responses{" "}
                            {comments && total > 0 && "(" + total + ")"}
                        </div>
                        <div
                            className="btn-close"
                            onClick={() => setIsOpen(!isOpen)}
                        ></div>
                    </div>
                    <div
                        className={`form-comment-minimize rounded-1 border mt-3 ${
                            isMinimize ? "" : "d-none"
                        }`}
                        onClick={() => minimizeFormHandler()}
                    >
                        What are your thoughts?
                    </div>
                    {userInfo && (
                        <div
                            className={`form-comment rounded-1 border p-2 mt-3 ${
                                isMinimize ? "d-none" : ""
                            }`}
                        >
                            <div className="user-info d-flex align-items-center">
                                <img
                                    src={userInfo.image}
                                    alt="avt-user"
                                    className="image rounded-circle border me-2"
                                />
                                <div className="font-text username">
                                    {userInfo.username}
                                </div>
                            </div>
                            <div className="mt-2">
                                <JoditEditor
                                    tabIndex={1}
                                    onBlur={(newContent) =>
                                        setComment(newContent)
                                    }
                                    config={config}
                                    value={comment}
                                    id="commentInput"
                                />
                            </div>
                            <div className="list-btn d-flex align-items-center mt-2 justify-content-end">
                                <div
                                    className="btn-cancel py-1 px-2 bg-white text-dark fw-bold font-btn me-2"
                                    onClick={() => {
                                        setIsMinimize(!isMinimize);
                                        setComment("");
                                    }}
                                >
                                    Cancel
                                </div>
                                <div
                                    className={`btn-respond py-1 px-2 bg-success text-white fw-bold font-btn rounded-pill ${
                                        comment === "" ? "disabled" : ""
                                    }`}
                                    onClick={() => {
                                        createCommentHandler();
                                        setComment("");
                                    }}
                                >
                                    Respond
                                </div>
                            </div>
                        </div>
                    )}
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="comment-list mt-3">
                            {comments && total > 0 ? (
                                <>
                                    {comments.map((cmt) => {
                                        return (
                                            <div
                                                className="comment mt-2"
                                                key={cmt._id}
                                            >
                                                <div className="rounded border">
                                                    <div className="author d-flex justify-content-between px-2 py-1">
                                                        <div className="d-flex align-items-center">
                                                            <Link
                                                                to={`/@${cmt.auth_name}`}
                                                                className="text-decoration-none d-flex text-dark align-items-center"
                                                            >
                                                                <img
                                                                    src={
                                                                        cmt.auth_image
                                                                    }
                                                                    alt="avt-user"
                                                                    className="image rounded-circle me-2"
                                                                />

                                                                <div>
                                                                    <div className="username">
                                                                        {
                                                                            cmt.auth_name
                                                                        }
                                                                    </div>
                                                                    <div className="date">
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
                                                                                            cmt.createdAt
                                                                                        }
                                                                                    </Moment>
                                                                                </Tooltip>
                                                                            }
                                                                        >
                                                                            <Moment
                                                                                fromNow
                                                                            >
                                                                                {
                                                                                    cmt.createdAt
                                                                                }
                                                                            </Moment>
                                                                        </OverlayTrigger>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        {userInfo &&
                                                            (userInfo.username ===
                                                                cmt.auth_name ||
                                                                userInfo.username ===
                                                                    article.auth_name) && (
                                                                <div
                                                                    className="btn-delete btn-feature"
                                                                    data-bs-toggle="collapse"
                                                                    href={`#deleteComment-${cmt._id}`}
                                                                    role="button"
                                                                    aria-expanded="false"
                                                                    aria-controls={`deleteComment-${cmt._id}`}
                                                                >
                                                                    <i
                                                                        className="fa fa-trash"
                                                                        aria-hidden="true"
                                                                    ></i>
                                                                </div>
                                                            )}
                                                    </div>
                                                    <div
                                                        className="collapse border-bottom border-top"
                                                        id={`deleteComment-${cmt._id}`}
                                                    >
                                                        <div className="card card-delete-comment border-0 mt-2 rounded-0">
                                                            <div className="p-2">
                                                                <div className="text-center description font-text mb-3">
                                                                    Are you sure
                                                                    you want to
                                                                    delete this
                                                                    comment?
                                                                </div>
                                                                <div className="d-flex mx-auto col-6 justify-content-around">
                                                                    <button
                                                                        type="button"
                                                                        className="btn font-btn btn-outline-secondary rounded-pill me-4"
                                                                        data-bs-dismiss="modal"
                                                                        data-bs-toggle="collapse"
                                                                        href={`#deleteComment-${cmt._id}`}
                                                                        aria-expanded="false"
                                                                        aria-controls={`deleteComment-${cmt._id}`}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn font-btn btn-danger rounded-pill"
                                                                        data-bs-dismiss="modal"
                                                                        onClick={() =>
                                                                            deleteCommentHandler(
                                                                                cmt._id
                                                                            )
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="px-2 py-1">
                                                        <div
                                                            className="body my-2"
                                                            dangerouslySetInnerHTML={{
                                                                __html: sanitizer(
                                                                    cmt.body
                                                                ),
                                                            }}
                                                        ></div>
                                                        <div className="d-flex align-items-center">
                                                            {/* <div className="btn-like btn-feature font-btn me-auto">
                                                                <i
                                                                    className="fa fa-thumbs-up"
                                                                    aria-hidden="true"
                                                                ></i>
                                                            </div> */}
                                                            <div
                                                                className="btn-reply font-btn"
                                                                onClick={() => {
                                                                    if (
                                                                        !userInfo
                                                                    ) {
                                                                        navigate(
                                                                            "/login"
                                                                        );
                                                                    }
                                                                    if (
                                                                        userInfo.username !==
                                                                        cmt.auth_name
                                                                    ) {
                                                                        setReply(
                                                                            `<a href="/@${cmt.auth_name}" style="color: #000;font-weight: bold;">@${cmt.auth_name}</a> `
                                                                        );
                                                                    }
                                                                }}
                                                                data-bs-toggle="collapse"
                                                                href={`#replyBox-${cmt._id}`}
                                                                role="button"
                                                                aria-expanded="false"
                                                                aria-controls={`replyBox-${cmt._id}`}
                                                            >
                                                                Reply
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="collapse"
                                                        id={`replyBox-${cmt._id}`}
                                                    >
                                                        <div className="card rounded-0 border-end-0 border-start-0 mt-2">
                                                            <div
                                                                className={`form-comment p-2`}
                                                            >
                                                                <div className="user-info d-flex align-items-center">
                                                                    <img
                                                                        src={
                                                                            userInfo &&
                                                                            userInfo.image
                                                                        }
                                                                        alt="avt-user"
                                                                        className="image rounded-circle border me-2"
                                                                    />
                                                                    <div className="font-text username">
                                                                        {userInfo &&
                                                                            userInfo.username}
                                                                    </div>
                                                                </div>
                                                                <div className="mt-2">
                                                                    <JoditEditor
                                                                        tabIndex={
                                                                            1
                                                                        }
                                                                        onBlur={(
                                                                            newContent
                                                                        ) =>
                                                                            setReply(
                                                                                newContent
                                                                            )
                                                                        }
                                                                        config={
                                                                            config
                                                                        }
                                                                        value={
                                                                            reply
                                                                        }
                                                                        id="commentInput"
                                                                    />
                                                                </div>
                                                                <div className="list-btn d-flex align-items-center mt-2 justify-content-end">
                                                                    <div
                                                                        className="btn-cancel py-1 px-2 bg-white text-dark fw-bold font-btn me-2"
                                                                        onClick={() => {
                                                                            setComment(
                                                                                ""
                                                                            );
                                                                        }}
                                                                        data-bs-toggle="collapse"
                                                                        href={`#replyBox-${cmt._id}`}
                                                                        role="button"
                                                                        aria-expanded="false"
                                                                        aria-controls={`replyBox-${cmt._id}`}
                                                                    >
                                                                        Cancel
                                                                    </div>
                                                                    <div
                                                                        className={`btn-respond py-1 px-2 bg-success text-white fw-bold font-btn rounded-pill ${
                                                                            reply ===
                                                                            ""
                                                                                ? "disabled"
                                                                                : ""
                                                                        }`}
                                                                        onClick={() => {
                                                                            createCommentHandler(
                                                                                cmt._id
                                                                            );
                                                                            setReply(
                                                                                ""
                                                                            );
                                                                        }}
                                                                    >
                                                                        Respond
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {cmt.replyContentList
                                                        .length > 0 &&
                                                        !document.getElementById(
                                                            `#replyBox-${cmt._id}`
                                                        ) && (
                                                            <div
                                                                className="btn-more-reply btn-feature px-2 py-1"
                                                                id={`btn-more-reply-${cmt._id}`}
                                                                data-bs-toggle="collapse"
                                                                href={`#listReplyBox-${cmt._id}`}
                                                                role="button"
                                                                aria-expanded="false"
                                                                aria-controls={`listReplyBox-${cmt._id}`}
                                                                onClick={() =>
                                                                    (document.querySelector(
                                                                        `#btn-more-reply-${cmt._id}`
                                                                    ).style.display =
                                                                        "none")
                                                                }
                                                            >
                                                                {cmt
                                                                    .replyContentList
                                                                    .length > 0
                                                                    ? `There are ${cmt.replyContentList.length} replies --- Display its`
                                                                    : `There is ${cmt.replyContentList.length} reply --- Display it`}
                                                            </div>
                                                        )}
                                                </div>

                                                <div
                                                    className="collapse"
                                                    id={`listReplyBox-${cmt._id}`}
                                                >
                                                    <div className="card rounded-0 border-0">
                                                        <div className="reply-list ms-3 ps-3 border-start border-2">
                                                            {cmt.replyContentList.map(
                                                                (reply) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                reply._id
                                                                            }
                                                                        >
                                                                            <CommentInfo
                                                                                cmt={
                                                                                    reply
                                                                                }
                                                                                slug={
                                                                                    slug
                                                                                }
                                                                                article_auth_name={
                                                                                    article.auth_name
                                                                                }
                                                                            />
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {commentListLoadMore &&
                                    commentListLoadMore.loading ? (
                                        <Loader />
                                    ) : page &&
                                      pages &&
                                      pages > 1 &&
                                      page < pages ? (
                                        <div className="d-flex justify-content-center">
                                            <div
                                                className="btn my-3 col-5 text-white bg-dark rounded-0 font-btn"
                                                onClick={() => {
                                                    setPageComment(
                                                        (prev) => prev + 1
                                                    );
                                                }}
                                            >
                                                Load More
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ) : (
                                <div className="empty-comment font-text d-flex align-items-center text-center justify-content-center">
                                    <i>
                                        There are currently no responses for
                                        this story. <br />
                                        Be the first to respond.
                                    </i>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {loading ? (
                <Loader />
            ) : commentList.loading ? (
                <Loader />
            ) : (
                article && (
                    <div className="article-component d-flex justify-content-between">
                        <aside className="col-1 position-relative">
                            <HeaderVertical />
                        </aside>
                        <div className="col-8 mt-5 d-flex justify-content-center position-relative">
                            <div className="col-9 mx-auto article">
                                <div className="author-row d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="image me-2">
                                            <Link to={`/@${article.auth_name}`}>
                                                <img
                                                    src={article.auth_image}
                                                    alt="author-img"
                                                    className="img-fluid rounded-circle border"
                                                />
                                            </Link>
                                        </div>
                                        <div className="me-4">
                                            <Link
                                                to={`/@${article.auth_name}`}
                                                className="text-decoration-none text-dark"
                                            >
                                                <div className="name fw-bold">
                                                    {article.auth_name}
                                                </div>
                                            </Link>
                                            <div className="date">
                                                <OverlayTrigger
                                                    trigger={["hover", "focus"]}
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
                                        </div>
                                    </div>
                                    <div className="d-flex btn-feature">
                                        <div className="d-flex align-items-center">
                                            {article.favorited ? (
                                                <OverlayTrigger
                                                    trigger={["hover", "focus"]}
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
                                                                        "details"
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
                                                    trigger={["hover", "focus"]}
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
                                                                        "details"
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
                                            <div className="ms-2 d-flex align-items-center">
                                                <i
                                                    onClick={() =>
                                                        setIsOpen(true)
                                                    }
                                                    className="fa fa-comments-o"
                                                    aria-hidden="true"
                                                ></i>
                                                <div className="ms-2">
                                                    {comments &&
                                                        total > 0 &&
                                                        total}
                                                </div>
                                            </div>
                                        </div>
                                        {userInfo &&
                                            userInfo.username ===
                                                article.auth_name && (
                                                <OverlayTrigger
                                                    trigger="click"
                                                    placement="bottom"
                                                    overlay={
                                                        <Popover id="popover-article">
                                                            <Popover.Body>
                                                                <Link
                                                                    to={`/editor/${article.slug}`}
                                                                    className="text-decoration-none"
                                                                >
                                                                    <div className="text-dark btn-article mb-2">
                                                                        Edit
                                                                        Article
                                                                    </div>
                                                                </Link>
                                                                <div
                                                                    className="btn-article btn-delete"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#deleteModalDetails"
                                                                >
                                                                    Delete
                                                                    Article
                                                                </div>
                                                            </Popover.Body>
                                                        </Popover>
                                                    }
                                                    rootClose
                                                >
                                                    <i
                                                        className="fa fa-ellipsis-h my-auto ms-3"
                                                        aria-hidden="true"
                                                    ></i>
                                                </OverlayTrigger>
                                            )}
                                    </div>
                                </div>
                                <div className="title-article mt-3 font-text">
                                    {article.title}
                                </div>
                                <div
                                    className="body-article mt-3"
                                    dangerouslySetInnerHTML={{
                                        __html: sanitizer(article.body),
                                    }}
                                />
                                <div
                                    id="btn-feature-bottom"
                                    className="d-flex justify-content-between btn-feature py-3 border-bottom border-success border-2"
                                >
                                    <div className="d-flex col-4">
                                        {article.favorited ? (
                                            <OverlayTrigger
                                                trigger={["hover", "focus"]}
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
                                                        if (token && userInfo) {
                                                            dispatch(
                                                                unFavoriteArticle(
                                                                    article.slug,
                                                                    token,
                                                                    "details"
                                                                )
                                                            );
                                                        } else {
                                                            navigate("/login");
                                                        }
                                                    }}
                                                >
                                                    <i className="fa fa-heart"></i>
                                                </div>
                                            </OverlayTrigger>
                                        ) : (
                                            <OverlayTrigger
                                                trigger={["hover", "focus"]}
                                                placement="top"
                                                overlay={
                                                    <Tooltip>Favorite</Tooltip>
                                                }
                                            >
                                                <div
                                                    className="btn-like"
                                                    onClick={() => {
                                                        if (token && userInfo) {
                                                            dispatch(
                                                                favoriteArticle(
                                                                    article.slug,
                                                                    token,
                                                                    "details"
                                                                )
                                                            );
                                                        } else {
                                                            navigate("/login");
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
                                        <div className="ms-2 d-flex align-items-center">
                                            <i
                                                onClick={() =>
                                                    setIsOpen(!isOpen)
                                                }
                                                className="fa fa-comments-o"
                                                aria-hidden="true"
                                            ></i>
                                            <div className="ms-2">
                                                {comments && total > 0 && total}
                                            </div>
                                        </div>
                                    </div>
                                    {userInfo &&
                                        userInfo.username ===
                                            article.auth_name && (
                                            <OverlayTrigger
                                                trigger="click"
                                                placement="bottom"
                                                overlay={
                                                    <Popover id="popover-article">
                                                        <Popover.Body>
                                                            <Link
                                                                to={`/editor/${article.slug}`}
                                                                className="text-decoration-none"
                                                            >
                                                                <div className="text-dark btn-article mb-2">
                                                                    Edit Article
                                                                </div>
                                                            </Link>
                                                            <div
                                                                className="btn-article btn-delete"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteModalDetails"
                                                            >
                                                                Delete Article
                                                            </div>
                                                        </Popover.Body>
                                                    </Popover>
                                                }
                                                rootClose
                                            >
                                                <i
                                                    className="fa fa-ellipsis-h my-auto ms-3"
                                                    aria-hidden="true"
                                                ></i>
                                            </OverlayTrigger>
                                        )}
                                </div>
                                <div className="article-relative-list mb-3">
                                    <ListArticleRelativeByAuthor
                                        author={article.auth_name}
                                        slug={article.slug}
                                    />
                                </div>
                                <div
                                    className={`${
                                        isMinimizeListBtn ? "d-flex" : "d-none"
                                    } justify-content-around align-items-center bg-white mx-auto py-1 px-2 col-4 rounded-pill btn-feature btn-feature-minimize`}
                                >
                                    <div className="d-flex">
                                        {article.favorited ? (
                                            <OverlayTrigger
                                                trigger={["hover", "focus"]}
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
                                                        if (token && userInfo) {
                                                            dispatch(
                                                                unFavoriteArticle(
                                                                    article.slug,
                                                                    token,
                                                                    "details"
                                                                )
                                                            );
                                                        } else {
                                                            navigate("/login");
                                                        }
                                                    }}
                                                >
                                                    <i className="fa fa-heart"></i>
                                                </div>
                                            </OverlayTrigger>
                                        ) : (
                                            <OverlayTrigger
                                                trigger={["hover", "focus"]}
                                                placement="top"
                                                overlay={
                                                    <Tooltip>Favorite</Tooltip>
                                                }
                                            >
                                                <div
                                                    className="btn-like"
                                                    onClick={() => {
                                                        if (token && userInfo) {
                                                            dispatch(
                                                                favoriteArticle(
                                                                    article.slug,
                                                                    token,
                                                                    "details"
                                                                )
                                                            );
                                                        } else {
                                                            navigate("/login");
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
                                    </div>
                                    <div className="vr"></div>
                                    <div className="d-flex align-items-center">
                                        <i
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="fa fa-comments-o"
                                            aria-hidden="true"
                                        ></i>
                                        <div className="ms-2">
                                            {comments && total > 0 && total}
                                        </div>
                                    </div>

                                    {userInfo &&
                                        userInfo.username ===
                                            article.auth_name && (
                                            <>
                                                <div className="vr"></div>
                                                <OverlayTrigger
                                                    trigger="click"
                                                    placement="top"
                                                    overlay={
                                                        <Popover id="popover-article">
                                                            <Popover.Body>
                                                                <Link
                                                                    to={`/editor/${article.slug}`}
                                                                    className="text-decoration-none"
                                                                >
                                                                    <div className="text-dark btn-article mb-2">
                                                                        Edit
                                                                        Article
                                                                    </div>
                                                                </Link>
                                                                <div
                                                                    className="btn-article btn-delete"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#deleteModalDetails"
                                                                >
                                                                    Delete
                                                                    Article
                                                                </div>
                                                            </Popover.Body>
                                                        </Popover>
                                                    }
                                                    rootClose
                                                >
                                                    <i
                                                        className="fa fa-ellipsis-h my-auto"
                                                        aria-hidden="true"
                                                    ></i>
                                                </OverlayTrigger>
                                            </>
                                        )}
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
                                {userProfile.loading ? (
                                    <Loader />
                                ) : (
                                    profile && (
                                        <div className="mt-3">
                                            <div className="information me-auto">
                                                <Link
                                                    to={`/@${article.auth_name}`}
                                                    className="text-decoration-none text-dark"
                                                >
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
                                                        {
                                                            profile
                                                                .subscriberList
                                                                .length
                                                        }{" "}
                                                        Followers
                                                    </div>
                                                    <div className="bio font-text">
                                                        {profile.bio}
                                                    </div>
                                                </Link>
                                            </div>
                                            {userInfo &&
                                            userInfo.username ===
                                                profile.username ? (
                                                <Link
                                                    to="/setting"
                                                    className="text-success text-decoration-none btn-edit font-btn"
                                                >
                                                    Edit Profile
                                                </Link>
                                            ) : (
                                                <>
                                                    {userInfo &&
                                                    profile.following ? (
                                                        <div
                                                            className="mt-3 btn border-success btn-edit bg-white text-success font-btn rounded-pill"
                                                            onClick={() => {
                                                                if (userInfo) {
                                                                    dispatch(
                                                                        unFollowUser(
                                                                            profile.username,
                                                                            token,
                                                                            "profile"
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
                                                            className="mt-3 btn bg-success text-white btn-edit font-btn rounded-pill"
                                                            onClick={() => {
                                                                if (userInfo) {
                                                                    dispatch(
                                                                        followUser(
                                                                            profile.username,
                                                                            token,
                                                                            "profile"
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
                                            <div className="more-article-tag-relative my-3 me-auto pb-2 border-bottom">
                                                <ListArticleRelativeByTag
                                                    tag={article.tagList}
                                                    slug={article.slug}
                                                />
                                            </div>
                                            <div className="mt-2 pb-2 border-bottom">
                                                <ListUnFollowUser />
                                            </div>
                                            <div>
                                                <Footer />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </aside>
                    </div>
                )
            )}
        </div>
    );
};

export default ArticleScreen;
