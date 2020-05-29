import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addUom } from "../../_actions/uomAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AddUom = ({ addUom, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    size: "",
  });

  const { name, size } = formData;

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    addUom(formData, history);
  };

  return (
    <React.Fragment>
      <h3 className="lead ">
        {" "}
        <Link to="/uoms" className="pr-4">
          <i class="fa fa-arrow-circle-left fa-lg" aria-hidden="true"></i>
        </Link>{" "}
        Add Unit of Measurement
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
                placeholder="Uom"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="size"
                value={size}
                placeholder="Size"
                required
                onChange={(e) => onChangeHandler(e)}
              />
              <small>UoM: PSC, Size: Small</small>
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

AddUom.propTypes = {
  addUom: PropTypes.func.isRequired,
};

export default connect(null, { addUom })(withRouter(AddUom));
