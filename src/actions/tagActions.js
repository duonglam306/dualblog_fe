import {
    TAG_LIST_REQUEST,
    TAG_LIST_SUCCESS,
    TAG_LIST_FAIL,
    TAG_SEARCH_REQUEST,
    TAG_SEARCH_SUCCESS,
    TAG_SEARCH_MORE,
    TAG_SEARCH_FAIL,
    TAG_SEARCH_RELATIVE_REQUEST,
    TAG_SEARCH_RELATIVE_SUCCESS,
    TAG_SEARCH_RELATIVE_FAIL,
    TAG_LIST_LOAD_MORE_REQUEST,
    TAG_LIST_LOAD_MORE_SUCCESS,
    TAG_LIST_LOAD_MORE_FAIL,
} from "../constants/tagConstants";
import axios from "axios";

export const listTag = () => async (dispatch) => {
    try {
        dispatch({ type: TAG_LIST_REQUEST });

        const { data } = await axios.get("/api/tags");
        dispatch({
            type: TAG_LIST_SUCCESS,
            payload: data.tags,
        });
    } catch (error) {
        dispatch({
            type: TAG_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listTagLoadMore = (api, flag) => async (dispatch) => {
    try {
        dispatch({ type: TAG_LIST_LOAD_MORE_REQUEST });

        const { data } = await axios.get(api);
        dispatch({
            type: TAG_LIST_LOAD_MORE_SUCCESS,
            payload: data,
        });
        if (flag === "search-list") {
            dispatch({
                type: TAG_SEARCH_MORE,
                payload: data,
            });
        }
    } catch (error) {
        dispatch({
            type: TAG_LIST_LOAD_MORE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const searchTag = (keyword, offset) => async (dispatch) => {
    try {
        dispatch({ type: TAG_SEARCH_REQUEST });

        const { data } = await axios.get(
            `/api/tags/search?limit=30&offset=${offset}&keyword=${keyword}`
        );

        dispatch({ type: TAG_SEARCH_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: TAG_SEARCH_FAIL,
            payload: message,
        });
    }
};

export const searchTagRelative = (keyword) => async (dispatch) => {
    try {
        dispatch({ type: TAG_SEARCH_RELATIVE_REQUEST });

        const { data } = await axios.get(
            `/api/tags/search?limit=20&offset=1&keyword=${keyword}`
        );

        dispatch({ type: TAG_SEARCH_RELATIVE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: TAG_SEARCH_RELATIVE_FAIL,
            payload: message,
        });
    }
};
