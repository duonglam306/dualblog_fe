import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";

import {
    followUser,
    unFollowUser,
    getFollowListUser,
    listUserLoadMore,
} from "../actions/userActions";

import Loader from "../components/Loader";

import "../css/ListFollowUser.css";

const ListFollowUser = () => {
    let { userName } = useParams();

    let token = Cookies.get("token");

    document.querySelector("title").innerHTML = `@${userName} — DualBlog`;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userFollowList = useSelector((state) => state.userFollowList);
    const {
        users: { users, page, pages, total },
        loading,
    } = userFollowList;

    const userListLoadMore = useSelector((state) => state.userListLoadMore);

    const [pageUser, setPageUser] = useState(1);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (pageUser === 1) {
            dispatch(getFollowListUser(userName, token, 1, 10));
        } else {
            dispatch(
                listUserLoadMore(
                    token,
                    `/api/profiles/${userName}/followList?limit=10&offset=${pageUser}`,
                    "follow-list"
                )
            );
        }
    }, [dispatch, token, userName, pageUser]);

    return (
        <div className="list-user-follow-component">
            {users && users.length > 5 && (
                <div
                    id="listUserFollowModal"
                    className={`modal-comment ${openModal ? "" : "d-none"}`}
                >
                    <div className="modal-list-user-follow-overlay"></div>
                    <div className="modal-content border-0">
                        <div className="modal-header pb-0 border-0">
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setOpenModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body pt-0">
                            <div className="my-2 title-modal font-text text-center">
                                {total} following
                            </div>
                            <div className="modal-main-content d-flex flex-column align-items-center">
                                <div className="mx-auto col-10 follow-list">
                                    {users.map((item) => {
                                        return (
                                            <div
                                                key={item.username}
                                                className="d-flex justify-content-between user-follow my-1 me-1"
                                            >
                                                <Link
                                                    to={`/@${item.username}`}
                                                    className="text-decoration-none col-9"
                                                >
                                                    <div className="col-12 d-flex align-items-center">
                                                        <div className="image me-2">
                                                            <img
                                                                src={item.image}
                                                                alt="follower-img"
                                                                className="img-fluid rounded-circle border"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="username">
                                                                {item.username}
                                                            </div>
                                                            <div className="bio">
                                                                {item.bio}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="col-2 d-flex align-items-center">
                                                    {userInfo &&
                                                    userInfo.username ===
                                                        item.username ? (
                                                        <div className="col-12 btn bg-secondary text-white btn-self font-btn rounded-pill">
                                                            You
                                                        </div>
                                                    ) : userInfo ? (
                                                        <>
                                                            {item.following ? (
                                                                <div
                                                                    className="col-12 btn border-success btn-follow bg-white text-success font-btn rounded-pill"
                                                                    onClick={() => {
                                                                        if (
                                                                            userInfo &&
                                                                            token
                                                                        ) {
                                                                            dispatch(
                                                                                unFollowUser(
                                                                                    item.username,
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
                                                                    className="col-12 btn bg-success text-white btn-follow font-btn rounded-pill"
                                                                    onClick={() => {
                                                                        if (
                                                                            userInfo &&
                                                                            token
                                                                        ) {
                                                                            dispatch(
                                                                                followUser(
                                                                                    item.username,
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
                                                        </>
                                                    ) : (
                                                        <>
                                                            {item.following ? (
                                                                <div
                                                                    className="col-12 btn border-success btn-follow bg-white text-success font-btn rounded-pill"
                                                                    data-bs-dismiss="modal"
                                                                    aria-label="Close"
                                                                    onClick={() => {
                                                                        if (
                                                                            userInfo &&
                                                                            token
                                                                        ) {
                                                                            dispatch(
                                                                                unFollowUser(
                                                                                    item.username,
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
                                                                    className="col-12 btn bg-success text-white btn-follow font-btn rounded-pill"
                                                                    data-bs-dismiss="modal"
                                                                    aria-label="Close"
                                                                    onClick={() => {
                                                                        if (
                                                                            userInfo &&
                                                                            token
                                                                        ) {
                                                                            dispatch(
                                                                                followUser(
                                                                                    item.username,
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
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {userListLoadMore &&
                                    userListLoadMore.loading ? (
                                        <div className="text-dark d-flex justify-content-center">
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
                                            <div className="col-12 d-flex justify-content-center">
                                                <div
                                                    className="btn col-3 my-3 text-white bg-dark rounded-0 font-btn"
                                                    onClick={() => {
                                                        setPageUser(
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
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {loading ? (
                <Loader />
            ) : (
                users &&
                users.length > 0 && (
                    <div className="following-col my-3 me-auto">
                        <div className="sub-title">Following</div>
                        <div className="followList mt-3">
                            <>
                                {users.map((item, index) => {
                                    return (
                                        index < 5 && (
                                            <div
                                                key={index}
                                                className="d-flex align-items-center user-follow my-2"
                                            >
                                                <Link
                                                    to={`/@${item.username}`}
                                                    className="text-decoration-none col-9"
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={item.image}
                                                            alt="follower-img"
                                                            className="img-fluid rounded-circle border image me-2"
                                                        />
                                                        <div>
                                                            <div className="username">
                                                                {item.username}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="col-3 d-flex justify-content-center">
                                                    {userInfo &&
                                                    userInfo.username ===
                                                        item.username ? (
                                                        <div className="col-12 btn bg-secondary text-white btn-self font-btn rounded-pill">
                                                            You
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {item.following ? (
                                                                <div
                                                                    className="col-12 btn border-success btn-follow bg-white text-success font-btn rounded-pill"
                                                                    onClick={() => {
                                                                        if (
                                                                            userInfo &&
                                                                            token
                                                                        ) {
                                                                            dispatch(
                                                                                unFollowUser(
                                                                                    item.username,
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
                                                                    className="col-12 btn bg-success text-white btn-follow font-btn rounded-pill"
                                                                    onClick={() => {
                                                                        if (
                                                                            userInfo &&
                                                                            token
                                                                        ) {
                                                                            dispatch(
                                                                                followUser(
                                                                                    item.username,
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
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    );
                                })}
                            </>
                        </div>
                        {users.length > 5 && (
                            <div
                                className="btn-see-more mt-3"
                                onClick={() => setOpenModal(true)}
                            >
                                {`See all (${total})`}
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default ListFollowUser;
