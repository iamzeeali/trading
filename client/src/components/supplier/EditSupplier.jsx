import React, { useState, useEffect } from "react";
import State from "../ui/State";
import {
  editSupplier,
  getCurrentSupplier,
} from "../../_actions/supplierAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const EditSupplier = ({
  supplier: { supplier, loading },
  editSupplier,
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
    getCurrentSupplier(match.params.id);
    setFormData({
      name: loading || !supplier.name ? "" : supplier.name,
      phone1: loading || !supplier.phone1 ? "" : supplier.phone1,
      phone2: loading || !supplier.phone2 ? "" : supplier.phone2,
      cPerson: loading || !supplier.cPerson ? "" : supplier.cPerson,
      email: loading || !supplier.email ? "" : supplier.email,
      address: loading || !supplier.address ? "" : supplier.address,
      contactPerson:
        loading || !supplier.contactPerson ? "" : supplier.contactPerson,
      state: loading || !supplier.state ? "" : supplier.state,
      city: loading || !supplier.city ? "" : supplier.city,
      bank: loading || !supplier.bank ? "" : supplier.bank,
      accountNo: loading || !supplier.accountNo ? "" : supplier.accountNo,
      accountHolder:
        loading || !supplier.accountHolder ? "" : supplier.accountHolder,
      ifsc: loading || !supplier.ifsc ? "" : supplier.ifsc,
      bankBranch: loading || !supplier.bankBranch ? "" : supplier.bankBranch,
      description: loading || !supplier.description ? "" : supplier.description,
    });
  }, [loading, getCurrentSupplier, setFormData]);

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
    editSupplier(formData, history, match.params.id);
  };

  return (
    <React.Fragment>
      <h3 className="lead ">Edit Supplier</h3>
      <div className="card card-outline-secondary">
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                placeholder="supplier Name"
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
  supplier: state.supplier,
});

EditSupplier.propTypes = {
  editSupplier: PropTypes.func.isRequired,
  getCurrentSupplier: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { editSupplier, getCurrentSupplier })(
  withRouter(EditSupplier)
);
