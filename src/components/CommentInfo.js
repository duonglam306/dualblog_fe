import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import Moment from "react-moment";
import Cookies from "js-cookie";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import dompurify from "dompurify";

import { createComment, deleteComment } from "../actions/commentActions";

import "../css/ArticleScreen.css";

function CommentInfo({ cmt, slug, article_auth_name }) {
    const sanitizer = dompurify.sanitize;
    const config = {
        style: {
            font: "0.8em Arial",
        },
        toolbarStickyOffset: 80,
        toolbar: false,
        minHeight: "100px",
    };
    const token = Cookies.get("token");

    const [comment, setComment] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const createCommentHandler = (parent) => {
        if (!userInfo) {
            navigate("/login");
        }
        dispatch(createComment(slug, parent, comment, token, "reply"));
    };

    const deleteCommentHandler = (id) => {
        if (!userInfo) {
            navigate("/login");
        }
        dispatch(deleteComment(slug, id, token, "reply"));
    };

    return (
        <div className="comment rounded border mt-2" key={cmt._id}>
            <div className="author d-flex justify-content-between align-items-center  px-2 py-1">
                <div className="d-flex align-items-center">
                    <Link
                        to={`/@${cmt.auth_name}`}
                        className="text-decoration-none d-flex text-dark align-items-center"
                    >
                        <img
                            src={cmt.auth_image}
                            alt="avt-user"
                            className="image rounded-circle me-2"
                        />

                        <div className="me-2">
                            <div className="username">{cmt.auth_name}</div>
                            <div className="date">
                                <OverlayTrigger
                                    trigger={["hover", "focus"]}
                                    placement="bottom"
                                    overlay={
                                        <Tooltip className="date">
                                            <Moment format="ddd, MMM DD YYYY HH:mm">
                                                {cmt.createdAt}
                                            </Moment>
                                        </Tooltip>
                                    }
                                >
                                    <Moment fromNow>{cmt.createdAt}</Moment>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </Link>
                    <div className="btn-see-root-cmt btn-feature">
                        <i
                            className="fa fa-chevron-down"
                            aria-hidden="true"
                            data-bs-toggle="collapse"
                            href={`#seeRootCmt-${cmt._id}`}
                            role="button"
                            aria-expanded="false"
                            aria-controls={`seeRootCmt-${cmt._id}`}
                        ></i>
                    </div>
                </div>
                {userInfo &&
                    (userInfo.username === cmt.auth_name ||
                        userInfo.username === article_auth_name) && (
                        <div
                            className="btn-delete btn-feature"
                            data-bs-toggle="collapse"
                            href={`#deleteReply-${cmt._id}`}
                            role="button"
                            aria-expanded="false"
                            aria-controls={`deleteReply-${cmt._id}`}
                        >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </div>
                    )}
            </div>
            <div
                className="collapse border-bottom border-top"
                id={`deleteReply-${cmt._id}`}
            >
                <div className="card card-delete-comment border-0 mt-2 rounded-0">
                    <div className="p-2">
                        <div className="text-center description font-text mb-3">
                            Are you sure you want to delete this comment?
                        </div>
                        <div className="d-flex mx-auto col-6 justify-content-around">
                            <button
                                type="button"
                                className="btn font-btn btn-outline-secondary rounded-pill me-4"
                                data-bs-dismiss="modal"
                                data-bs-toggle="collapse"
                                href={`#deleteReply-${cmt._id}`}
                                aria-expanded="false"
                                aria-controls={`deleteReply-${cmt._id}`}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn font-btn btn-danger rounded-pill"
                                data-bs-dismiss="modal"
                                onClick={() => deleteCommentHandler(cmt._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="collapse mt-2 mx-2" id={`seeRootCmt-${cmt._id}`}>
                <div className="card root-cmt px-2 py-1">
                    <div className="parent">
                        {cmt.parent_auth_name} said:{" "}
                        <i
                            className="fa fa-long-arrow-up"
                            aria-hidden="true"
                        ></i>
                    </div>
                    <div
                        className="body"
                        dangerouslySetInnerHTML={{
                            __html: sanitizer(cmt.parent_body),
                        }}
                    ></div>
                </div>
            </div>
            <div className="px-2 py-1">
                <div
                    className="body my-2"
                    dangerouslySetInnerHTML={{
                        __html: sanitizer(cmt.body),
                    }}
                ></div>
                <div className="d-flex align-items-center">
                    {/* <div className="btn-like btn-feature font-btn me-auto">
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                    </div> */}
                    {cmt.level === 2 && (
                        <div
                            className="btn-reply font-btn"
                            onClick={() => {
                                if (!userInfo) {
                                    navigate("/login");
                                }
                                if (userInfo.username !== cmt.auth_name) {
                                    setComment(
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
                    )}
                </div>
            </div>
            <div className="collapse" id={`replyBox-${cmt._id}`}>
                <div className="card rounded-0 border-end-0 border-bottom-0 border-start-0 mt-2">
                    <div className={`form-comment p-2`}>
                        <div className="user-info d-flex align-items-center">
                            <img
                                src={userInfo && userInfo.image}
                                alt="avt-user"
                                className="image rounded-circle border me-2"
                            />
                            <div className="font-text username">
                                {userInfo && userInfo.username}
                            </div>
                        </div>
                        <div className="mt-2">
                            <JoditEditor
                                tabIndex={1}
                                onBlur={(newContent) => setComment(newContent)}
                                config={config}
                                value={comment}
                                id="commentInput"
                            />
                        </div>
                        <div className="list-btn d-flex align-items-center mt-2 justify-content-end">
                            <div
                                className="btn-cancel py-1 px-2 bg-white text-dark fw-bold font-btn me-2"
                                onClick={() => {
                                    setComment("");
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
                                    comment === "" ? "disabled" : ""
                                }`}
                                onClick={() => {
                                    createCommentHandler(cmt._id);
                                    setComment("");
                                }}
                            >
                                Respond
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentInfo;
