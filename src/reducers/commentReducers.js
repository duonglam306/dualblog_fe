import {
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_SUCCESS,
    COMMENT_LIST_CREATE_UPDATE,
    COMMENT_LIST_DELETE_UPDATE,
    COMMENT_LIST_MORE,
    COMMENT_LIST_FAIL,
    COMMENT_LIST_DELETE,
    COMMENT_LIST_CREATE,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_SUCCESS,
    COMMENT_CREATE_FAIL,
    COMMENT_CREATE_RESET,
    COMMENT_DELETE_REQUEST,
    COMMENT_DELETE_SUCCESS,
    COMMENT_DELETE_FAIL,
    COMMENT_DELETE_RESET,
    COMMENT_LIST_LOAD_MORE_REQUEST,
    COMMENT_LIST_LOAD_MORE_SUCCESS,
    COMMENT_LIST_LOAD_MORE_FAIL,
} from "../constants/commentConstants";

export const commentListReducer = (
    state = { comments: { comments: [], total: 0 } },
    action
) => {
    switch (action.type) {
        case COMMENT_LIST_REQUEST:
            return { loading: true, comments: { comments: [], total: 0 } };
        case COMMENT_LIST_SUCCESS:
            return { loading: false, comments: action.payload };
        case COMMENT_LIST_DELETE_UPDATE:
            return {
                loading: false,
                comments: state.comments.comments ? {
                    ...state.comments,
                    total: state.comments.total - action.payload.numCmtDelete,
                    comments: state.comments.comments.map((cmt) =>
                        String(cmt._id) === String(action.payload.comment._id)
                            ? action.payload.comment
                            : cmt
                    ),
                } : {
                    ...state.comments
                },
            };
        case COMMENT_LIST_DELETE:
            return {
                loading: false,
                comments: state.comments.comments ? {
                    ...state.comments,
                    total: state.comments.total - action.payload.numCmtDelete,
                    comments: state.comments.comments.filter(
                        (cmt) =>
                            String(cmt._id) !==
                            String(action.payload.comment._id)
                    ),
                } : {
                    ...state.comments
                },
            };
        case COMMENT_LIST_CREATE_UPDATE:
            return {
                loading: false,
                comments: state.comments.comments ? {
                    ...state.comments,
                    total: state.comments.total + 1,
                    comments: state.comments.comments.map((cmt) =>
                        String(cmt._id) === String(action.payload._id)
                            ? action.payload
                            : cmt
                    ),
                } : {
                    ...state.comments
                },
            };

        case COMMENT_LIST_CREATE:
            return {
                loading: false,
                comments: {
                    ...state.comments,
                    total: state.comments.total + 1,
                    comments: [...state.comments.comments, action.payload],
                },
            };
        case COMMENT_LIST_MORE:
            let listCmt = [
                ...state.comments.comments,
                ...action.payload.comments,
            ].reverse();

            const uniqueComments = Array.from(
                new Set(listCmt.map((a) => String(a._id)))
            ).map((id) => {
                return listCmt.find((a) => String(a._id) === id);
            });
            return {
                loading: false,
                comments: {
                    ...action.payload,
                    comments: uniqueComments.reverse(),
                },
            };
        case COMMENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const commentListLoadMoreReducer = (
    state = { comments: {} },
    action
) => {
    switch (action.type) {
        case COMMENT_LIST_LOAD_MORE_REQUEST:
            return { loading: true, comments: {} };
        case COMMENT_LIST_LOAD_MORE_SUCCESS:
            return { loading: false, comments: action.payload };
        case COMMENT_LIST_LOAD_MORE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMENT_DELETE_REQUEST:
            return { loading: true };
        case COMMENT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case COMMENT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case COMMENT_DELETE_RESET:
            return {};
        default:
            return state;
    }
};
export const createCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMENT_CREATE_REQUEST:
            return { loading: true };
        case COMMENT_CREATE_SUCCESS:
            return { loading: false, success: true, comment: action.payload };
        case COMMENT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case COMMENT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};
