import React, { useState, useEffect } from "react";
import { getSuppliers, updatePayable } from "../../../_actions/supplierAction";
import { addSupplierPayment } from "../../../_actions/supplierPaymentActions";
import { getCurrentPurchase } from "../../../_actions/purchaseAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PaymentFromPurchase = ({
  addSupplierPayment,
  updatePayable,
  getCurrentPurchase,
  getSuppliers,
  match,
  loading,
  purchase,
  suppliers,
  history,
}) => {
  const [dateType, setDateType] = useState("text");
  const [formData, setFormData] = useState({
    purchase: match.params.id ? match.params.id : null,
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
    getCurrentPurchase(match.params.id);

    setFormData({
      supplier: loading || !purchase.supplier._id ? "" : purchase.supplier._id,
      paymentDate:
        loading || !purchase.purchaseDate ? "" : purchase.purchaseDate,
      paidAmount:
        loading || !purchase.totalPayable ? "" : purchase.totalPayable,
    });
    //eslint-diable-next-line
  }, []);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    addSupplierPayment(formData, history);
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
      <div className="card card-outline-secondary mt-5">
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
              <label>Payment Date</label>
              <input
                type={dateType}
                className="form-control"
                name="paymentDate"
                value={paymentDate}
                placeholder="Select Date"
                onFocus={onFocus}
                onBlur={onBlur}
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label>Paid Amount</label>
              <input
                type="number"
                className="form-control"
                name="paidAmount"
                value={paidAmount}
                placeholder="Paid Amt"
                onChange={(e) => onChangeHandler(e)}
                required
              />
            </div>

            <div className="form-group">
              <label>Balance Amount</label>
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
              <label>Payment Mode</label>
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
              <label>Paid By</label>
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
              <label>Received By</label>
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
              <label>Description</label>
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
  purchase: state.purchase.purchase,
  loading: state.purchase.loading,
});

PaymentFromPurchase.propTypes = {
  addSupplierPayment: PropTypes.func.isRequired,
  getSuppliers: PropTypes.func.isRequired,
  getCurrentPurchase: PropTypes.func.isRequired,
  updatePayable: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  addSupplierPayment,
  getSuppliers,
  getCurrentPurchase,
  updatePayable,
})(withRouter(PaymentFromPurchase));
