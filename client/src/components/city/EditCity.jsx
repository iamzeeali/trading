import React, { useState, useEffect } from "react";
import State from "../ui/State";
import { editCity, getCurrentCity } from "../../_actions/cityAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const EditCity = ({ city: { city, loading }, editCity, history, match }) => {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
  });

  const { name, state } = formData;

  useEffect(() => {
    getCurrentCity(match.params.id);
    setFormData({
      name: loading || !city.name ? "" : city.name,
      state: loading || !city.state ? "" : city.state,
    });
  }, [loading, getCurrentCity, setFormData]);

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    editCity(formData, history, match.params.id);
  };

  return (
    <React.Fragment>
      <h3 className="lead ">Edit City</h3>
      <div className="card card-outline-secondary">
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                placeholder="City Name"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <State
                name="state"
                value={state}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <input
              type="submit"
              className="btn btn-success btn-block"
              value="Save"
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  city: state.city,
});

EditCity.propTypes = {
  editCity: PropTypes.func.isRequired,
  getCurrentCity: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { editCity, getCurrentCity })(
  withRouter(EditCity)
);
