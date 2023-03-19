import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { forgotPassword } from "../actions/userActions";

import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Message from "../components/Message";

import "../css/AuthScreen.css";

const ForgotPasswordScreen = () => {
    document.querySelector("title").innerHTML = "Forgot Password — DualBlog";

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const dispatch = useDispatch();
    const userForgotPassword = useSelector((state) => state.userForgotPassword);

    const { loading, success, error } = userForgotPassword;

    const forgotPasswordHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    };
    return (
        <div className="position-relative">
            {error && <Message variant="danger">{error}</Message>}
            <div className="login-component">
                {success ? (
                    <div className="d-flex">
                        <div className="col-5 auth-background"></div>
                        <div className="col-7 border-5 border-start border-dark d-flex justify-content-center">
                            <form className="col-8 d-flex flex-column align-items-center mt-5">
                                <div className="title fw-bold d-flex justify-content-center">
                                    Send Request Successfully!
                                </div>
                                <div className="mx-auto check-mail-background d-flex justify-content-center"></div>
                                <div className="font-text text-center description">
                                    Please check your inbox in{" "}
                                    <a href="https://mail.google.com">
                                        Google Mail
                                    </a>{" "}
                                    to reset password and enter new password for
                                    your account. If you don't see it, go to
                                    your spam folder to find it.
                                </div>
                                <div className="mt-auto mb-2 col-8">
                                    <Footer />
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex">
                        <div className="col-5 border-5 border-end border-dark auth-background"></div>
                        <div className="col-7 d-flex justify-content-center">
                            {loading ? (
                                <Loader />
                            ) : (
                                <form
                                    className="col-8 d-flex flex-column align-items-center mt-5"
                                    noValidate
                                >
                                    <div className="my-auto col-12 d-flex flex-column align-items-center">
                                        <div className="title fw-bold d-flex justify-content-center mb-2">
                                            Forgot Password
                                        </div>
                                        <div className="mb-2 col-8">
                                            <label htmlFor="emailInputSignIn">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className={`form-control ${
                                                    validEmail
                                                        ? ""
                                                        : "is-invalid"
                                                }`}
                                                id="emailInputSignIn"
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    if (
                                                        e.target.value &&
                                                        e.target.value.includes(
                                                            "@"
                                                        )
                                                    ) {
                                                        setValidEmail(true);
                                                    } else {
                                                        setValidEmail(false);
                                                    }
                                                }}
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Please exactly your gmail
                                                address.
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center mt-3 col-8">
                                            <input
                                                type="submit"
                                                className={`btn btn-warning col-12 ${
                                                    validEmail ? "" : "disabled"
                                                }`}
                                                value="Send"
                                                onClick={(e) =>
                                                    forgotPasswordHandler(e)
                                                }
                                            />
                                        </div>
                                        <div className="d-flex other-feature justify-content-center align-items-center mt-3 col-8">
                                            <div className="me-2 text-secondary">
                                                Already remember password?
                                            </div>
                                            <a
                                                href="/login"
                                                className="text-dark text-decoration-none fw-bold d-flex justify-content-center"
                                            >
                                                Sign In
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-auto mb-2 col-8">
                                        <Footer />
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;
