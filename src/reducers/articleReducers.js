import {
    ARTICLE_LIST_REQUEST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_UPDATE,
    ARTICLE_LIST_FAIL,
    ARTICLE_LIST_MORE,
    ARTICLE_YOUR_LIST_REQUEST,
    ARTICLE_YOUR_LIST_SUCCESS,
    ARTICLE_YOUR_LIST_UPDATE,
    ARTICLE_YOUR_LIST_FAIL,
    ARTICLE_YOUR_LIST_DELETE,
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
    ARTICLE_CREATE_RESET,
    ARTICLE_UPDATE_REQUEST,
    ARTICLE_UPDATE_SUCCESS,
    ARTICLE_UPDATE_FAIL,
    ARTICLE_UPDATE_RESET,
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
} from "../constants/articleConstants";

export const articleListReducer = (
    state = { articles: { articles: [] } },
    action
) => {
    switch (action.type) {
        case ARTICLE_LIST_REQUEST:
            return { loading: true, articles: { articles: [] } };
        case ARTICLE_LIST_SUCCESS:
            return { loading: false, articles: action.payload };
        case ARTICLE_LIST_MORE:
            return {
                loading: false,
                articles: {
                    ...action.payload,
                    articles: [
                        ...state.articles.articles,
                        ...action.payload.articles,
                    ],
                },
            };
        case ARTICLE_LIST_UPDATE:
            return {
                loading: false,
                articles: state.articles.articles
                    ? {
                          ...state.articles,
                          articles: state.articles.articles.map((article) =>
                              article.slug === action.payload.slug
                                  ? action.payload
                                  : article
                          ),
                      }
                    : { ...state.articles },
            };
        case ARTICLE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleListLoadMoreReducer = (
    state = { articles: { articles: [] } },
    action
) => {
    switch (action.type) {
        case ARTICLE_LIST_LOAD_MORE_REQUEST:
            return { loading: true, articles: { articles: [] } };
        case ARTICLE_LIST_LOAD_MORE_SUCCESS:
            return { loading: false, articles: action.payload };
        case ARTICLE_LIST_LOAD_MORE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleSearchReducer = (
    state = { articles: { articles: [] } },
    action
) => {
    switch (action.type) {
        case ARTICLE_SEARCH_REQUEST:
            return { loading: true, articles: { articles: [] } };
        case ARTICLE_SEARCH_SUCCESS:
            return { loading: false, articles: action.payload };
        case ARTICLE_SEARCH_UPDATE:
            return {
                loading: false,
                articles: state.articles.articles
                    ? {
                          ...state.articles,
                          articles: state.articles.articles.map((article) =>
                              article.slug === action.payload.slug
                                  ? action.payload
                                  : article
                          ),
                      }
                    : { ...state.articles },
            };
        case ARTICLE_SEARCH_MORE:
            return {
                loading: false,
                articles: {
                    ...action.payload,
                    articles: [
                        ...state.articles.articles,
                        ...action.payload.articles,
                    ],
                },
            };
        case ARTICLE_SEARCH_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleSearchRelativeReducer = (
    state = { articles: { articles: [] } },
    action
) => {
    switch (action.type) {
        case ARTICLE_SEARCH_RELATIVE_REQUEST:
            return { loading: true, articles: { articles: [] } };
        case ARTICLE_SEARCH_RELATIVE_SUCCESS:
            return { loading: false, articles: action.payload };
        case ARTICLE_SEARCH_RELATIVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleYourListReducer = (
    state = { articles: { articles: [] } },
    action
) => {
    switch (action.type) {
        case ARTICLE_YOUR_LIST_REQUEST:
            return { loading: true, articles: { articles: [] } };
        case ARTICLE_YOUR_LIST_SUCCESS:
            return { loading: false, articles: action.payload };
        case ARTICLE_YOUR_LIST_UPDATE:
            return {
                loading: false,
                articles: state.articles.articles
                    ? {
                          ...state.articles,
                          articles: state.articles.articles.map((article) =>
                              article.slug === action.payload.slug
                                  ? action.payload
                                  : article
                          ),
                      }
                    : {
                          ...state.articles,
                      },
            };
        case ARTICLE_YOUR_LIST_DELETE:
            return {
                loading: false,
                articles: state.articles.articles
                    ? {
                          ...state.articles,
                          articles: state.articles.articles.filter(
                              (article) => article.slug !== action.payload.slug
                          ),
                      }
                    : {
                          ...state.articles,
                      },
            };
        case ARTICLE_YOUR_LIST_MORE:
            return {
                loading: false,
                articles: {
                    ...action.payload,
                    articles: [
                        ...state.articles.articles,
                        ...action.payload.articles,
                    ],
                },
            };
        case ARTICLE_YOUR_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articlePopularListReducer = (
    state = { articles: { articles: [] } },
    action
) => {
    switch (action.type) {
        case ARTICLE_POPULAR_REQUEST:
            return { loading: true, articles: { articles: [] } };
        case ARTICLE_POPULAR_SUCCESS:
            return { loading: false, articles: action.payload };
        case ARTICLE_POPULAR_UPDATE:
            return {
                loading: false,
                articles: state.articles.articles
                    ? {
                          articles: state.articles.articles.map((article) =>
                              article.slug === action.payload.slug
                                  ? action.payload
                                  : article
                          ),
                          page: state.articles.page,
                          pages: state.articles.pages,
                      }
                    : { ...state.articles },
            };
        case ARTICLE_POPULAR_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleFeedListReducer = (
    state = { articles: { articles: [] } },
    action
) => {
    switch (action.type) {
        case ARTICLE_LIST_FEED_REQUEST:
            return { loading: true, articles: { articles: [] } };
        case ARTICLE_LIST_FEED_SUCCESS:
            return { loading: false, articles: action.payload };
        case ARTICLE_LIST_FEED_UPDATE:
            return {
                loading: false,
                articles: state.articles.articles
                    ? {
                          articles: state.articles.articles.map((article) =>
                              article.slug === action.payload.slug
                                  ? action.payload
                                  : article
                          ),
                          page: state.articles.page,
                          pages: state.articles.pages,
                      }
                    : {
                          ...state.articles,
                      },
            };
        case ARTICLE_LIST_FEED_MORE:
            return {
                loading: false,
                articles: {
                    ...action.payload,
                    articles: [
                        ...state.articles.articles,
                        ...action.payload.articles,
                    ],
                },
            };
        case ARTICLE_LIST_FEED_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleRelativeTagReducer = (
    state = { articles: { articles: [] } },
    action
) => {
    switch (action.type) {
        case ARTICLE_RELATIVE_TAG_REQUEST:
            return { loading: true, articles: { articles: [] } };
        case ARTICLE_RELATIVE_TAG_SUCCESS:
            return { loading: false, articles: action.payload };
        case ARTICLE_RELATIVE_TAG_UPDATE:
            return {
                loading: false,
                articles: state.articles.articles
                    ? {
                          articles: state.articles.articles.map((article) =>
                              article.slug === action.payload.slug
                                  ? action.payload
                                  : article
                          ),
                          total: state.articles.total,
                      }
                    : {
                          ...state.articles,
                      },
            };
        case ARTICLE_RELATIVE_TAG_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleRelativeAuthorReducer = (
    state = { articles: { articles: [] } },
    action
) => {
    switch (action.type) {
        case ARTICLE_RELATIVE_AUTHOR_REQUEST:
            return { loading: true, articles: { articles: [] } };
        case ARTICLE_RELATIVE_AUTHOR_SUCCESS:
            return { loading: false, articles: action.payload };
        case ARTICLE_RELATIVE_AUTHOR_UPDATE:
            return {
                loading: false,
                articles: state.articles.articles
                    ? {
                          articles: state.articles.articles.map((article) =>
                              article.slug === action.payload.slug
                                  ? action.payload
                                  : article
                          ),
                          total: state.articles.total,
                      }
                    : {
                          ...state.articles,
                      },
            };
        case ARTICLE_RELATIVE_AUTHOR_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleDetailsReducer = (state = { article: {} }, action) => {
    switch (action.type) {
        case ARTICLE_DETAILS_REQUEST:
            return { loading: true, ...state };
        case ARTICLE_DETAILS_SUCCESS:
            return { loading: false, article: action.payload };
        case ARTICLE_DETAILS_UPDATE:
            return {
                loading: false,
                article:
                    state.article.slug === action.payload.slug
                        ? action.payload
                        : state.article,
            };
        case ARTICLE_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_UPDATE_REQUEST:
            return { loading: true };
        case ARTICLE_UPDATE_SUCCESS:
            return { loading: false, success: true, article: action.payload };
        case ARTICLE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case ARTICLE_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const articleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_DELETE_REQUEST:
            return { loading: true };
        case ARTICLE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case ARTICLE_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_CREATE_REQUEST:
            return { loading: true };
        case ARTICLE_CREATE_SUCCESS:
            return { loading: false, success: true, article: action.payload };
        case ARTICLE_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload.includes("dup")
                    ? "Duplicate article title"
                    : action.payload,
            };
        case ARTICLE_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const articleFavoriteReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_FAVORITE_REQUEST:
            return { loading: true };
        case ARTICLE_FAVORITE_SUCCESS:
            return { loading: false, success: true };
        case ARTICLE_FAVORITE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleUnFavoriteReducer = (state = {}, action) => {
    switch (action.type) {
        case ARTICLE_UNFAVORITE_REQUEST:
            return { loading: true };
        case ARTICLE_UNFAVORITE_SUCCESS:
            return { loading: false, success: true };
        case ARTICLE_UNFAVORITE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleFavoriteListReducer = (
    state = { articles: { articles: [] } },
    action
) => {
    switch (action.type) {
        case ARTICLE_LIST_FAVORITE_REQUEST:
            return { loading: true, articles: { articles: [] } };
        case ARTICLE_LIST_FAVORITE_SUCCESS:
            return { loading: false, articles: action.payload };
        case ARTICLE_LIST_FAVORITE_UPDATE:
            return {
                loading: false,
                articles: state.articles.articles
                    ? {
                          ...state.articles,
                          articles: state.articles.articles.filter(
                              (article) => article.slug !== action.payload.slug
                          ),
                      }
                    : { ...state.articles },
            };
        case ARTICLE_LIST_FAVORITE_MORE:
            return {
                loading: false,
                articles: {
                    ...action.payload,
                    articles: [
                        ...state.articles.articles,
                        ...action.payload.articles,
                    ],
                },
            };
        case ARTICLE_LIST_FAVORITE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const articleNewListReducer = (
    state = { articles: { articles: [] } },
    action
) => {
    switch (action.type) {
        case ARTICLE_NEW_LIST_REQUEST:
            return { loading: true, articles: { articles: [] } };
        case ARTICLE_NEW_LIST_SUCCESS:
            return { loading: false, articles: action.payload };
        case ARTICLE_NEW_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
