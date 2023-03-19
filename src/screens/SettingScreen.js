import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getCurrentUser } from "../actions/userActions";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { HeaderHorizontal } from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ErrorNotFound from "../components/ErrorNotFound";

import { USER_UPDATE_RESET } from "../constants/userConstants";

import "../css/SettingScreen.css";

const SettingScreen = () => {
    document.querySelector("title").innerHTML = "Settings — DualBlog";
    let token = Cookies.get("token");
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const [validOldPassword, setValidOldPassword] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [validUsername, setValidUsername] = useState(false);
    const [validBio, setValidBio] = useState(false);
    const [validImage, setValidImage] = useState(false);

    const dispatch = useDispatch();

    const userCurrent = useSelector((state) => state.userCurrent);
    const { user } = userCurrent;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, success, error } = userUpdate;

    const [editImage, setEditImage] = useState(false);
    const [editUsername, setEditUsername] = useState(false);
    const [editBio, setEditBio] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const updateHandler = (e, type) => {
        e.preventDefault();
        switch (type) {
            case "image":
                setEditImage(!editImage);
                dispatch(
                    updateUser(
                        {
                            image,
                            about: user.about,
                            username,
                            bio,
                        },
                        token
                    )
                );
                break;
            case "username":
                setEditUsername(!editUsername);
                dispatch(
                    updateUser(
                        {
                            image,
                            about: user.about,
                            username,
                            bio,
                        },
                        token
                    )
                );
                break;
            case "bio":
                setEditBio(!editBio);
                dispatch(
                    updateUser(
                        {
                            image,
                            username,
                            bio,
                            about: user.about,
                        },
                        token
                    )
                );
                break;
            case "password":
                setEditPassword(!editPassword);
                dispatch(
                    updateUser(
                        {
                            image,
                            username,
                            bio,
                            about: user.about,
                            password,
                            confirmPassword,
                        },
                        token
                    )
                );

                break;

            default:
                break;
        }
    };

    const cancelHandler = (type) => {
        switch (type) {
            case "image":
                setEditImage(!editImage);
                setImage(user.image);
                dispatch({ type: USER_UPDATE_RESET });
                break;
            case "username":
                setEditUsername(!editUsername);
                setUsername(user.username);
                dispatch({ type: USER_UPDATE_RESET });
                break;
            case "bio":
                setEditBio(!editBio);
                setBio(user.bio);
                dispatch({ type: USER_UPDATE_RESET });
                break;
            case "password":
                setEditPassword(!editPassword);
                setPassword("");
                setNewPassword("");
                setConfirmPassword("");
                dispatch({ type: USER_UPDATE_RESET });
                break;

            default:
                break;
        }
    };

    function checkUrl(str) {
        if (str) {
            if (str.indexOf(".jpg") > -1) {
                return true;
            }
            if (str.indexOf(".gif") > -1) {
                return true;
            }
            if (str.indexOf(".png") > -1) {
                return true;
            }
            return false;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (!userInfo || !token) {
            navigate("/login");
        } else {
            if (
                !user ||
                !user.username ||
                user.username !== userInfo.username ||
                success
            ) {
                dispatch({ type: USER_UPDATE_RESET });
                dispatch(getCurrentUser(token));
            } else {
                setUsername(user.username);
                setEmail(user.email);
                setBio(user.bio ? user.bio : "");
                setImage(user.image);
                setValidUsername(true);
                setValidImage(true);
                setValidBio(true);
            }

            if (error && user) {
                setUsername(user.username);
                setEmail(user.email);
                setBio(user.bio);
                setImage(user.image);
            }
        }
    }, [dispatch, navigate, userInfo, user, error, success, token]);
    if (userCurrent.error || userLogin.error) {
        return <ErrorNotFound />;
    }
    return (
        <div className="position-relative">
            {error && <Message variant="danger">{error}</Message>}
            <HeaderHorizontal />
            <div className="settings-component py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-8 offset-2">
                            {loading ? (
                                <Loader />
                            ) : (
                                <div>
                                    <h3 className="text-xs-center py-2 border-bottom">
                                        About You
                                    </h3>
                                    <div className="col-12 d-flex mt-4">
                                        <div className="col-9 info info-image">
                                            <div className="title fw-bold">
                                                Photo
                                            </div>
                                            <div className="d-flex">
                                                <form
                                                    className="col-9"
                                                    noValidate
                                                >
                                                    {editImage ? (
                                                        <div>
                                                            <input
                                                                className={`body p-0 col-12 border-0 border-bottom ${
                                                                    validImage
                                                                        ? ""
                                                                        : "is-invalid"
                                                                }`}
                                                                id="inputPhoto"
                                                                value={image}
                                                                required
                                                                placeholder="URL of profile picture"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setImage(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                    if (
                                                                        checkUrl(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    ) {
                                                                        setValidImage(
                                                                            true
                                                                        );
                                                                    } else
                                                                        setValidImage(
                                                                            false
                                                                        );
                                                                }}
                                                            />
                                                            <div className="invalid-feedback">
                                                                Invalid url of
                                                                image.
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <input
                                                            className={`body p-0 col-12 border-0 border-bottom`}
                                                            id="inputPhoto"
                                                            placeholder="URL of profile picture"
                                                            value={image}
                                                            disabled
                                                        />
                                                    )}

                                                    <div className="description mt-3">
                                                        <div className="mb-2">
                                                            Your photo appears
                                                            on your{" "}
                                                            <Link
                                                                className="text-dark"
                                                                to={`/@${username}`}
                                                            >
                                                                Profile
                                                            </Link>{" "}
                                                            page and with your
                                                            stories across
                                                            DualBlog.
                                                        </div>
                                                        <div>
                                                            Recommended: use url
                                                            of image, size
                                                            square. File type:
                                                            JPG, PNG or GIF.
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className="col-3 d-flex justify-content-center">
                                                    <img
                                                        src={image}
                                                        alt="avt-user"
                                                        className="image img-fluid rounded-circle border border-1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3 list-btn d-flex justify-content-end">
                                            {editImage ? (
                                                <>
                                                    <div className="me-2">
                                                        <button
                                                            className="border-success text-success rounded-pill"
                                                            onClick={(e) =>
                                                                updateHandler(
                                                                    e,
                                                                    "image"
                                                                )
                                                            }
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="rounded-pill"
                                                            onClick={() =>
                                                                cancelHandler(
                                                                    "image"
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div>
                                                    <button
                                                        className="rounded-pill"
                                                        onClick={() =>
                                                            setEditImage(
                                                                !editImage
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex mt-4">
                                        <div className="col-9 info info-name">
                                            <div className="title fw-bold">
                                                Username
                                            </div>
                                            <div className="d-flex">
                                                <form
                                                    className="col-9"
                                                    noValidate
                                                >
                                                    {editUsername ? (
                                                        <div>
                                                            <input
                                                                className={`body col-12 p-0 border-0 border-bottom ${
                                                                    validUsername
                                                                        ? ""
                                                                        : "is-invalid"
                                                                }`}
                                                                id="inputName"
                                                                value={username}
                                                                placeholder="Your Username"
                                                                required
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setUsername(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                    if (
                                                                        e.target
                                                                            .value &&
                                                                        e.target
                                                                            .value
                                                                            .length >=
                                                                            8 &&
                                                                        e.target
                                                                            .value
                                                                            .length <=
                                                                            25
                                                                    ) {
                                                                        setValidUsername(
                                                                            true
                                                                        );
                                                                    } else {
                                                                        setValidUsername(
                                                                            false
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                            <div className="invalid-feedback">
                                                                Username must
                                                                have length from
                                                                8 to 25
                                                                characters.
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <input
                                                            className="body col-12 p-0 border-0 border-bottom"
                                                            id="inputName"
                                                            value={username}
                                                            placeholder="Your Name"
                                                            disabled
                                                        />
                                                    )}

                                                    <div className="description mt-3">
                                                        Your name appears on
                                                        your{" "}
                                                        <Link
                                                            className="text-dark"
                                                            to={`/@${username}`}
                                                        >
                                                            Profile
                                                        </Link>{" "}
                                                        page, as your byline,
                                                        and in your responses.
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-3 list-btn d-flex justify-content-end">
                                            {editUsername ? (
                                                <>
                                                    <div className="me-2">
                                                        {validUsername ? (
                                                            <button
                                                                className="border-success text-success rounded-pill"
                                                                onClick={(e) =>
                                                                    updateHandler(
                                                                        e,
                                                                        "username"
                                                                    )
                                                                }
                                                            >
                                                                Save
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="border-success text-success rounded-pill"
                                                                onClick={(e) =>
                                                                    updateHandler(
                                                                        e,
                                                                        "username"
                                                                    )
                                                                }
                                                                disabled
                                                            >
                                                                Save
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="rounded-pill"
                                                            onClick={() =>
                                                                cancelHandler(
                                                                    "username"
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div>
                                                    <button
                                                        className="rounded-pill"
                                                        onClick={() =>
                                                            setEditUsername(
                                                                !editUsername
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex mt-4">
                                        <div className="col-9 info info-email">
                                            <div className="title fw-bold">
                                                Email
                                            </div>
                                            <div className="d-flex">
                                                <div className="col-9">
                                                    <input
                                                        className="body col-12 border-0 border-bottom"
                                                        id="inputEmail"
                                                        value={email}
                                                        placeholder="Your Email"
                                                        disabled
                                                    />

                                                    <div className="description mt-3">
                                                        Your email appears on
                                                        your{" "}
                                                        <Link
                                                            className="text-dark"
                                                            to={`/@${username}`}
                                                        >
                                                            Profile
                                                        </Link>{" "}
                                                        page, as your byline,
                                                        and in your responses.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex mt-4">
                                        <div className="col-9 info info-bio">
                                            <div className="title fw-bold">
                                                Bio
                                            </div>
                                            <div className="d-flex">
                                                <form
                                                    className="col-9"
                                                    noValidate
                                                >
                                                    {editBio ? (
                                                        <div>
                                                            <input
                                                                className={`body p-0 col-12 border-0 border-bottom ${
                                                                    validBio
                                                                        ? ""
                                                                        : "is-invalid"
                                                                }`}
                                                                id="inputBio"
                                                                value={bio}
                                                                required
                                                                placeholder="Add short your bio"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setBio(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                    if (
                                                                        e.target
                                                                            .value
                                                                            .length <=
                                                                        160
                                                                    ) {
                                                                        setValidBio(
                                                                            true
                                                                        );
                                                                    } else {
                                                                        setValidBio(
                                                                            false
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                            <div className="invalid-feedback">
                                                                Maximum length
                                                                of bio is 160
                                                                characters.
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <input
                                                            className="body col-12 border-0 border-bottom"
                                                            id="inputBio"
                                                            value={bio}
                                                            placeholder="Add short your bio"
                                                            disabled
                                                        />
                                                    )}

                                                    <div className="description mt-3">
                                                        Your short bio appears
                                                        on your{" "}
                                                        <Link
                                                            className="text-dark"
                                                            to={`/@${username}`}
                                                        >
                                                            Profile
                                                        </Link>{" "}
                                                        and next to your
                                                        stories.
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-3 list-btn d-flex justify-content-end">
                                            {editBio ? (
                                                <>
                                                    <div className="me-2">
                                                        {validBio ? (
                                                            <button
                                                                className="border-success text-success rounded-pill"
                                                                onClick={(e) =>
                                                                    updateHandler(
                                                                        e,
                                                                        "bio"
                                                                    )
                                                                }
                                                            >
                                                                Save
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="border-success text-success rounded-pill"
                                                                onClick={(e) =>
                                                                    updateHandler(
                                                                        e,
                                                                        "bio"
                                                                    )
                                                                }
                                                                disabled
                                                            >
                                                                Save
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="rounded-pill"
                                                            onClick={() =>
                                                                cancelHandler(
                                                                    "bio"
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div>
                                                    <button
                                                        className="rounded-pill"
                                                        onClick={() =>
                                                            setEditBio(!editBio)
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex mt-4">
                                        <div className="col-9 info info-password">
                                            <div className="title fw-bold">
                                                Password
                                            </div>
                                            <div className="d-flex">
                                                <div className="col-9">
                                                    {editPassword && (
                                                        <form noValidate>
                                                            <input
                                                                className={`form-control body p-0 col-12 border-0 border-bottom ${
                                                                    validOldPassword
                                                                        ? ""
                                                                        : "is-invalid"
                                                                }`}
                                                                id="inputPassword"
                                                                placeholder="Your old password"
                                                                type="password"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setPassword(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                    if (
                                                                        !e
                                                                            .target
                                                                            .value
                                                                    ) {
                                                                        setValidOldPassword(
                                                                            false
                                                                        );
                                                                    } else {
                                                                        setValidOldPassword(
                                                                            true
                                                                        );
                                                                    }
                                                                }}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">
                                                                Password must
                                                                have length from
                                                                8 to 16
                                                                characters.
                                                            </div>

                                                            <input
                                                                className={`form-control body p-0 col-12 border-0 border-bottom ${
                                                                    validPassword
                                                                        ? ""
                                                                        : "is-invalid"
                                                                }`}
                                                                id="inputNewPassword"
                                                                placeholder="New password"
                                                                type="password"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setNewPassword(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                    if (
                                                                        e.target
                                                                            .value &&
                                                                        e.target
                                                                            .value
                                                                            .length >=
                                                                            8 &&
                                                                        e.target
                                                                            .value
                                                                            .length <=
                                                                            16
                                                                    ) {
                                                                        setValidPassword(
                                                                            true
                                                                        );
                                                                    } else {
                                                                        setValidPassword(
                                                                            false
                                                                        );
                                                                    }
                                                                }}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">
                                                                Password must
                                                                have length from
                                                                8 to 16
                                                                characters.
                                                            </div>

                                                            <input
                                                                className={` body form-control p-0 col-12 border-0 border-bottom ${
                                                                    validConfirmPassword
                                                                        ? ""
                                                                        : "is-invalid"
                                                                }`}
                                                                id="inputConfirmPassword"
                                                                placeholder="Confirm new password"
                                                                type="password"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setConfirmPassword(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                    if (
                                                                        e.target
                                                                            .value &&
                                                                        e.target
                                                                            .value
                                                                            .length >=
                                                                            8 &&
                                                                        e.target
                                                                            .value
                                                                            .length <=
                                                                            16 &&
                                                                        e.target
                                                                            .value ===
                                                                            newPassword
                                                                    ) {
                                                                        setValidConfirmPassword(
                                                                            true
                                                                        );
                                                                    } else {
                                                                        setValidConfirmPassword(
                                                                            false
                                                                        );
                                                                    }
                                                                }}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">
                                                                The entered
                                                                passwords do not
                                                                match. Try
                                                                again.
                                                            </div>
                                                        </form>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3 list-btn d-flex justify-content-end">
                                            {editPassword ? (
                                                <>
                                                    <div className="me-2">
                                                        {validPassword &&
                                                        validConfirmPassword ? (
                                                            <button
                                                                className="border-success text-success rounded-pill"
                                                                onClick={(e) =>
                                                                    updateHandler(
                                                                        e,
                                                                        "password"
                                                                    )
                                                                }
                                                            >
                                                                Save
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="border-success text-success rounded-pill"
                                                                onClick={(e) =>
                                                                    updateHandler(
                                                                        e,
                                                                        "password"
                                                                    )
                                                                }
                                                                disabled
                                                            >
                                                                Save
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="rounded-pill"
                                                            onClick={() =>
                                                                cancelHandler(
                                                                    "password"
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div>
                                                    <button
                                                        className="rounded-pill"
                                                        onClick={() =>
                                                            setEditPassword(
                                                                !editPassword
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-top py-2">
                <Footer />
            </div>
        </div>
    );
};

export default SettingScreen;
