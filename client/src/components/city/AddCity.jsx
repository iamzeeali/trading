import React, { useState } from "react";
import State from "../ui/State";
import { addCity } from "../../_actions/cityAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AddCity = ({ addCity, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
  });

  const { name, state } = formData;

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addCity(formData, history);
  };

  return (
    <React.Fragment>
      <h3 className="lead ">
        {" "}
        <Link to="/cities" className="pr-4">
          <i class="fa fa-list fa-lg" aria-hidden="true"></i>
        </Link>{" "}
        Add a City
      </h3>
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

AddCity.propTypes = {
  addCity: PropTypes.func.isRequired,
};

export default connect(null, { addCity })(withRouter(AddCity));
