import React, { useState, useEffect } from "react";
import { getItems } from "../../../_actions/itemActions";
import { getSuppliers, updatePayable } from "../../../_actions/supplierAction";
import { updateItemQty } from "../../../_actions/itemActions";
import { getUoms } from "../../../_actions/uomAction";
import { addPurchase } from "../../../_actions/purchaseAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AddPurchase = ({
  addPurchase,
  updateItemQty,
  updatePayable,
  getItems,
  getSuppliers,
  getUoms,
  items,
  suppliers,
  uoms,
  history,
}) => {
  const [dateType, setDateType] = useState("text");

  const [formData, setFormData] = useState({
    purchaseDate: "",
    supplier: "",
    item: "",
    quantity: "",
    uom: "",
    purchasePrice: null,
    freightCharge: null,
    handlingCharge: null,
    purchasedBy: "",
    totalPayable: null,
    advancePayment: "",
    description: "",
  });

  let {
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
    //eslint-diable-next-line
  }, []);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    addPurchase(formData, history);

    updateItemQty(quantity, item);
    let totalPay = parseInt(totalPayable);
    updatePayable(totalPay, supplier);
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

  const onChangeTotalPay = (e) => {
    let totalPay =
      parseInt(purchasePrice) +
      parseInt(freightCharge) +
      parseInt(handlingCharge);

    setFormData({
      ...formData,
      totalPayable: totalPay,
    });
  };

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
        Add an item purchase
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
              <label className="form-control">Purchase Date</label>

              <input
                type={dateType}
                className="form-control"
                name="purchaseDate"
                value={purchaseDate}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder="Choose date"
                required
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
              <label className="form-control">Total Payable Amt</label>
              <input
                type="number"
                className="form-control"
                value={totalPayable}
                placeholder="Total payable"
                onFocus={(e) => onChangeTotalPay(e)}
                required
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
});

AddPurchase.propTypes = {
  addPurchase: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  getSuppliers: PropTypes.func.isRequired,
  getUoms: PropTypes.func.isRequired,
  updateItemQty: PropTypes.func.isRequired,
  updatePayable: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  addPurchase,
  getSuppliers,
  getUoms,
  getItems,
  updateItemQty,
  updatePayable,
})(withRouter(AddPurchase));
