import React, { useEffect } from "react";
import {
  getSupplierPayments,
  deleteSupplierPayment,
  setCurrentSupplierPayment,
} from "../../../_actions/supplierPaymentActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../ui/Spinner";
import Moment from "react-moment";

const SupplierPayment = ({
  getSupplierPayments,
  deleteSupplierPayment,
  setCurrentSupplierPayment,
  supplierPayments,
  filtered,
  loading,
}) => {
  useEffect(() => {
    getSupplierPayments();
    //eslint-diable-next-line
  }, []);

  const onDeleteHandler = (id) => {
    deleteSupplierPayment(id);
  };

  return (
    <React.Fragment>
      {supplierPayments !== null && !loading ? (
        <div>
          <h3 className="lead">
            {" "}
            <Link to="/add-supplier-payment" className="pr-4">
              <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
            </Link>{" "}
            Supplier Payments
          </h3>
          {filtered !== null
            ? filtered.map((supplierPayment) => (
                <div className="card promoting-card mb-3">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h4 className="font-weight-bold">
                        {supplierPayment.customer.name}
                      </h4>
                      <small className="text-muted mb-2">
                        Added on:{" "}
                        <Moment format="DD/MM/YYYY">
                          {supplierPayment.date}
                        </Moment>{" "}
                      </small>
                      <ul style={{ listStyleType: "none", padding: "0" }}>
                        <li>
                          Payment Date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {supplierPayment.paymentDate}
                          </Moment>
                        </li>

                        <li>
                          Payment Mode:{" "}
                          {supplierPayment.paymentMode &&
                            supplierPayment.paymentMode}
                        </li>

                        <li>
                          Received Amt:{" "}
                          {supplierPayment.paidAmount &&
                            supplierPayment.paidAmount}
                        </li>

                        <li>
                          Balance Amt:{" "}
                          {supplierPayment.balanceAmount &&
                            supplierPayment.balanceAmount}
                        </li>

                        <li>
                          Agreed pay date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {supplierPayment.agreedPayDate}
                          </Moment>
                        </li>

                        <li>
                          Paid by:{" "}
                          {supplierPayment.paidBy && supplierPayment.paidBy}
                        </li>

                        <li>
                          Received by:{" "}
                          {supplierPayment.receivedBy &&
                            supplierPayment.receivedBy}
                        </li>

                        {supplierPayment.description && (
                          <li>{supplierPayment.description}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            : supplierPayments.map((supplierPayment) => (
                <div className="card promoting-card mb-3">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h4 className="font-weight-bold">
                        {supplierPayment.supplier.name}
                      </h4>
                      <small className="text-muted mb-2">
                        Added on:{" "}
                        <Moment format="DD/MM/YYYY">
                          {supplierPayment.date}
                        </Moment>{" "}
                      </small>
                      <ul style={{ listStyleType: "none", padding: "0" }}>
                        <li>
                          Payment Date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {supplierPayment.paymentDate}
                          </Moment>
                        </li>

                        <li>
                          Payment Mode:{" "}
                          {supplierPayment.paymentMode &&
                            supplierPayment.paymentMode}
                        </li>

                        <li>
                          Paid Amt:{" "}
                          {supplierPayment.paidAmount &&
                            supplierPayment.paidAmount}
                        </li>

                        <li>
                          Balance Amt:{" "}
                          {supplierPayment.balanceAmount &&
                            supplierPayment.balanceAmount}
                        </li>

                        <li>
                          Agreed pay date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {supplierPayment.agreedPayDate}
                          </Moment>
                        </li>

                        <li>
                          Paid by:{" "}
                          {supplierPayment.paidBy && supplierPayment.paidBy}
                        </li>

                        <li>
                          Received by:{" "}
                          {supplierPayment.receivedBy &&
                            supplierPayment.receivedBy}
                        </li>

                        {supplierPayment.description && (
                          <li>{supplierPayment.description}</li>
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

SupplierPayment.propTypes = {
  getSupplierPayments: PropTypes.func.isRequired,
  deleteSupplierPayment: PropTypes.func.isRequired,
  setCurrentSupplierPayment: PropTypes.func.isRequired,
  supplierPayments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  supplierPayments: state.supplierPayment.supplierPayments,
  supplierPayment: state.supplierPayment.supplierPayment,
  filtered: state.supplierPayment.filtered,
  loading: state.supplierPayment.loading,
});
export default connect(mapStateToProps, {
  getSupplierPayments,
  deleteSupplierPayment,
  setCurrentSupplierPayment,
})(SupplierPayment);
