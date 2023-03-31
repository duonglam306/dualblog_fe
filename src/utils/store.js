import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
    articleListReducer,
    articleNewListReducer,
    articleYourListReducer,
    articleFavoriteListReducer,
    articlePopularListReducer,
    articleFeedListReducer,
    articleDetailsReducer,
    articleFavoriteReducer,
    articleUnFavoriteReducer,
    articleCreateReducer,
    articleUpdateReducer,
    articleDeleteReducer,
    articleRelativeTagReducer,
    articleRelativeAuthorReducer,
    articleSearchReducer,
    articleSearchRelativeReducer,
    articleListLoadMoreReducer,
} from "../reducers/articleReducers";
import {
    tagListReducer,
    tagListLoadMoreReducer,
    tagSearchReducer,
    tagSearchRelativeReducer,
} from "../reducers/tagReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userCurrentReducer,
    userUpdateReducer,
    userProfileReducer,
    userFollowReducer,
    userUnFollowReducer,
    userFollowListReducer,
    userUnFollowListReducer,
    userSearchReducer,
    userSearchRelativeReducer,
    accountActivateReducer,
    userForgotPasswordReducer,
    resetPasswordReducer,
    userListLoadMoreReducer,
} from "../reducers/userReducers";
import {
    commentListReducer,
    commentListLoadMoreReducer,
    deleteCommentReducer,
    createCommentReducer,
} from "../reducers/commentReducers";
const rootReducer = combineReducers({
    tagList: tagListReducer,
    tagListLoadMore: tagListLoadMoreReducer,
    tagSearch: tagSearchReducer,
    articleSearch: articleSearchReducer,
    userSearch: userSearchReducer,
    tagSearchRelative: tagSearchRelativeReducer,
    articleSearchRelative: articleSearchRelativeReducer,
    userSearchRelative: userSearchRelativeReducer,
    commentList: commentListReducer,
    commentListLoadMore: commentListLoadMoreReducer,
    commentDelete: deleteCommentReducer,
    commentCreate: createCommentReducer,
    articleList: articleListReducer,
    articleListLoadMore: articleListLoadMoreReducer,
    articleYourList: articleYourListReducer,
    articleNewList: articleNewListReducer,
    articleFavoriteList: articleFavoriteListReducer,
    articlePopularList: articlePopularListReducer,
    articleFeedList: articleFeedListReducer,
    articleDetails: articleDetailsReducer,
    articleFavorite: articleFavoriteReducer,
    articleUnFavorite: articleUnFavoriteReducer,
    articleCreate: articleCreateReducer,
    articleUpdate: articleUpdateReducer,
    articleDelete: articleDeleteReducer,
    articleRelativeTag: articleRelativeTagReducer,
    articleRelativeAuthor: articleRelativeAuthorReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userCurrent: userCurrentReducer,
    userUpdate: userUpdateReducer,
    userProfile: userProfileReducer,
    userFollow: userFollowReducer,
    userUnFollow: userUnFollowReducer,
    userFollowList: userFollowListReducer,
    userUnFollowList: userUnFollowListReducer,
    accountActivate: accountActivateReducer,
    userForgotPassword: userForgotPasswordReducer,
    userResetPassword: resetPasswordReducer,
    userListLoadMore: userListLoadMoreReducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const preloadedState = {};

const middleware = [thunk];

const pReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: pReducer,
    middleware,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
});

let persistor = persistStore(store);

export { store, persistor };
