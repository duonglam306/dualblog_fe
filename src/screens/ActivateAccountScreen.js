import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
    activateAccount,
    sendMailSignUp,
    logout,
} from "../actions/userActions";

import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ErrorNotFound from "../components/ErrorNotFound";

import "../css/AuthScreen.css";

function ActivateAccountScreen() {
    document.querySelector("title").innerHTML = "Activate account — DualBlog";

    const { token } = useParams();

    const dispatch = useDispatch();
    const accountActivate = useSelector((state) => state.accountActivate);

    const { loading, error, userInfo } = accountActivate;
    useEffect(() => {
        dispatch(activateAccount(token));
        if (userInfo) {
            dispatch(
                sendMailSignUp(
                    userInfo.username,
                    userInfo.token,
                    userInfo.email
                )
            );
        }
    }, [dispatch, token, userInfo]);
    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <ErrorNotFound />
            ) : (
                <div className="login-component">
                    <div className="d-flex">
                        <div className="col-5 border-5 border-end border-dark auth-background"></div>
                        <div className="col-7 d-flex justify-content-center">
                            <form className="col-8 d-flex flex-column align-items-center mt-5">
                                <div className="done-activate-background"></div>
                                <div className="title fw-bold d-flex justify-content-center mt-2">
                                    Activate Account Successfully!
                                </div>
                                <div className="d-flex justify-content-center mt-2">
                                    <Link
                                        to="/login"
                                        className="text-decoration-none"
                                    >
                                        <input
                                            type="submit"
                                            className="btn btn-warning"
                                            value="Sign In"
                                            onClick={() => {
                                                dispatch(logout());
                                            }}
                                        />
                                    </Link>
                                </div>
                                <div className="mt-auto mb-2 col-8">
                                    <Footer />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ActivateAccountScreen;
