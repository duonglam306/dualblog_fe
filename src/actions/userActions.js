import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_RESET,
    USER_FORGOT_PASSWORD_REQUEST,
    USER_FORGOT_PASSWORD_SUCCESS,
    USER_FORGOT_PASSWORD_FAIL,
    USER_FORGOT_PASSWORD_RESET,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_LOGOUT,
    USER_FOLLOW_REQUEST,
    USER_FOLLOW_SUCCESS,
    USER_FOLLOW_FAIL,
    USER_UNFOLLOW_REQUEST,
    USER_UNFOLLOW_SUCCESS,
    USER_UNFOLLOW_FAIL,
    USER_SEARCH_REQUEST,
    USER_SEARCH_SUCCESS,
    USER_SEARCH_MORE,
    USER_SEARCH_UPDATE,
    USER_SEARCH_FAIL,
    USER_FOLLOW_LIST_REQUEST,
    USER_FOLLOW_LIST_SUCCESS,
    USER_FOLLOW_LIST_MORE,
    USER_FOLLOW_LIST_UPDATE,
    USER_FOLLOW_LIST_FAIL,
    USER_UNFOLLOW_LIST_REQUEST,
    USER_UNFOLLOW_LIST_SUCCESS,
    USER_UNFOLLOW_LIST_MORE,
    USER_UNFOLLOW_LIST_UPDATE,
    USER_UNFOLLOW_LIST_FAIL,
    USER_SEARCH_RELATIVE_REQUEST,
    USER_SEARCH_RELATIVE_SUCCESS,
    USER_SEARCH_RELATIVE_UPDATE,
    USER_SEARCH_RELATIVE_FAIL,
    ACCOUNT_ACTIVATE_REQUEST,
    ACCOUNT_ACTIVATE_SUCCESS,
    ACCOUNT_ACTIVATE_FAIL,
    ACCOUNT_ACTIVATE_RESET,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_RESET,
    USER_MAIL_SIGNUP_REQUEST,
    USER_MAIL_SIGNUP_SUCCESS,
    USER_MAIL_SIGNUP_FAIL,
    USER_LIST_LOAD_MORE_REQUEST,
    USER_LIST_LOAD_MORE_SUCCESS,
    USER_LIST_LOAD_MORE_FAIL,
} from "../constants/userConstants";
import {
    ARTICLE_UPDATE_RESET,
    ARTICLE_CREATE_RESET,
} from "../constants/articleConstants";
import { COMMENT_CREATE_RESET } from "../constants/commentConstants";
import axios from "axios";
import Cookies from "js-cookie";
import configHeader from "../utils/configHeader";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = configHeader();

        const { data } = await axios.post(
            "/api/users/login",
            {
                email,
                password,
            },
            config
        );
        Cookies.set("token", data.user.token, { expires: 1 });
        const user = {
            username: data.user.username,
            email: data.user.email,
            bio: data.user.bio,
            image: data.user.image,
            token: data.user.token,
        };
        dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
        dispatch({ type: USER_REGISTER_RESET });
        dispatch({ type: USER_FORGOT_PASSWORD_RESET });
        dispatch({ type: ACCOUNT_ACTIVATE_RESET });
        dispatch({ type: RESET_PASSWORD_RESET });
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const register = (email, username, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = configHeader();

        await axios.post(
            "/api/users",
            {
                email,
                username,
                password,
            },
            config
        );
        dispatch({ type: USER_REGISTER_SUCCESS });
        dispatch({ type: RESET_PASSWORD_RESET });
        dispatch({ type: ACCOUNT_ACTIVATE_RESET });
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const activateAccount = (token) => async (dispatch) => {
    try {
        dispatch({ type: ACCOUNT_ACTIVATE_REQUEST });

        const config = configHeader();

        const { data } = await axios.post(
            "/api/user/emailActivate",
            {
                token,
            },
            config
        );

        dispatch({ type: ACCOUNT_ACTIVATE_SUCCESS, payload: data.user });
        dispatch({ type: USER_REGISTER_RESET });
        dispatch({ type: USER_FORGOT_PASSWORD_RESET });
    } catch (error) {
        console.log(error);
        dispatch({
            type: ACCOUNT_ACTIVATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getCurrentUser = (token) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAIL_REQUEST });
        const config = configHeader(token);

        const { data } = await axios.get("/api/user", config);

        dispatch({ type: USER_DETAIL_SUCCESS, payload: data.user });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: message,
        });
    }
};

export const updateUser = (user, token) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });

        const config = configHeader(token);
        const { data } = await axios.put(`/api/user`, user, config);

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data.user });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
        dispatch({ type: USER_DETAIL_SUCCESS, payload: data.user });
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data.user });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: message,
        });
    }
};

export const logout = () => (dispatch) => {
    Cookies.remove("token");

    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAIL_RESET });
    dispatch({ type: USER_UPDATE_RESET });
    dispatch({ type: USER_REGISTER_RESET });
    dispatch({ type: USER_FORGOT_PASSWORD_RESET });
    dispatch({ type: ACCOUNT_ACTIVATE_RESET });
    dispatch({ type: RESET_PASSWORD_RESET });
    dispatch({ type: ARTICLE_UPDATE_RESET });
    dispatch({ type: ARTICLE_CREATE_RESET });
    dispatch({ type: COMMENT_CREATE_RESET });
};

export const getProfileUser = (username, token) => async (dispatch) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST });

        const config = token ? configHeader(token) : configHeader();
        const { data } = await axios.get(`/api/profiles/${username}`, config);
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data.profile });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: USER_PROFILE_FAIL,
            payload: message,
        });
    }
};

export const followUser =
    (username, token, flag = "follow-list") =>
    async (dispatch) => {
        try {
            dispatch({ type: USER_FOLLOW_REQUEST });
            const config = configHeader(token);

            const { data } = await axios.post(
                `/api/profiles/${username}/follow`,
                {},
                config
            );

            dispatch({ type: USER_FOLLOW_SUCCESS, payload: data.profile });
            if (flag === "profile")
                dispatch({ type: USER_PROFILE_SUCCESS, payload: data.profile });
            if (flag === "follow-list")
                dispatch({
                    type: USER_FOLLOW_LIST_UPDATE,
                    payload: data.profile,
                });
            if (flag === "un-follow-list")
                dispatch({
                    type: USER_UNFOLLOW_LIST_UPDATE,
                    payload: data.profile,
                });
            if (flag === "search-list") {
                dispatch({ type: USER_SEARCH_UPDATE, payload: data.profile });
            }
            if (flag === "search-relative-list") {
                dispatch({
                    type: USER_SEARCH_RELATIVE_UPDATE,
                    payload: data.profile,
                });
            }
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;

            if (message === "Not authorized, token failed") {
                dispatch(logout());
            }
            dispatch({
                type: USER_FOLLOW_FAIL,
                payload: message,
            });
        }
    };

export const unFollowUser =
    (username, token, flag = "follow-list") =>
    async (dispatch) => {
        try {
            dispatch({ type: USER_UNFOLLOW_REQUEST });
            const config = configHeader(token);

            const { data } = await axios.delete(
                `/api/profiles/${username}/follow`,
                config
            );

            dispatch({ type: USER_UNFOLLOW_SUCCESS, payload: data.profile });
            if (flag === "profile")
                dispatch({ type: USER_PROFILE_SUCCESS, payload: data.profile });
            if (flag === "follow-list")
                dispatch({
                    type: USER_FOLLOW_LIST_UPDATE,
                    payload: data.profile,
                });
            if (flag === "un-follow-list")
                dispatch({
                    type: USER_UNFOLLOW_LIST_UPDATE,
                    payload: data.profile,
                });
            if (flag === "search-list") {
                dispatch({ type: USER_SEARCH_UPDATE, payload: data.profile });
            }
            if (flag === "search-relative-list") {
                dispatch({
                    type: USER_SEARCH_RELATIVE_UPDATE,
                    payload: data.profile,
                });
            }
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;

            if (message === "Not authorized, token failed") {
                dispatch(logout());
            }
            dispatch({
                type: USER_UNFOLLOW_FAIL,
                payload: message,
            });
        }
    };

export const getFollowListUser =
    (username, token, offset, limit = 10) => async (dispatch) => {
        try {
            dispatch({ type: USER_FOLLOW_LIST_REQUEST });

            const config = token ? configHeader(token) : configHeader();
            const { data } = await axios.get(
                `/api/profiles/${username}/followList?limit=${limit}&offset=${offset}`,
                config
            );

            dispatch({
                type: USER_FOLLOW_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;

            dispatch({
                type: USER_FOLLOW_LIST_FAIL,
                payload: message,
            });
        }
    };

export const getUnFollowListUser = (token, offset) => async (dispatch) => {
    try {
        dispatch({ type: USER_UNFOLLOW_LIST_REQUEST });

        const config = token ? configHeader(token) : configHeader();
        const { data } = await axios.get(
            `/api/profiles/unFollowList?limit=10&offset=${offset}`,
            config
        );

        dispatch({
            type: USER_UNFOLLOW_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: USER_UNFOLLOW_LIST_FAIL,
            payload: message,
        });
    }
};

export const searchUser = (keyword, offset, token) => async (dispatch) => {
    try {
        dispatch({ type: USER_SEARCH_REQUEST });

        const config = token ? configHeader(token) : configHeader();

        const { data } = await axios.get(
            `/api/users/search?limit=20&offset=${offset}&keyword=${keyword}`,
            config
        );
        dispatch({ type: USER_SEARCH_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: USER_SEARCH_FAIL,
            payload: message,
        });
    }
};

export const listUserLoadMore = (token, api, flag) => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_LOAD_MORE_REQUEST });

        const config = token ? configHeader(token) : configHeader();

        const { data } = await axios.get(api, config);
        dispatch({ type: USER_LIST_LOAD_MORE_SUCCESS, payload: data });
        if (flag === "search-list") {
            dispatch({ type: USER_SEARCH_MORE, payload: data });
        }
        if (flag === "follow-list") {
            dispatch({ type: USER_FOLLOW_LIST_MORE, payload: data });
        }
        if (flag === "un-follow-list") {
            dispatch({ type: USER_UNFOLLOW_LIST_MORE, payload: data });
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: USER_LIST_LOAD_MORE_FAIL,
            payload: message,
        });
    }
};

export const searchUserRelative = (keyword, token) => async (dispatch) => {
    try {
        dispatch({ type: USER_SEARCH_RELATIVE_REQUEST });

        const config = token ? configHeader(token) : configHeader();

        const { data } = await axios.get(
            `/api/users/search?limit=5&offset=1&keyword=${keyword}`,
            config
        );
        dispatch({ type: USER_SEARCH_RELATIVE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: USER_SEARCH_RELATIVE_FAIL,
            payload: message,
        });
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });

        const config = configHeader();

        await axios.post(
            "/api/user/forgotPassword",
            {
                email,
            },
            config
        );
        dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS });
        dispatch({ type: RESET_PASSWORD_RESET });
        dispatch({ type: ACCOUNT_ACTIVATE_RESET });
    } catch (error) {
        dispatch({
            type: USER_FORGOT_PASSWORD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const resetPassword =
    (token, password, newPassword) => async (dispatch) => {
        try {
            dispatch({ type: RESET_PASSWORD_REQUEST });

            const config = configHeader();

            const { data } = await axios.put(
                `/api/user/resetPassword/${token}`,
                {
                    password,
                    newPassword,
                },
                config
            );
            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.user });
            dispatch({ type: USER_REGISTER_RESET });
            dispatch({ type: USER_FORGOT_PASSWORD_RESET });
        } catch (error) {
            console.log(error);
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const sendMailSignUp = (username, token, email) => async (dispatch) => {
    try {
        dispatch({ type: USER_MAIL_SIGNUP_REQUEST });
        const config = configHeader(token);
        await axios.post(`/api/mailer/signUp`, { username, email }, config);
        dispatch({ type: USER_MAIL_SIGNUP_SUCCESS });
        dispatch({ type: ACCOUNT_ACTIVATE_RESET });
        dispatch({ type: RESET_PASSWORD_RESET });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: USER_MAIL_SIGNUP_FAIL,
            payload: message,
        });
    }
};
