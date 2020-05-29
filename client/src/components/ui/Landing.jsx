import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <Link class="navbar-brand" to="/">
          <img src="gl.png" alt="logo" width="100" />
        </Link>
      </nav>
      <div className="landig d-flex align-items-center min-vh-100 text-center bg-primary">
        <div className="container">
          <p className="display-4 text-white">Welcome to Globus trading</p>
          <Link className="lead text-white btn btn-outline-light" to="/login">
            Login
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
