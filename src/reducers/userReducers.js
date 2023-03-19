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
    USER_FOLLOW_LIST_REQUEST,
    USER_FOLLOW_LIST_SUCCESS,
    USER_FOLLOW_LIST_UPDATE,
    USER_FOLLOW_LIST_MORE,
    USER_FOLLOW_LIST_FAIL,
    USER_UNFOLLOW_LIST_REQUEST,
    USER_UNFOLLOW_LIST_SUCCESS,
    USER_UNFOLLOW_LIST_UPDATE,
    USER_UNFOLLOW_LIST_MORE,
    USER_UNFOLLOW_LIST_FAIL,
    USER_SEARCH_REQUEST,
    USER_SEARCH_SUCCESS,
    USER_SEARCH_UPDATE,
    USER_SEARCH_MORE,
    USER_SEARCH_FAIL,
    USER_SEARCH_RELATIVE_REQUEST,
    USER_SEARCH_RELATIVE_SUCCESS,
    USER_SEARCH_RELATIVE_FAIL,
    USER_SEARCH_RELATIVE_UPDATE,
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

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case USER_REGISTER_RESET:
            return {};
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const accountActivateReducer = (state = {}, action) => {
    switch (action.type) {
        case ACCOUNT_ACTIVATE_REQUEST:
            return { loading: true };
        case ACCOUNT_ACTIVATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case ACCOUNT_ACTIVATE_FAIL:
            return { loading: false, error: action.payload };
        case ACCOUNT_ACTIVATE_RESET:
            return {};
        default:
            return state;
    }
};

export const userForgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_FORGOT_PASSWORD_REQUEST:
            return { loading: true };
        case USER_FORGOT_PASSWORD_SUCCESS:
            return { loading: false, success: true };
        case USER_FORGOT_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        case USER_FORGOT_PASSWORD_RESET:
            return {};
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const resetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return { loading: true };
        case RESET_PASSWORD_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case RESET_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        case RESET_PASSWORD_RESET:
            return {};
        default:
            return state;
    }
};

export const userCurrentReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return { loading: true, ...state };
        case USER_DETAIL_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        case USER_DETAIL_RESET:
            return {};
        default:
            return state;
    }
};

export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case USER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

export const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return { loading: true };
        case USER_PROFILE_SUCCESS:
            return { loading: false, profile: action.payload };
        case USER_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userFollowReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_FOLLOW_REQUEST:
            return { loading: true };
        case USER_FOLLOW_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfoFollow: action.payload,
            };
        case USER_FOLLOW_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userUnFollowReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UNFOLLOW_REQUEST:
            return { loading: true };
        case USER_UNFOLLOW_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfoUnFollow: action.payload,
            };
        case USER_UNFOLLOW_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userFollowListReducer = (
    state = { users: { users: [] } },
    action
) => {
    switch (action.type) {
        case USER_FOLLOW_LIST_REQUEST:
            return { loading: true, users: { users: [] } };
        case USER_FOLLOW_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_FOLLOW_LIST_UPDATE:
            return {
                loading: false,
                users: state.users.users
                    ? {
                          ...state.users,
                          users: state.users.users.map((user) =>
                              user.username === action.payload.username
                                  ? action.payload
                                  : user
                          ),
                      }
                    : { ...state.users },
            };
        case USER_FOLLOW_LIST_MORE:
            return {
                loading: false,
                users: {
                    ...action.payload,
                    users: [...state.users.users, ...action.payload.users],
                },
            };
        case USER_FOLLOW_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userUnFollowListReducer = (
    state = { users: { users: [] } },
    action
) => {
    switch (action.type) {
        case USER_UNFOLLOW_LIST_REQUEST:
            return { loading: true, users: { users: [] } };
        case USER_UNFOLLOW_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_UNFOLLOW_LIST_UPDATE:
            return {
                loading: false,
                users: state.users.users
                    ? {
                          ...state.users,
                          users: state.users.users.map((user) =>
                              user.username === action.payload.username
                                  ? action.payload
                                  : user
                          ),
                      }
                    : { ...state.users },
            };
        case USER_UNFOLLOW_LIST_MORE:
            return {
                loading: false,
                users: {
                    ...action.payload,
                    users: [...state.users.users, ...action.payload.users],
                },
            };
        case USER_UNFOLLOW_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userSearchReducer = (state = { users: { users: [] } }, action) => {
    switch (action.type) {
        case USER_SEARCH_REQUEST:
            return { loading: true, users: { users: [] } };
        case USER_SEARCH_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_SEARCH_UPDATE:
            return {
                loading: false,
                users: state.users.users
                    ? {
                          ...state.users,
                          users: state.users.users.map((user) =>
                              user.username === action.payload.username
                                  ? action.payload
                                  : user
                          ),
                      }
                    : {
                          ...state.users,
                      },
            };
        case USER_SEARCH_MORE:
            return {
                loading: false,
                users: {
                    ...action.payload,
                    users: [...state.users.users, ...action.payload.users],
                },
            };
        case USER_SEARCH_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userSearchRelativeReducer = (
    state = { users: { users: [] } },
    action
) => {
    switch (action.type) {
        case USER_SEARCH_RELATIVE_REQUEST:
            return { loading: true, users: { users: [] } };
        case USER_SEARCH_RELATIVE_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_SEARCH_RELATIVE_UPDATE:
            return {
                loading: false,
                users: state.users.users
                    ? {
                          ...state.users,
                          users: state.users.users.map((user) =>
                              user.username === action.payload.username
                                  ? action.payload
                                  : user
                          ),
                      }
                    : {
                          ...state.users,
                      },
            };
        case USER_SEARCH_RELATIVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userMailSignUpReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_MAIL_SIGNUP_REQUEST:
            return { loading: true };
        case USER_MAIL_SIGNUP_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case USER_MAIL_SIGNUP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userListLoadMoreReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LIST_LOAD_MORE_REQUEST:
            return { loading: true };
        case USER_LIST_LOAD_MORE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case USER_LIST_LOAD_MORE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
