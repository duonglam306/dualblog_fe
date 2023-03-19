import {
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_SUCCESS,
    COMMENT_LIST_DELETE_UPDATE,
    COMMENT_LIST_CREATE_UPDATE,
    COMMENT_LIST_DELETE,
    COMMENT_LIST_CREATE,
    COMMENT_LIST_MORE,
    COMMENT_LIST_FAIL,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_SUCCESS,
    COMMENT_CREATE_FAIL,
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS,
    COMMENT_DELETE_FAIL,
    COMMENT_DELETE_RESET,
    COMMENT_CREATE_RESET,
    COMMENT_LIST_LOAD_MORE_REQUEST,
    COMMENT_LIST_LOAD_MORE_SUCCESS,
    COMMENT_LIST_LOAD_MORE_FAIL,
} from "../constants/commentConstants";
import { logout } from "./userActions";
import configHeader from "../utils/configHeader";
import axios from "axios";

export const listComment = (slug, offset) => async (dispatch) => {
    try {
        dispatch({ type: COMMENT_LIST_REQUEST });

        const { data } = await axios.get(
            `/api/articles/${slug}/comments?limit=10&offset=${offset}`
        );
        dispatch({
            type: COMMENT_LIST_SUCCESS,
            payload: data,
        });
        dispatch({ type: COMMENT_CREATE_RESET });
        dispatch({ type: COMMENT_DELETE_RESET });
    } catch (error) {
        dispatch({
            type: COMMENT_LIST_FAIL,
            payload:
                error.response && error.response.data?.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listCommentLoadMore = (api) => async (dispatch) => {
    try {
        dispatch({ type: COMMENT_LIST_LOAD_MORE_REQUEST });

        const { data } = await axios.get(api);
        dispatch({
            type: COMMENT_LIST_LOAD_MORE_SUCCESS,
            payload: data,
        });
        dispatch({
            type: COMMENT_LIST_MORE,
            payload: data,
        });
        dispatch({ type: COMMENT_CREATE_RESET });
        dispatch({ type: COMMENT_DELETE_RESET });
    } catch (error) {
        dispatch({
            type: COMMENT_LIST_LOAD_MORE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createComment =
    (slug, parent, body, token, flag) => async (dispatch) => {
        try {
            dispatch({ type: COMMENT_CREATE_REQUEST });
            const config = configHeader(token);
            const { data } = await axios.post(
                `/api/articles/${slug}/comments`,
                { parent, body },
                config
            );
            dispatch({
                type: COMMENT_CREATE_SUCCESS,
                payload: data.comment,
            });
            if (flag === "comment") {
                dispatch({
                    type: COMMENT_LIST_CREATE,
                    payload: data.comment,
                });
            }
            else if (flag === "reply") {
                dispatch({
                    type: COMMENT_LIST_CREATE_UPDATE,
                    payload: data.comment,
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
                type: COMMENT_CREATE_FAIL,
                payload: message,
            });
        }
    };

export const deleteComment = (slug, id, token, flag) => async (dispatch) => {
    try {
        dispatch({ type: COMMENT_DELETE_REQUEST });
        const config = configHeader(token);
        const { data } = await axios.delete(
            `/api/articles/${slug}/comments/${id}`,
            config
        );
        dispatch({
            type: COMMENT_DELETE_SUCCESS,
            payload: data,
        });
        if (flag === "comment") {
            dispatch({
                type: COMMENT_LIST_DELETE,
                payload: data,
            });
        } else if (flag === "reply") {
            dispatch({
                type: COMMENT_LIST_DELETE_UPDATE,
                payload: data,
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
            type: COMMENT_DELETE_FAIL,
            payload: message,
        });
    }
};
