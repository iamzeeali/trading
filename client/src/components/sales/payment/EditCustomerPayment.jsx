import React, { useState, useEffect } from "react";
import { getCustomers } from "../../../_actions/customerAction";
import {
  editCustomerPayment,
  getCurrentCustomerPayment,
} from "../../../_actions/customerPaymentAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const EditCustomerPayment = ({
  editCustomerPayment,
  getCustomers,
  match,
  loading,
  customerPayment,
  customers,
  history,
}) => {
  const [dateType, setDateType] = useState("text");
  const [formData, setFormData] = useState({
    customer: "",
    paymentDate: "",
    receivedAmount: "",
    balanceAmount: "",
    paymentMode: "",
    paidBy: "",
    receivedBy: "",
    description: "",
  });

  const {
    customer,
    paymentDate,
    paymentMode,
    receivedAmount,
    balanceAmount,
    paidBy,
    receivedBy,
    description,
  } = formData;

  useEffect(() => {
    getCustomers();
    getCurrentCustomerPayment(match.params.id);

    setFormData({
      paymentDate:
        loading || !customerPayment.paymentDate
          ? ""
          : customerPayment.paymentDate,
      customer:
        loading || !customerPayment.customer ? "" : customerPayment.customer,

      paymentMode:
        loading || !customerPayment.paymentMode
          ? ""
          : customerPayment.paymentMode,

      receivedAmount:
        loading || !customerPayment.receivedAmount
          ? ""
          : customerPayment.receivedAmount,

      balanceAmount:
        loading || !customerPayment.balanceAmount
          ? ""
          : customerPayment.balanceAmount,

      paidBy: loading || !customerPayment.paidBy ? "" : customerPayment.paidBy,

      receivedBy:
        loading || !customerPayment.receivedBy
          ? ""
          : customerPayment.receivedBy,

      description:
        loading || !customerPayment.description
          ? ""
          : customerPayment.description,
    });
    //eslint-diable-next-line
  }, []);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    editCustomerPayment(formData, history, match.params.id);
  };

  let customerOptions = customers.map((customer) => (
    <option key={customer._id} value={customer._id}>
      {customer.name}
    </option>
  ));

  const onFocus = () => {
    setDateType("date");
    console.log(dateType);
  };

  const onBlur = () => {
    setDateType("text");
    console.log(dateType);
  };

  return (
    <React.Fragment>
      <h3 className="lead">
        {" "}
        <Link to="/customer-payment" className="pr-4">
          <i class="fa fa-list fa-lg" aria-hidden="true"></i>
        </Link>{" "}
        Add a customer payment
      </h3>
      <div className="card card-outline-secondary">
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-label-group">
              <select
                className="form-control"
                name="customer"
                value={customer}
                onChange={(e) => onChangeHandler(e)}
                required
              >
                <option value="" disabled selected hidden>
                  Select customer
                </option>

                {customerOptions}
              </select>
            </div>

            <div className="form-group">
              <input
                type={dateType}
                className="form-control"
                name="paymentDate"
                value={paymentDate}
                placeholder="Payment Date"
                onFocus={onFocus}
                onBlur={onBlur}
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                className="form-control"
                name="receivedAmount"
                value={receivedAmount}
                placeholder="Received Amt"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="number"
                className="form-control"
                name="balanceAmount"
                value={balanceAmount}
                placeholder="Balance Amt"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="paymentMode"
                value={paymentMode}
                placeholder="Payment Mode"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="paidBy"
                value={paidBy}
                placeholder="Paid By"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="receivedBy"
                value={receivedBy}
                placeholder="Received By"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                name="description"
                value={description}
                placeholder="Payment Description"
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
  customers: state.customer.customers,
  customerPayment: state.customerPayment.customerPayment,
  loading: state.customerPayment.loading,
});

EditCustomerPayment.propTypes = {
  editCustomerPayment: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
  getCurrentCustomerPayment: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  editCustomerPayment,
  getCustomers,
  getCurrentCustomerPayment,
})(withRouter(EditCustomerPayment));
