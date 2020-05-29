import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../_actions/authAction";

import "./login.css";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to="/">
          <img src="gl.png" alt="logo" width="100" />
        </Link>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <Link class="nav-link" to="/">
              Home <span class="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="d-flex align-items-center min-vh-100 text-center">
        <div class="container">
          <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div class="card card-signin my-5">
                <div class="card-body">
                  <h5 class="card-title text-center">Sign In</h5>
                  <form class="form-signin" onSubmit={(e) => onSubmit(e)}>
                    <div class="form-label-group">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email address"
                        onChange={(e) => onChangeHandler(e)}
                        name="email"
                        required
                        autofocus
                      />
                    </div>
                    <div class="form-label-group">
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        onChange={(e) => onChangeHandler(e)}
                        name="password"
                        required
                      />
                    </div>
                    <button
                      class="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                    >
                      Sign in
                    </button>
                    <hr class="my-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
