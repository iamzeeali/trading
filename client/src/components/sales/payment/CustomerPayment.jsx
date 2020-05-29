import React, { useEffect } from "react";
import {
  getCustomerPayments,
  deleteCustomerPayment,
  setCurrentCustomerPayment,
} from "../../../_actions/customerPaymentAction";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../ui/Spinner";
import Moment from "react-moment";

const CustomerPayment = ({
  getCustomerPayments,
  deleteCustomerPayment,
  setCurrentCustomerPayment,
  customerPayments,
  filtered,
  loading,
}) => {
  useEffect(() => {
    getCustomerPayments();
    //eslint-diable-next-line
  }, []);

  const onDeleteHandler = (id) => {
    deleteCustomerPayment(id);
  };

  return (
    <React.Fragment>
      {customerPayments !== null && !loading ? (
        <div>
          <h3 className="lead">
            {" "}
            <Link to="/add-customer-payment" className="pr-4">
              <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
            </Link>{" "}
            Customer Payments
          </h3>
          {filtered !== null
            ? filtered.map((customerPayment) => (
                <div className="card promoting-card mb-3">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h4 className="font-weight-bold">
                        {customerPayment.customer.name}
                      </h4>
                      <small className="text-muted mb-2">
                        Added on:{" "}
                        <Moment format="DD/MM/YYYY">
                          {customerPayment.date}
                        </Moment>{" "}
                      </small>
                      <ul style={{ listStyleType: "none", padding: "0" }}>
                        <li>
                          Payment Date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {customerPayment.paymentDate}
                          </Moment>
                        </li>

                        <li>
                          Payment Mode:{" "}
                          {customerPayment.paymentMode &&
                            customerPayment.paymentMode}
                        </li>

                        <li>
                          Received Amt:{" "}
                          {customerPayment.receivedAmount &&
                            customerPayment.receivedAmount}
                        </li>

                        <li>
                          Balance Amt:{" "}
                          {customerPayment.balanceAmount &&
                            customerPayment.balanceAmount}
                        </li>

                        <li>
                          Agreed pay date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {customerPayment.agreedPayDate}
                          </Moment>
                        </li>

                        <li>
                          Paid by:{" "}
                          {customerPayment.paidBy && customerPayment.paidBy}
                        </li>

                        <li>
                          Received by:{" "}
                          {customerPayment.receivedBy &&
                            customerPayment.receivedBy}
                        </li>

                        {customerPayment.description && (
                          <li>{customerPayment.description}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            : customerPayments.map((customerPayment) => (
                <div className="card promoting-card mb-3">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h4 className="font-weight-bold">
                        {customerPayment.customer.name}
                      </h4>
                      <small className="text-muted mb-2">
                        Added on:{" "}
                        <Moment format="DD/MM/YYYY">
                          {customerPayment.date}
                        </Moment>{" "}
                      </small>
                      <ul style={{ listStyleType: "none", padding: "0" }}>
                        <li>
                          Payment Date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {customerPayment.paymentDate}
                          </Moment>
                        </li>

                        <li>
                          Payment Mode:{" "}
                          {customerPayment.paymentMode &&
                            customerPayment.paymentMode}
                        </li>

                        <li>
                          Received Amt:{" "}
                          {customerPayment.receivedAmount &&
                            customerPayment.receivedAmount}
                        </li>

                        <li>
                          Balance Amt:{" "}
                          {customerPayment.balanceAmount &&
                            customerPayment.balanceAmount}
                        </li>

                        <li>
                          Agreed pay date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {customerPayment.agreedPayDate}
                          </Moment>
                        </li>

                        <li>
                          Paid by:{" "}
                          {customerPayment.paidBy && customerPayment.paidBy}
                        </li>

                        <li>
                          Received by:{" "}
                          {customerPayment.receivedBy &&
                            customerPayment.receivedBy}
                        </li>

                        {customerPayment.description && (
                          <li>{customerPayment.description}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

CustomerPayment.propTypes = {
  getCustomerPayments: PropTypes.func.isRequired,
  deleteCustomerPayment: PropTypes.func.isRequired,
  setCurrentCustomerPayment: PropTypes.func.isRequired,
  customerPayments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  customerPayments: state.customerPayment.customerPayments,
  customerPayment: state.customerPayment.customerPayment,
  filtered: state.customerPayment.filtered,
  loading: state.customerPayment.loading,
});
export default connect(mapStateToProps, {
  getCustomerPayments,
  deleteCustomerPayment,
  setCurrentCustomerPayment,
})(CustomerPayment);
