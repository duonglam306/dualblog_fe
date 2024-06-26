import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { login, logout } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Footer from "../components/Footer";

import "../css/AuthScreen.css";
import Logo from "../image/logo.png";

const LoginScreen = () => {
  document.querySelector("title").innerHTML = "Sign in — DualBlog";
  const navigate = useNavigate();

  let token = Cookies.get("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, userInfo, error } = userLogin;

  useEffect(() => {
    if (userInfo && token) {
      navigate("/");
    } else {
      dispatch(logout());
    }
  }, [userInfo, navigate, token, dispatch]);

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };
  return (
    <div className="position-relative">
      <div className="position-fixed border border-dark d-flex align-items-center btn-home">
        <a href="/" className="ms-3">
          <img src={Logo} alt="logo" />
        </a>
      </div>
      {error && <Message variant="danger">{error}</Message>}
      <div className="login-component">
        <div className="d-flex">
          <div className="col-5 border-5 border-end border-dark auth-background"></div>
          <div className="col-7 d-flex justify-content-center">
            {loading ? (
              <Loader />
            ) : (
              <form
                className="col-8 d-flex flex-column align-items-center needs-validation mt-5"
                noValidate>
                <div className="title fw-bold d-flex justify-content-center">
                  Sign In
                </div>
                <div className="my-2 col-8">
                  <label htmlFor="emailInputSignIn">Email</label>
                  <input
                    type="email"
                    className={`form-control`}
                    id="emailInputSignIn"
                    value={email}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <div className="invalid-feedback">
                    Please exactly your gmail address.
                  </div>
                </div>
                <div className="my-2 col-8">
                  <label htmlFor="passwordInputSignIn">Password</label>
                  <input
                    type="password"
                    className={`form-control`}
                    id="passwordInputSignIn"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <div className="invalid-feedback">
                    Password must have length from 8 to 16 characters.
                  </div>
                </div>
                <div className="d-flex other-feature justify-content-end col-8">
                  <a
                    href="/forgotPassword"
                    className="text-dark d-flex text-decoration-none fw-bold justify-content-center my-2">
                    Recovery password
                  </a>
                </div>
                <div
                  className={`d-flex justify-content-center mt-3 col-8 ${
                    email && password ? "" : "disabled"
                  }`}>
                  <input
                    type="submit"
                    className={`btn btn-warning fw-bold col-12`}
                    value="Sign In"
                    onClick={(e) => loginHandler(e)}
                  />
                </div>
                <div className="d-flex other-feature justify-content-center align-items-center mt-3 col-8">
                  <div className="me-2 text-secondary">
                    Don't have an account yet?
                  </div>
                  <a
                    href="/register"
                    className="text-dark text-decoration-none fw-bold d-flex justify-content-center">
                    Sign Up
                  </a>
                </div>
                <div className="mt-auto mb-2 col-8">
                  <Footer />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
