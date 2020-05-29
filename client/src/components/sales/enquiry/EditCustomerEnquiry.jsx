import React, { useState, useEffect } from "react";
import { getItems } from "../../../_actions/itemActions";
import { getCustomers } from "../../../_actions/customerAction";
import { getUoms } from "../../../_actions/uomAction";
import {
  editCustomerEnquiry,
  getCurrentCustomerEnquiry,
} from "../../../_actions/customerEnquiryAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const EditCustomerEnquiry = ({
  editCustomerEnquiry,
  getCurrentCustomerEnquiry,
  customerEnquiry,
  getItems,
  getCustomers,
  getUoms,
  items,
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
    requiredDate: "",
    description: "",
  });

  const { customer, item, quantity, uom, requiredDate, description } = formData;

  useEffect(() => {
    getItems();
    getCustomers();
    getUoms();
    getCurrentCustomerEnquiry(match.params.id);

    setFormData({
      quantity:
        loading || !customerEnquiry.quantity ? "" : customerEnquiry.quantity,
      requiredDate:
        loading || !customerEnquiry.requiredDate
          ? ""
          : customerEnquiry.requiredDate,

      description:
        loading || !customerEnquiry.description
          ? ""
          : customerEnquiry.description,
    });
    //eslint-diable-next-line
  }, []);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    editCustomerEnquiry(formData, history, match.params.id);
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
        <Link to="/customer-enquiry" className="pr-4">
          <i class="fa fa-list fa-lg" aria-hidden="true"></i>
        </Link>{" "}
        Add a customer enquiry
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
                <option value={customerEnquiry.customer._id}>
                  {customerEnquiry.customer.name}
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
                <option value={customerEnquiry.item._id}>
                  {customerEnquiry.item.name}
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
                <option value={customerEnquiry.uom._id}>
                  {customerEnquiry.uom.name}
                </option>

                {uomOptions}
              </select>
            </div>

            <div className="form-group">
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
              <input
                type={dateType}
                className="form-control"
                name="requiredDate"
                value={requiredDate}
                placeholder="Required Date"
                onFocus={onFocus}
                onBlur={onBlur}
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
                placeholder="Enquiry Description"
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
  customerEnquiry: state.customerEnquiry.customerEnquiry,
  loading: state.customerEnquiry.loading,
});

EditCustomerEnquiry.propTypes = {
  editCustomerEnquiry: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
  getUoms: PropTypes.func.isRequired,
  getCurrentCustomerEnquiry: PropTypes.func.isRequired,
  customerEnquiry: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  editCustomerEnquiry,
  getCustomers,
  getUoms,
  getItems,
  getCurrentCustomerEnquiry,
})(withRouter(EditCustomerEnquiry));
