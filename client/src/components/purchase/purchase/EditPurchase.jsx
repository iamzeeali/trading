import React, { useState, useEffect } from "react";
import { getItems } from "../../../_actions/itemActions";
import { getSuppliers, updatePayable } from "../../../_actions/supplierAction";
import { updateItemQty } from "../../../_actions/itemActions";

import { getUoms } from "../../../_actions/uomAction";
import {
  editPurchase,
  getCurrentPurchase,
} from "../../../_actions/purchaseAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const EditPurchase = ({
  editPurchase,
  updateItemQty,
  updatePayable,
  getItems,
  getSuppliers,
  getUoms,
  items,
  purchase,
  loading,
  suppliers,
  uoms,
  history,
  match,
}) => {
  const [dateType, setDateType] = useState("text");

  const [formData, setFormData] = useState({
    purchaseDate: "",
    supplier: "",
    item: "",
    quantity: "",
    uom: "",
    purchasePrice: "",
    freightCharge: "",
    handlingCharge: "",
    purchasedBy: "",
    totalPayable: "",
    advancePayment: "",
    description: "",
  });

  const {
    purchaseDate,
    supplier,
    item,
    quantity,
    uom,
    purchasePrice,
    freightCharge,
    handlingCharge,
    purchasedBy,
    totalPayable,
    advancePayment,
    description,
  } = formData;

  useEffect(() => {
    getItems();
    getSuppliers();
    getUoms();
    getCurrentPurchase(match.params.id);
    setFormData({
      purchaseDate:
        loading || !purchase.purchaseDate ? "" : purchase.purchaseDate,
      supplier: loading || !purchase.supplier ? "" : purchase.supplier,

      item: loading || !purchase.item ? "" : purchase.item,
      quantity: loading || !purchase.quantity ? "" : purchase.quantity,
      uom: loading || !purchase.uom ? "" : purchase.uom,
      purchasePrice:
        loading || !purchase.purchasePrice ? "" : purchase.purchasePrice,

      freightCharge:
        loading || !purchase.freightCharge ? "" : purchase.freightCharge,

      handlingCharge:
        loading || !purchase.handlingCharge ? "" : purchase.handlingCharge,
      purchasedBy: loading || !purchase.purchasedBy ? "" : purchase.purchasedBy,

      totalPayable:
        loading || !purchase.totalPayable ? "" : purchase.totalPayable,
      advancePayment:
        loading || !purchase.advancePayment ? "" : purchase.advancePayment,

      description: loading || !purchase.description ? "" : purchase.description,
    });
    //eslint-diable-next-line
  }, []);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    editPurchase(formData, history, match.params.id);

    updateItemQty(quantity, item);
    updatePayable(totalPayable, supplier);
  };

  let itemOptions = items.map((item) => (
    <option key={item._id} value={item._id}>
      {item.name}
    </option>
  ));

  let supplierOptions = suppliers.map((supplier) => (
    <option key={supplier._id} value={supplier._id}>
      {supplier.name}
    </option>
  ));

  let uomOptions = uoms.map((uom) => (
    <option key={uom._id} value={uom._id}>
      {uom.name}- {uom.size}
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
        <Link to="/purchase" className="pr-4">
          <i class="fa fa-list fa-lg" aria-hidden="true"></i>
        </Link>{" "}
        Edit a purchase
      </h3>
      <div className="card card-outline-secondary my-5">
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
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
              <select
                className="form-control"
                name="item"
                value={item}
                onChange={(e) => onChangeHandler(e)}
                required
              >
                <option value="" disabled selected hidden>
                  Select Item
                </option>

                {itemOptions}
              </select>
            </div>

            <div className="form-group">
              <select
                className="form-control"
                name="uom"
                value={uom}
                onChange={(e) => onChangeHandler(e)}
                required
              >
                <option value="" disabled selected hidden>
                  Select UoM
                </option>

                {uomOptions}
              </select>
            </div>

            <div className="form-group">
              <label className="form-control">Item Quanity</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                value={quantity}
                placeholder="Quantity"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Purchase Date : </label>

              <input
                type={dateType}
                className="form-control"
                name="purchaseDate"
                value={purchaseDate}
                onFocus={onFocus}
                onBlur={onBlur}
                required
                placeholder="Purchase Date"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Purchase Price</label>
              <input
                type="number"
                className="form-control"
                name="purchasePrice"
                value={purchasePrice}
                placeholder="Purchase Price"
                onChange={(e) => onChangeHandler(e)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-control">Freight Charge</label>
              <input
                type="number"
                className="form-control"
                name="freightCharge"
                value={freightCharge}
                placeholder="Freight charge"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Handling Charge</label>
              <input
                type="number"
                className="form-control"
                name="handlingCharge"
                value={handlingCharge}
                placeholder="Handling Charge"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Purchased By</label>
              <input
                type="text"
                className="form-control"
                name="purchasedBy"
                value={purchasedBy}
                placeholder="Puchased By"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Total Payable Amt</label>
              <input
                type="number"
                className="form-control"
                name="totalPayable"
                value={totalPayable}
                placeholder="Total payable"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Advance Payment Amt</label>
              <input
                type="number"
                className="form-control"
                name="advancePayment"
                value={advancePayment}
                placeholder="Advanced Payment"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Purchase Description</label>

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
  items: state.item.items,
  suppliers: state.supplier.suppliers,
  uoms: state.uom.uoms,
  purchase: state.purchase.purchase,
  loading: state.purchase.loading,
});

EditPurchase.propTypes = {
  editPurchase: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  getSuppliers: PropTypes.func.isRequired,
  getUoms: PropTypes.func.isRequired,
  getCurrentPurchase: PropTypes.func.isRequired,
  updateItemQty: PropTypes.func.isRequired,
  updatePayable: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  editPurchase,
  getSuppliers,
  getUoms,
  getItems,
  getCurrentPurchase,
  updateItemQty,
  updatePayable,
})(withRouter(EditPurchase));
