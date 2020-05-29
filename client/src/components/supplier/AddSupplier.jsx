import React, { useState } from "react";
import State from "../ui/State";
import { addSupplier } from "../../_actions/supplierAction";
import { populateCities } from "../../_actions/cityAction";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AddSupplier = ({ addSupplier, populateCities, cities, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone1: "",
    phone2: "",
    email: "",
    address: "",
    contactPerson: "",
    state: "",
    city: "",
    bank: "",
    accountNo: "",
    accountHolder: "",
    ifsc: "",
    bankBranch: "",
    description: "",
  });

  const {
    name,
    phone1,
    phone2,
    email,
    address,
    contactPerson,
    state,
    city,
    bank,
    accountNo,
    accountHolder,
    ifsc,
    bankBranch,
    description,
  } = formData;

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeState = (e) => {
    e.preventDefault();
    setFormData({ ...formData, state: e.target.value });
    populateCities(e.target.value);
  };

  let cityOptions = cities.map((city) => (
    <option key={city._id} value={city._id}>
      {city.name}
    </option>
  ));

  const onSubmit = async (e) => {
    e.preventDefault();
    addSupplier(formData, history);
  };

  return (
    <React.Fragment>
      <h3 className="lead ">
        <Link to="/suppliers" className="pr-4">
          <i class="fa fa-list fa-lg" aria-hidden="true"></i>
        </Link>{" "}
        Add a Supplier
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
                placeholder="Supplier Name"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="Number"
                className="form-control"
                name="phone1"
                value={phone1}
                placeholder="Phone 1"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="Number"
                className="form-control"
                name="phone2"
                value={phone2}
                placeholder="Phone 2"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                name="address"
                value={address}
                placeholder="Address"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="contactPerson"
                value={contactPerson}
                placeholder="Contact Person"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <State
                name="state"
                value={state}
                onChange={(e) => onChangeState(e)}
              />
            </div>

            <div className="form-group">
              <select
                name="city"
                value={city}
                className="custom-select"
                onChange={(e) => onChangeHandler(e)}
              >
                <option value="" disabled selected hidden>
                  Select city
                </option>
                {cityOptions}
              </select>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="bank"
                value={bank}
                placeholder="Bank Name"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                className="form-control"
                name="accountNo"
                value={accountNo}
                placeholder="Bank A/C number"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="accountHolder"
                value={accountHolder}
                placeholder="Account holder"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="ifsc"
                value={ifsc}
                placeholder="IFSC code"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="bankBranch"
                value={bankBranch}
                placeholder="Bank Branch"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                name="description"
                value={description}
                placeholder="Description"
                required
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
  cities: state.city.cities,
});

AddSupplier.propTypes = {
  addSupplier: PropTypes.func.isRequired,
  populateCities: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addSupplier, populateCities })(
  withRouter(AddSupplier)
);
