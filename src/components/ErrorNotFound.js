import React from "react";
import { Link } from "react-router-dom";

import errorBg from "../image/error.svg";
import logo from "../image/logo.png";
import "../css/ErrorNotFound.css";

function ErrorNotFound() {
    return (
        <div className="error-not-found-component">
            <div className="header-guess-component sticky-top">
                <nav
                    className={`navbar navbar-light border-bottom border-dark ${
                        "bg-warning"
                    }`}
                >
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center col-12 py-2">
                            <Link
                                to="/"
                                className="text-decoration-none text-dark"
                            >
                                <div className="d-flex col-4">
                                    <img
                                        src={logo}
                                        alt="logo-web"
                                        className="img-fluid"
                                    />
                                    <div className="mx-2 text-center font-title d-flex align-items-center fw-bold title-web">
                                        DualBlog
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="d-flex align-items-center justify-content-center h-100">
                <div className="col-7">
                    <img
                        src={errorBg}
                        alt="checkMail-bg"
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
}

export default ErrorNotFound;
