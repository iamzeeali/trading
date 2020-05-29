import React, { useState, useEffect } from "react";
import {
  getCustomers,
  updateReceivable,
} from "../../../_actions/customerAction";
import { addCustomerPayment } from "../../../_actions/customerPaymentAction";
import { getCurrentCustomerDelivery } from "../../../_actions/customerDeliveryAction";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PaymentFromDelivery = ({
  addCustomerPayment,
  getCustomers,
  customers,
  getCurrentCustomerDelivery,
  customerDelivery,
  loading,
  history,
  match,
}) => {
  const [dateType, setDateType] = useState("text");
  const [formData, setFormData] = useState({
    customerDelivery: match.params.id ? match.params.id : null,
    customer: "",
    paymentDate: "",
    receivedAmount: "",
    balanceAmount: "",
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
    getCurrentCustomerDelivery(match.params.id);
    setFormData({
      customer:
        loading || !customerDelivery.customer._id
          ? ""
          : customerDelivery.customer._id,
      paymentDate:
        loading || !customerDelivery.deliveryDate
          ? ""
          : customerDelivery.deliveryDate,
      receivedAmount:
        loading || !customerDelivery.sellingPrice
          ? ""
          : customerDelivery.sellingPrice,

      paidBy:
        loading || !customerDelivery.receivedBy
          ? ""
          : customerDelivery.receivedBy,
      receivedBy:
        loading || !customerDelivery.deliveredBy
          ? ""
          : customerDelivery.deliveredBy,
      description:
        loading || !customerDelivery.description
          ? ""
          : customerDelivery.description,
    });

    //eslint-diable-next-line
  }, []);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    addCustomerPayment(formData, history);

    let updatedReceivable = parseInt(receivedAmount) * -1;
    updateReceivable(updatedReceivable, customer);
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
        <Link to="/customer-delivery" className="pr-4">
          <i class="fa fa-list fa-lg" aria-hidden="true"></i>
        </Link>{" "}
        Add a customer Payment
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
                  Select Customer
                </option>

                {customerOptions}
              </select>
            </div>

            <div className="form-group">
              <label className="form-control">Payment Date</label>
              <input
                type={dateType}
                className="form-control"
                name="paymentDate"
                value={paymentDate}
                onFocus={onFocus}
                onBlur={onBlur}
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Received Amount</label>
              <input
                type="number"
                className="form-control"
                name="receivedAmount"
                value={receivedAmount}
                placeholder="Received Amt"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Balance Amount</label>
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
              <label className="form-control">Payment Mode</label>
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
              <label className="form-control">Paid By</label>
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
              <label className="form-control">Received By</label>
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
              <label className="form-control">Delivery Description</label>
              <textarea
                type="text"
                className="form-control"
                name="description"
                value={description}
                placeholder="Description"
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
  customerDelivery: state.customerDelivery.customerDelivery,
  loading: state.customerDelivery.loading,
});

PaymentFromDelivery.propTypes = {
  addCustomerPayment: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
  getCurrentCustomerDelivery: PropTypes.func.isRequired,
  customerDeliveries: PropTypes.array.isRequired,
  updateReceivable: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  addCustomerPayment,
  getCustomers,
  getCurrentCustomerDelivery,
  updateReceivable,
})(withRouter(PaymentFromDelivery));
