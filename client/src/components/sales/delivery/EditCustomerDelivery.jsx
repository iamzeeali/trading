import React, { useState, useEffect } from "react";
import { getItems } from "../../../_actions/itemActions";
import {
  getCustomers,
  updateReceivable,
} from "../../../_actions/customerAction";
import { updateItemQty } from "../../../_actions/itemActions";

import { getUoms } from "../../../_actions/uomAction";
import {
  editCustomerDelivery,
  getCurrentCustomerDelivery,
} from "../../../_actions/customerDeliveryAction";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const DeliveryFromEnquiry = ({
  editCustomerDelivery,
  getItems,
  getCustomers,
  updateItemQty,
  updateReceivable,
  getUoms,
  getCurrentCustomerDelivery,
  items,
  customerDelivery,
  customers,
  uoms,
  history,
  match,
  loading,
}) => {
  const [dateType, setDateType] = useState("text");
  const [formData, setFormData] = useState({
    customer: "",
    item: "",
    quantity: "",
    uom: "",
    deliveryDate: "",
    sellingPrice: "",
    agreedPayDate: "",
    deliveredBy: "",
    receivedBy: "",
    description: "",
  });

  const {
    customer,
    item,
    quantity,
    uom,
    deliveryDate,
    sellingPrice,
    agreedPayDate,
    deliveredBy,
    receivedBy,
    description,
  } = formData;

  useEffect(() => {
    getItems();
    getCustomers();
    getUoms();
    getCurrentCustomerDelivery(match.params.id);
    setFormData({
      quantity:
        loading || !customerDelivery.quantity ? "" : customerDelivery.quantity,
      deliveryDate:
        loading || !customerDelivery.deliveryDate
          ? ""
          : customerDelivery.deliveryDate,

      sellingPrice:
        loading || !customerDelivery.sellingPrice
          ? ""
          : customerDelivery.sellingPrice,

      agreedPayDate:
        loading || !customerDelivery.agreedPayDate
          ? ""
          : customerDelivery.agreedPayDate,

      deliveredBy:
        loading || !customerDelivery.deliveredBy
          ? ""
          : customerDelivery.deliveredBy,

      receivedBy:
        loading || !customerDelivery.receivedBy
          ? ""
          : customerDelivery.receivedBy,

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

    editCustomerDelivery(formData, history, match.params.id);

    let updatedQty = parseInt(quantity) * -1;
    updateItemQty(updatedQty, item);

    updateReceivable(sellingPrice, customer);
  };

  let itemOptions = items.map((item) => (
    <option key={item._id} value={item._id}>
      {item.name}
    </option>
  ));

  let customerOptions = customers.map((customer) => (
    <option key={customer._id} value={customer._id}>
      {customer.name}
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
        <Link to="/customer-delivery" className="pr-4">
          <i class="fa fa-list fa-lg" aria-hidden="true"></i>
        </Link>{" "}
        Add a customer delivery
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

            <div className="form-label-group">
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

            <div className="form-label-group">
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
              <label className="form-control">Quantity</label>

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
              <label className="form-control">Delivery Date</label>
              <input
                type={dateType}
                className="form-control"
                name="deliveryDate"
                value={deliveryDate}
                placeholder="Delivery Date"
                onFocus={onFocus}
                onBlur={onBlur}
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Selling Price</label>
              <input
                type="number"
                className="form-control"
                name="sellingPrice"
                value={sellingPrice}
                placeholder="Selling Price"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Agreed payment date</label>
              <input
                type={dateType}
                className="form-control"
                name="agreedPayDate"
                value={agreedPayDate}
                placeholder="Agreed payment date"
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-group">
              <label className="form-control">Delivered By</label>
              <input
                type="text"
                className="form-control"
                name="deliveredBy"
                value={deliveredBy}
                placeholder="Delivered By"
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
  items: state.item.items,
  customers: state.customer.customers,
  uoms: state.uom.uoms,
  customerDelivery: state.customerDelivery.customerDelivery,
  loading: state.customerDelivery.loading,
});

DeliveryFromEnquiry.propTypes = {
  editCustomerDelivery: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
  getUoms: PropTypes.func.isRequired,
  getCurrentCustomerDelivery: PropTypes.func.isRequired,
  customerEnquiries: PropTypes.array.isRequired,
  updateItemQty: PropTypes.func.isRequired,
  updateReceivable: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  editCustomerDelivery,
  getCustomers,
  getUoms,
  getItems,
  getCurrentCustomerDelivery,
  updateItemQty,
  updateReceivable,
})(withRouter(DeliveryFromEnquiry));
