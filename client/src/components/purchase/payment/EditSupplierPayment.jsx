import React, { useState, useEffect } from "react";
import { getSuppliers, updatePayable } from "../../../_actions/supplierAction";
import {
  editSupplierPayment,
  getCurrentSupplierPayment,
} from "../../../_actions/supplierPaymentActions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const EditSupplierPayment = ({
  editSupplierPayment,
  updatePayable,
  getSuppliers,
  match,
  loading,
  supplierPayment,
  suppliers,
  history,
}) => {
  const [dateType, setDateType] = useState("text");
  const [formData, setFormData] = useState({
    supplier: "",
    paymentDate: "",
    paidAmount: "",
    balanceAmount: "",
    paymentMode: "",
    paidBy: "",
    receivedBy: "",
    description: "",
  });

  const {
    supplier,
    paymentDate,
    paymentMode,
    paidAmount,
    balanceAmount,
    paidBy,
    receivedBy,
    description,
  } = formData;

  useEffect(() => {
    getSuppliers();
    getCurrentSupplierPayment(match.params.id);

    setFormData({
      paymentDate:
        loading || !supplierPayment.paymentDate
          ? ""
          : supplierPayment.paymentDate,
      supplier:
        loading || !supplierPayment.supplier ? "" : supplierPayment.supplier,

      paymentMode:
        loading || !supplierPayment.paymentMode
          ? ""
          : supplierPayment.paymentMode,

      paidAmount:
        loading || !supplierPayment.paidAmount
          ? ""
          : supplierPayment.paidAmount,

      balanceAmount:
        loading || !supplierPayment.balanceAmount
          ? ""
          : supplierPayment.balanceAmount,

      paidBy: loading || !supplierPayment.paidBy ? "" : supplierPayment.paidBy,

      receivedBy:
        loading || !supplierPayment.receivedBy
          ? ""
          : supplierPayment.receivedBy,

      description:
        loading || !supplierPayment.description
          ? ""
          : supplierPayment.description,
    });
    //eslint-diable-next-line
  }, []);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    editSupplierPayment(formData, history, match.params.id);

    let updatedPayble = parseInt(paidAmount) * -1;
    updatePayable(updatedPayble, supplier);
  };

  let supplierOptions = suppliers.map((supplier) => (
    <option key={supplier._id} value={supplier._id}>
      {supplier.name}
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
        <Link to="/supplier-payment" className="pr-4">
          <i class="fa fa-list fa-lg" aria-hidden="true"></i>
        </Link>{" "}
        Add a supplier payment
      </h3>
      <div className="card card-outline-secondary">
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-label-group">
              <select
                className="form-control"
                name="supplier"
                value={supplier}
                onChange={(e) => onChangeHandler(e)}
                required
              >
                <option value="" disabled selected hidden>
                  Select supplier
                </option>

                {supplierOptions}
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
                name="paidAmount"
                value={paidAmount}
                placeholder="Paid Amt"
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
  suppliers: state.supplier.suppliers,
  supplierPayment: state.supplierPayment.supplierPayment,
  loading: state.supplierPayment.loading,
});

EditSupplierPayment.propTypes = {
  editSupplierPayment: PropTypes.func.isRequired,
  getSuppliers: PropTypes.func.isRequired,
  getCurrentSupplierPayment: PropTypes.func.isRequired,
  updatePayable: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  editSupplierPayment,
  getSuppliers,
  getCurrentSupplierPayment,
  updatePayable,
})(withRouter(EditSupplierPayment));
