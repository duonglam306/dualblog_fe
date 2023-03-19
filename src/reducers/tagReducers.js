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

export const tagListReducer = (state = { tags: [] }, action) => {
    switch (action.type) {
        case TAG_LIST_REQUEST:
            return { loading: true, tags: [] };
        case TAG_LIST_SUCCESS:
            return { loading: false, tags: action.payload };
        case TAG_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const tagListLoadMoreReducer = (
    state = { tags: { tags: [] } },
    action
) => {
    switch (action.type) {
        case TAG_LIST_LOAD_MORE_REQUEST:
            return { loading: true, tags: { tags: [] } };
        case TAG_LIST_LOAD_MORE_SUCCESS:
            return { loading: false, tags: action.payload };
        case TAG_LIST_LOAD_MORE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const tagSearchReducer = (state = { tags: { tags: [] } }, action) => {
    switch (action.type) {
        case TAG_SEARCH_REQUEST:
            return { loading: true, tags: { tags: [] } };
        case TAG_SEARCH_SUCCESS:
            return { loading: false, tags: action.payload };
        case TAG_SEARCH_MORE:
            return {
                loading: false,
                tags: {
                    ...action.payload,
                    tags: [...state.tags.tags, ...action.payload.tags],
                },
            };
        case TAG_SEARCH_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const tagSearchRelativeReducer = (state = { tags: { tags: []} }, action) => {
    switch (action.type) {
        case TAG_SEARCH_RELATIVE_REQUEST:
            return { loading: true, tags: { tags: []} };
        case TAG_SEARCH_RELATIVE_SUCCESS:
            return { loading: false, tags: action.payload };
        case TAG_SEARCH_RELATIVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
