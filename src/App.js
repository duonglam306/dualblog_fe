import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeScreenFeed from "./screens/HomeScreenFeed";
import HomeScreenGlobal from "./screens/HomeScreenGlobal";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileAboutScreen from "./screens/ProfileAboutScreen";
import SettingScreen from "./screens/SettingScreen";
import ArticleScreen from "./screens/ArticleScreen";
import EditorScreen from "./screens/EditorScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ArticlesByTagScreen from "./screens/ArticlesByTagScreen";
import ArticlesFavoriteScreen from "./screens/ArticlesFavoriteScreen";
import YourArticlesScreen from "./screens/YourArticlesScreen";
import SearchArticleScreen from "./screens/SearchArticleScreen";
import SearchUserScreen from "./screens/SearchUserScreen";
import SearchTagScreen from "./screens/SearchTagScreen";
import ActivateAccountScreen from "./screens/ActivateAccountScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

import ScrollToTop from "./utils/ScrollToTop";
import Modal from "./components/Modal";
import ErrorNotFound from "./components/ErrorNotFound";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Modal />
                <ScrollToTop />
                <Routes>
                    <Route path="/following" element={<HomeScreenFeed />} />
                    <Route path="/" element={<HomeScreenGlobal />} />
                    <Route path="*" element={<ErrorNotFound />} />
                    <Route
                        path="/search/articles/:keyword"
                        element={<SearchArticleScreen />}
                    />
                    <Route
                        path="/search/tags/:keyword"
                        element={<SearchTagScreen />}
                    />
                    <Route
                        path="/search/users/:keyword"
                        element={<SearchUserScreen />}
                    />
                    <Route path="/setting" element={<SettingScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    <Route
                        path="/forgotPassword"
                        element={<ForgotPasswordScreen />}
                    />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/editor/:slug" element={<EditorScreen />} />
                    <Route path="/editor" element={<EditorScreen />} />
                    <Route path="/article/:slug" element={<ArticleScreen />} />
                    <Route path="/tag/:tag" element={<ArticlesByTagScreen />} />
                    <Route
                        path="/user/activate/:token"
                        element={<ActivateAccountScreen />}
                    />
                    <Route
                        path="/user/resetPassword/:token"
                        element={<ResetPasswordScreen />}
                    />
                    <Route
                        path="/@:userName/about"
                        element={<ProfileAboutScreen />}
                    />
                    <Route path="/@:userName" element={<ProfileScreen />} />
                    <Route
                        path="/me/favorite"
                        element={<ArticlesFavoriteScreen />}
                    />
                    <Route
                        path="/me/articles"
                        element={<YourArticlesScreen />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
