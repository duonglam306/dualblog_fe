import {
    ARTICLE_LIST_REQUEST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_UPDATE,
    ARTICLE_LIST_FAIL,
    ARTICLE_LIST_MORE,
    ARTICLE_YOUR_LIST_REQUEST,
    ARTICLE_YOUR_LIST_SUCCESS,
    ARTICLE_YOUR_LIST_UPDATE,
    ARTICLE_YOUR_LIST_DELETE,
    ARTICLE_YOUR_LIST_FAIL,
    ARTICLE_YOUR_LIST_MORE,
    ARTICLE_LIST_FAVORITE_REQUEST,
    ARTICLE_LIST_FAVORITE_SUCCESS,
    ARTICLE_LIST_FAVORITE_UPDATE,
    ARTICLE_LIST_FAVORITE_FAIL,
    ARTICLE_LIST_FAVORITE_MORE,
    ARTICLE_LIST_FEED_REQUEST,
    ARTICLE_LIST_FEED_SUCCESS,
    ARTICLE_LIST_FEED_UPDATE,
    ARTICLE_LIST_FEED_FAIL,
    ARTICLE_LIST_FEED_MORE,
    ARTICLE_DETAILS_REQUEST,
    ARTICLE_DETAILS_SUCCESS,
    ARTICLE_DETAILS_UPDATE,
    ARTICLE_DETAILS_FAIL,
    ARTICLE_POPULAR_REQUEST,
    ARTICLE_POPULAR_SUCCESS,
    ARTICLE_POPULAR_UPDATE,
    ARTICLE_POPULAR_FAIL,
    ARTICLE_FAVORITE_REQUEST,
    ARTICLE_FAVORITE_SUCCESS,
    ARTICLE_FAVORITE_FAIL,
    ARTICLE_UNFAVORITE_REQUEST,
    ARTICLE_UNFAVORITE_SUCCESS,
    ARTICLE_UNFAVORITE_FAIL,
    ARTICLE_CREATE_REQUEST,
    ARTICLE_CREATE_SUCCESS,
    ARTICLE_CREATE_FAIL,
    ARTICLE_UPDATE_REQUEST,
    ARTICLE_UPDATE_SUCCESS,
    ARTICLE_UPDATE_FAIL,
    ARTICLE_RELATIVE_TAG_REQUEST,
    ARTICLE_RELATIVE_TAG_SUCCESS,
    ARTICLE_RELATIVE_TAG_UPDATE,
    ARTICLE_RELATIVE_TAG_FAIL,
    ARTICLE_RELATIVE_AUTHOR_REQUEST,
    ARTICLE_RELATIVE_AUTHOR_SUCCESS,
    ARTICLE_RELATIVE_AUTHOR_UPDATE,
    ARTICLE_RELATIVE_AUTHOR_FAIL,
    ARTICLE_DELETE_REQUEST,
    ARTICLE_DELETE_SUCCESS,
    ARTICLE_DELETE_FAIL,
    ARTICLE_NEW_LIST_REQUEST,
    ARTICLE_NEW_LIST_SUCCESS,
    ARTICLE_NEW_LIST_FAIL,
    ARTICLE_SEARCH_REQUEST,
    ARTICLE_SEARCH_SUCCESS,
    ARTICLE_SEARCH_FAIL,
    ARTICLE_SEARCH_UPDATE,
    ARTICLE_SEARCH_MORE,
    ARTICLE_SEARCH_RELATIVE_REQUEST,
    ARTICLE_SEARCH_RELATIVE_SUCCESS,
    ARTICLE_SEARCH_RELATIVE_FAIL,
    ARTICLE_LIST_LOAD_MORE_REQUEST,
    ARTICLE_LIST_LOAD_MORE_SUCCESS,
    ARTICLE_LIST_LOAD_MORE_FAIL,
    ARTICLE_CREATE_RESET,
    ARTICLE_UPDATE_RESET,
} from "../constants/articleConstants";
import { logout } from "./userActions";
import configHeader from "../utils/configHeader";
import axios from "axios";

export const listArticle =
    (
        typeTag = "",
        numPage = 1,
        authorName = "",
        favoritePerson = "",
        token = ""
    ) =>
    async (dispatch) => {
        try {
            dispatch({ type: ARTICLE_LIST_REQUEST });
            let api = `/api/articles?limit=20&offset=${numPage}`;
            if (typeTag !== "") {
                api += `&tag=${typeTag}`;
            }
            if (authorName !== "") {
                api += `&author=${authorName}`;
            }
            if (favoritePerson !== "") {
                api += `&favorited=${favoritePerson}`;
            }

            const config = token ? configHeader(token) : configHeader();

            const { data } = await axios.get(api, config);
            dispatch({
                type: ARTICLE_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ARTICLE_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const listArticleLoadMore = (token, api, flag) => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_LIST_LOAD_MORE_REQUEST });

        const config = token ? configHeader(token) : configHeader();

        const { data } = await axios.get(api, config);
        dispatch({
            type: ARTICLE_LIST_LOAD_MORE_SUCCESS,
            payload: data,
        });
        if (flag === "global-list") {
            dispatch({
                type: ARTICLE_LIST_MORE,
                payload: data,
            });
        } else if (flag === "feed-list") {
            dispatch({
                type: ARTICLE_LIST_FEED_MORE,
                payload: data,
            });
        } else if (flag === "your-list") {
            dispatch({
                type: ARTICLE_YOUR_LIST_MORE,
                payload: data,
            });
        } else if (flag === "favorite-list") {
            dispatch({
                type: ARTICLE_LIST_FAVORITE_MORE,
                payload: data,
            });
        } else if (flag === "search-list") {
            dispatch({
                type: ARTICLE_SEARCH_MORE,
                payload: data,
            });
        }
    } catch (error) {
        dispatch({
            type: ARTICLE_LIST_LOAD_MORE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listArticlePopular = () => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_POPULAR_REQUEST });
        let api = `/api/articles/popular`;

        const { data } = await axios.get(api);

        dispatch({
            type: ARTICLE_POPULAR_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ARTICLE_POPULAR_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listArticleNew = () => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_NEW_LIST_REQUEST });
        let api = `/api/articles?limit=4&offset=1`;

        const { data } = await axios.get(api);

        dispatch({
            type: ARTICLE_NEW_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ARTICLE_NEW_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listArticleFeed =
    (token, numPage = 1) =>
    async (dispatch) => {
        try {
            dispatch({ type: ARTICLE_LIST_FEED_REQUEST });

            const config = configHeader(token);

            const { data } = await axios.get(
                `/api/articles/feed?limit=20&offset=${numPage}`,
                config
            );

            dispatch({
                type: ARTICLE_LIST_FEED_SUCCESS,
                payload: data,
            });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            if (message === "User not found") {
                dispatch(logout());
            }
            dispatch({
                type: ARTICLE_LIST_FEED_FAIL,
                payload: message,
            });
        }
    };

export const createArticle =
    (token, title, description, body, tagList, thumbnail_url) =>
    async (dispatch) => {
        try {
            dispatch({ type: ARTICLE_CREATE_REQUEST });

            const config = configHeader(token);

            const { data } = await axios.post(
                `/api/articles`,
                { title, description, body, tagList, thumbnail_url },
                config
            );

            dispatch({
                type: ARTICLE_CREATE_SUCCESS,
                payload: data.article,
            });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            if (message === "Not authorized, token failed") {
                dispatch(logout());
            }
            dispatch({
                type: ARTICLE_CREATE_FAIL,
                payload: message,
            });
        }
    };

export const getDetailArticle = (slug, token) => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_DETAILS_REQUEST });

        const config = token ? configHeader(token) : configHeader();

        const { data } = await axios.get(`/api/articles/${slug}`, config);
        dispatch({ type: ARTICLE_DETAILS_SUCCESS, payload: data.article });
        dispatch({ type: ARTICLE_CREATE_RESET });
        dispatch({ type: ARTICLE_UPDATE_RESET });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: ARTICLE_DETAILS_FAIL,
            payload: message,
        });
    }
};

export const searchArticle = (keyword, offset, token) => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_SEARCH_REQUEST });

        const config = token ? configHeader(token) : configHeader();

        const { data } = await axios.get(
            `/api/articles/search?limit=20&offset=${offset}&keyword=${keyword}`,
            config
        );
        dispatch({ type: ARTICLE_SEARCH_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: ARTICLE_SEARCH_FAIL,
            payload: message,
        });
    }
};

export const searchArticleRelative = (keyword) => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_SEARCH_RELATIVE_REQUEST });

        const { data } = await axios.get(
            `/api/articles/search?limit=5&offset=1&keyword=${keyword}`
        );

        dispatch({ type: ARTICLE_SEARCH_RELATIVE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: ARTICLE_SEARCH_RELATIVE_FAIL,
            payload: message,
        });
    }
};

export const updateArticle = (slug, article, token) => async (dispatch) => {
    try {
        dispatch({
            type: ARTICLE_UPDATE_REQUEST,
        });

        const config = configHeader(token);

        const { data } = await axios.put(
            `/api/articles/${slug}`,
            article,
            config
        );

        dispatch({ type: ARTICLE_UPDATE_SUCCESS, payload: data.article });
        dispatch({ type: ARTICLE_DETAILS_SUCCESS, payload: data.article });
        dispatch({ type: ARTICLE_LIST_UPDATE, payload: data.article });
        dispatch({ type: ARTICLE_LIST_FEED_UPDATE, payload: data.article });
        dispatch({ type: ARTICLE_RELATIVE_TAG_UPDATE, payload: data.article });
        dispatch({
            type: ARTICLE_RELATIVE_AUTHOR_UPDATE,
            payload: data.article,
        });
        dispatch({ type: ARTICLE_POPULAR_UPDATE, payload: data.article });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ARTICLE_UPDATE_FAIL,
            payload: message,
        });
    }
};

export const deleteArticle = (slug, token, type) => async (dispatch) => {
    try {
        dispatch({
            type: ARTICLE_DELETE_REQUEST,
        });

        const config = configHeader(token);

        const { data } = await axios.delete(`/api/articles/${slug}`, config);

        dispatch({ type: ARTICLE_DELETE_SUCCESS });
        if (type === "details") {
            window.location.href = "/";
        } else if (type === "your-articles") {
            dispatch({ type: ARTICLE_YOUR_LIST_DELETE, payload: data.article });
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
            type: ARTICLE_DELETE_FAIL,
            payload: message,
        });
    }
};

export const favoriteArticle = (slug, token, flag) => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_FAVORITE_REQUEST });

        const config = configHeader(token);

        const { data } = await axios.post(
            `/api/articles/${slug}/favorite`,
            {},
            config
        );

        dispatch({ type: ARTICLE_FAVORITE_SUCCESS, payload: data.article });

        if (flag === "details") {
            dispatch({ type: ARTICLE_DETAILS_UPDATE, payload: data.article });
        }
        if (flag === "list") {
            dispatch({ type: ARTICLE_LIST_UPDATE, payload: data.article });
        }
        if (flag === "list-feed") {
            dispatch({ type: ARTICLE_LIST_FEED_UPDATE, payload: data.article });
        }
        if (flag === "your-list") {
            dispatch({ type: ARTICLE_YOUR_LIST_UPDATE, payload: data.article });
        }
        if (flag === "search") {
            dispatch({ type: ARTICLE_SEARCH_UPDATE, payload: data.article });
        }
        if (flag === "relative-author") {
            dispatch({
                type: ARTICLE_RELATIVE_AUTHOR_UPDATE,
                payload: data.article,
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
            type: ARTICLE_FAVORITE_FAIL,
            payload: message,
        });
    }
};

export const unFavoriteArticle = (slug, token, flag) => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_UNFAVORITE_REQUEST });
        const config = configHeader(token);
        const { data } = await axios.delete(
            `/api/articles/${slug}/favorite`,
            config
        );

        dispatch({ type: ARTICLE_UNFAVORITE_SUCCESS, payload: data.article });

        if (flag === "details") {
            dispatch({ type: ARTICLE_DETAILS_UPDATE, payload: data.article });
        }
        if (flag === "list") {
            dispatch({ type: ARTICLE_LIST_UPDATE, payload: data.article });
        }
        if (flag === "list-feed") {
            dispatch({ type: ARTICLE_LIST_FEED_UPDATE, payload: data.article });
        }
        if (flag === "list-favorite") {
            dispatch({
                type: ARTICLE_LIST_FAVORITE_UPDATE,
                payload: data.article,
            });
        }
        if (flag === "your-list") {
            dispatch({ type: ARTICLE_YOUR_LIST_UPDATE, payload: data.article });
        }
        if (flag === "search") {
            dispatch({ type: ARTICLE_SEARCH_UPDATE, payload: data.article });
        }
        if (flag === "relative-author") {
            dispatch({
                type: ARTICLE_RELATIVE_AUTHOR_UPDATE,
                payload: data.article,
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
            type: ARTICLE_UNFAVORITE_FAIL,
            payload: message,
        });
    }
};

export const listArticleRelativeTag =
    (typeTag = "", slug = "", token = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: ARTICLE_RELATIVE_TAG_REQUEST });
            let api = `/api/articles/relative?slug=${slug}`;
            if (typeTag !== "") {
                api += `&tag=${typeTag}`;
            }

            const config = token ? configHeader(token) : configHeader();
            const { data } = await axios.get(api, config);
            dispatch({
                type: ARTICLE_RELATIVE_TAG_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ARTICLE_RELATIVE_TAG_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const listArticleRelativeAuthor =
    (author = "", slug = "", token = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: ARTICLE_RELATIVE_AUTHOR_REQUEST });
            let api = `/api/articles/relative?slug=${slug}`;
            if (author !== "") {
                api += `&author=${author}`;
            }
            const config = token ? configHeader(token) : configHeader();
            const { data } = await axios.get(api, config);
            dispatch({
                type: ARTICLE_RELATIVE_AUTHOR_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ARTICLE_RELATIVE_AUTHOR_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const listArticleFavorite =
    (favoritePerson, numPage, token) => async (dispatch) => {
        try {
            dispatch({ type: ARTICLE_LIST_FAVORITE_REQUEST });
            let api = `/api/articles?limit=20&offset=${numPage}&favorited=${favoritePerson}`;
            const config = configHeader(token);

            const { data } = await axios.get(api, config);
            dispatch({
                type: ARTICLE_LIST_FAVORITE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            if (message === "Not authorized, token failed") {
                dispatch(logout());
            }
            dispatch({
                type: ARTICLE_LIST_FAVORITE_FAIL,
                payload: message,
            });
        }
    };

export const listYourArticle = (author, numPage, token) => async (dispatch) => {
    try {
        dispatch({ type: ARTICLE_YOUR_LIST_REQUEST });
        let api = `/api/articles?limit=20&offset=${numPage}&author=${author}`;
        const config = configHeader(token);

        const { data } = await axios.get(api, config);
        dispatch({
            type: ARTICLE_YOUR_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ARTICLE_YOUR_LIST_FAIL,
            payload: message,
        });
    }
};
