import React, { useState, useEffect } from "react";
import State from "../ui/State";
import {
  editCustomer,
  getCurrentCustomer,
} from "../../_actions/customerAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const EditCustomer = ({
  customer: { customer, loading },
  editCustomer,
  history,
  match,
}) => {
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

  useEffect(() => {
    getCurrentCustomer(match.params.id);
    setFormData({
      name: loading || !customer.name ? "" : customer.name,
      phone1: loading || !customer.phone1 ? "" : customer.phone1,
      phone2: loading || !customer.phone2 ? "" : customer.phone2,
      cPerson: loading || !customer.cPerson ? "" : customer.cPerson,
      email: loading || !customer.email ? "" : customer.email,
      address: loading || !customer.address ? "" : customer.address,
      contactPerson:
        loading || !customer.contactPerson ? "" : customer.contactPerson,
      state: loading || !customer.state ? "" : customer.state,
      city: loading || !customer.city ? "" : customer.city,
      bank: loading || !customer.bank ? "" : customer.bank,
      accountNo: loading || !customer.accountNo ? "" : customer.accountNo,
      accountHolder:
        loading || !customer.accountHolder ? "" : customer.accountHolder,
      ifsc: loading || !customer.ifsc ? "" : customer.ifsc,
      bankBranch: loading || !customer.bankBranch ? "" : customer.bankBranch,
      description: loading || !customer.description ? "" : customer.description,
    });
  }, [loading, getCurrentCustomer, setFormData]);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    editCustomer(formData, history, match.params.id);
  };

  return (
    <React.Fragment>
      <h3 className="lead ">Edit Customer</h3>
      <div className="card card-outline-secondary">
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                placeholder="Customer Name"
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
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <select
                name="city"
                value={city}
                className="custom-select"
                onChange={(e) => onChangeHandler(e)}
              >
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
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
  customer: state.customer,
});

EditCustomer.propTypes = {
  editCustomer: PropTypes.func.isRequired,
  getCurrentCustomer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { editCustomer, getCurrentCustomer })(
  withRouter(EditCustomer)
);
