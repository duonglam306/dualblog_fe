import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../actions/userActions";
import { USER_REGISTER_RESET } from "../constants/userConstants";

import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Message from "../components/Message";

import "../css/AuthScreen.css";
import Logo from "../image/logo.png";

const RegisterScreen = () => {
  document.querySelector("title").innerHTML = "Sign up — DualBlog";

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [inValidConfirmPassword, setInValidConfirmPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const patternPassword =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, success, error } = userRegister;

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(register(email, username, confirmPassword));
  };

  useEffect(() => {
    dispatch({
      type: USER_REGISTER_RESET,
    });
  }, [dispatch]);

  return (
    <div className="position-relative">
      {error && <Message variant="danger">{error}</Message>}
      <div className="position-fixed border border-dark d-flex align-items-center btn-home">
        <a href="/" className="ms-3">
          <img src={Logo} alt="logo" />
        </a>
      </div>
      <div className="login-component">
        {success ? (
          <div className="d-flex">
            <div className="col-5 border-5 border-end border-dark auth-background"></div>
            <div className="col-7 d-flex justify-content-center">
              <form className="col-8 d-flex flex-column align-items-center mt-5">
                <div className="title fw-bold d-flex justify-content-center">
                  Sign Up Successfully!
                </div>
                <div className="font-text text-center description">
                  Now that you can't sign in, you need to activate your account.
                </div>
                <div className="mx-auto check-mail-background d-flex justify-content-center"></div>
                <div className="font-text text-center description">
                  Please check your inbox in{" "}
                  <a href="https://mail.google.com">Google Mail</a> to verify
                  the account you have registered. If you don't see it, go to
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
                  className="col-8 d-flex flex-column align-items-center mt-2"
                  noValidate>
                  <div className="title fw-bold d-flex justify-content-center mb-2">
                    Sign Up
                  </div>

                  <div className="col-9 mb-1">
                    <label htmlFor="emailInputSignIn">Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        validEmail ? "" : "is-invalid"
                      }`}
                      id="emailInputSignIn"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value && e.target.value.includes("@")) {
                          setValidEmail(true);
                        } else {
                          setValidEmail(false);
                        }
                      }}
                      required
                    />
                    <div className="invalid-feedback">
                      Please exactly your gmail address.
                    </div>
                  </div>

                  <div className="col-9 mb-1">
                    <label htmlFor="usernameInputSignIn">Username</label>
                    <input
                      type="text"
                      className={`form-control ${
                        validUsername ? "" : "is-invalid"
                      }`}
                      id="usernameInputSignIn"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (
                          e.target.value &&
                          e.target.value.length >= 8 &&
                          e.target.value.length <= 25
                        ) {
                          setValidUsername(true);
                        } else {
                          setValidUsername(false);
                        }
                      }}
                      required
                    />
                    <div className="invalid-feedback">
                      Username must have length from 8 to 25 characters.
                    </div>
                  </div>

                  <div className="col-9 mb-1">
                    <label htmlFor="passwordInputSignIn">Password</label>
                    <input
                      type="password"
                      value={password}
                      className={`form-control ${
                        validPassword ? "" : "is-invalid"
                      }`}
                      id="passwordInputSignIn"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (
                          e.target.value &&
                          patternPassword.test(e.target.value)
                        ) {
                          setValidPassword(true);
                        } else {
                          setValidPassword(false);
                        }
                      }}
                      required
                    />
                    <div className="invalid-feedback">
                      Password must contain one digit from 1 to 9, one lowercase
                      letter, one uppercase letter, one special character, no
                      space, and it must be 8-16 characters long.
                    </div>
                  </div>
                  <div className="col-9 mb-1">
                    <label htmlFor="confirmPasswordInputSignIn">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      className={`form-control ${
                        inValidConfirmPassword ? "is-invalid" : ""
                      } ${validConfirmPassword ? "is-valid" : ""}`}
                      id="confirmPasswordInputSignIn"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (e.target.value && e.target.value === password) {
                          setInValidConfirmPassword(false);
                          setValidConfirmPassword(true);
                        } else {
                          setInValidConfirmPassword(true);
                          setValidConfirmPassword(false);
                        }
                      }}
                      required
                    />
                    <div className="invalid-feedback">
                      The entered passwords do not match. Try again.
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-2 col-9">
                    <input
                      type="submit"
                      className={`btn btn-warning col-12 ${
                        validPassword &&
                        validConfirmPassword &&
                        validUsername &&
                        validEmail &&
                        password &&
                        confirmPassword &&
                        username &&
                        email
                          ? ""
                          : "disabled"
                      }`}
                      value="Sign Up"
                      onClick={(e) => registerHandler(e)}
                    />
                  </div>
                  <div className="d-flex other-feature justify-content-center align-items-center mt-3 col-9">
                    <div className="me-2 text-secondary">
                      Already have an account?
                    </div>
                    <a
                      href="/login"
                      className="text-dark text-decoration-none fw-bold d-flex justify-content-center">
                      Sign In
                    </a>
                  </div>
                  <div className="mt-auto mb-2 col-9">
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

export default RegisterScreen;
