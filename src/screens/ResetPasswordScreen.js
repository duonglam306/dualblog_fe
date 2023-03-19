import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { resetPassword } from "../actions/userActions";

import Footer from "../components/Footer";
import Loader from "../components/Loader";
import ErrorNotFound from "../components/ErrorNotFound";

import "../css/AuthScreen.css";

const ResetPasswordScreen = () => {
    document.querySelector("title").innerHTML = "Reset password — DualBlog";

    const { token } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);

    const dispatch = useDispatch();

    const userResetPassword = useSelector((state) => state.userResetPassword);
    const { loading, success, error } = userResetPassword;

    const resetPasswordHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(token, password, confirmPassword));
    };
    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <ErrorNotFound />
            ) : success ? (
                <>
                    <div className="login-component">
                        <div className="d-flex">
                            <div className="col-5 border-5 border-end border-dark auth-background"></div>
                            <div className="col-7 d-flex justify-content-center">
                                <form className="col-8 d-flex flex-column align-items-center mt-5">
                                    <div className="done-activate-background"></div>
                                    <div className="title fw-bold d-flex justify-content-center mt-2">
                                        Reset Password Successfully!
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
                </>
            ) : (
                <>
                    <div className="login-component">
                        <div className="d-flex">
                            <div className="col-5 border-5 border-end border-dark auth-background"></div>
                            <div className="col-7 d-flex justify-content-center">
                                <form className="col-8 d-flex flex-column align-items-center mt-5" noValidate>
                                    <div className="title fw-bold d-flex justify-content-center">
                                        New Password
                                    </div>
                                    <div className="col-8 mb-2">
                                        <label htmlFor="passwordInputSignIn">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className={`form-control ${
                                                validPassword
                                                    ? ""
                                                    : "is-invalid"
                                            }`}
                                            id="passwordInputSignIn"
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                if (
                                                    e.target.value &&
                                                    e.target.value.length >=
                                                        8 &&
                                                    e.target.value.length <= 16
                                                ) {
                                                    setValidPassword(true);
                                                } else {
                                                    setValidPassword(false);
                                                }
                                            }}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Password must have length from 8 to
                                            16 characters.
                                        </div>
                                    </div>
                                    <div className="col-8 mb-2">
                                        <label htmlFor="confirmPasswordInputSignIn">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            className={`form-control ${
                                                validConfirmPassword
                                                    ? ""
                                                    : "is-invalid"
                                            }`}
                                            id="confirmPasswordInputSignIn"
                                            onChange={(e) => {
                                                setConfirmPassword(
                                                    e.target.value
                                                );
                                                if (
                                                    e.target.value &&
                                                    e.target.value.length >=
                                                        8 &&
                                                    e.target.value.length <=
                                                        16 &&
                                                    e.target.value === password
                                                ) {
                                                    setValidConfirmPassword(
                                                        true
                                                    );
                                                } else {
                                                    setValidConfirmPassword(
                                                        false
                                                    );
                                                }
                                            }}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            The entered passwords do not match.
                                            Try again.
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-3 col-8">
                                        <input
                                            type="submit"
                                            className={`btn btn-warning col-12 ${
                                                validPassword &&
                                                validConfirmPassword
                                                    ? ""
                                                    : "disabled"
                                            }`}
                                            value="Submit"
                                            onClick={(e) =>
                                                resetPasswordHandler(e)
                                            }
                                        />
                                    </div>
                                    <div className="d-flex other-feature justify-content-center align-items-center mt-3 col-8">
                                        <div className="me-2 text-secondary">
                                            Don't want reset password?
                                        </div>
                                        <a
                                            href="/login"
                                            className="text-dark text-decoration-none fw-bold d-flex justify-content-center"
                                        >
                                            Sign In
                                        </a>
                                    </div>
                                    <div className="mt-auto mb-2 col-8">
                                        <Footer />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ResetPasswordScreen;
