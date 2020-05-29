import React, { useEffect } from "react";
import {
  getCustomerDeliveries,
  deleteCustomerDelivery,
  setCurrentCustomerDelivery,
} from "../../../_actions/customerDeliveryAction";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../ui/Spinner";
import Moment from "react-moment";

const CustomerDelivery = ({
  getCustomerDeliveries,
  deleteCustomerDelivery,
  setCurrentCustomerDelivery,
  customerDeliveries,
  filtered,
  loading,
  history,
}) => {
  useEffect(() => {
    getCustomerDeliveries();
    //eslint-diable-next-line
  }, []);

  const onDeleteHandler = (id) => {
    deleteCustomerDelivery(id);
  };

  return (
    <React.Fragment>
      {customerDeliveries !== null && !loading ? (
        <div>
          <h3 className="lead">
            {" "}
            <Link to="/add-customer-delivery" className="pr-4">
              <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
            </Link>{" "}
            Customer Deliveries
          </h3>
          {filtered !== null
            ? filtered.map((customerDelivery) => (
                <div className="card promoting-card mb-3">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h4 className="font-weight-bold">
                        {customerDelivery.customer.name}
                      </h4>
                      <small className="text-muted mb-2">
                        Added on:{" "}
                        <Moment format="DD/MM/YYYY">
                          {customerDelivery.date}
                        </Moment>{" "}
                      </small>
                      <ul style={{ listStyleType: "none", padding: "0" }}>
                        <li>
                          Item:{" "}
                          {customerDelivery.item && customerDelivery.item.name}
                        </li>
                        <li>
                          Quantity:{" "}
                          {customerDelivery.quantity &&
                            customerDelivery.quantity}{" "}
                          {customerDelivery.uom.name}
                        </li>
                        <li>
                          Delivery Date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {customerDelivery.requiredDate}
                          </Moment>
                        </li>

                        <li>
                          Selling Price:{" "}
                          {customerDelivery.sellingPrice &&
                            customerDelivery.sellingPrice}
                        </li>

                        <li>
                          Agreed Pay Date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {customerDelivery.agreedPayDate}
                          </Moment>
                        </li>

                        <li>
                          Delivered by:{" "}
                          {customerDelivery.deliveredBy &&
                            customerDelivery.deliveredBy}
                        </li>

                        <li>
                          Received by:{" "}
                          {customerDelivery.receivedBy &&
                            customerDelivery.receivedBy}
                        </li>

                        {customerDelivery.description && (
                          <li>Description: {customerDelivery.description}</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="card-body">
                    <Link
                      className="btn btn-warning"
                      to={`/pay-from-del/${customerDelivery._id}`}
                      onClick={() =>
                        setCurrentCustomerDelivery(customerDelivery)
                      }
                    >
                      Copy to Payment
                    </Link>
                  </div>
                </div>
              ))
            : customerDeliveries.map((customerDelivery) => (
                <div className="card promoting-card mb-3">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h4 className="font-weight-bold">
                        {customerDelivery.customer.name}
                      </h4>
                      <small className="text-muted mb-2">
                        Added on:{" "}
                        <Moment format="DD/MM/YYYY">
                          {customerDelivery.date}
                        </Moment>{" "}
                      </small>
                      <ul style={{ listStyleType: "none", padding: "0" }}>
                        <li>
                          Item:{" "}
                          {customerDelivery.item && customerDelivery.item.name}
                        </li>
                        <li>
                          Quantity:{" "}
                          {customerDelivery.quantity &&
                            customerDelivery.quantity}{" "}
                          {customerDelivery.uom.name}
                        </li>
                        <li>
                          Delivery Date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {customerDelivery.requiredDate}
                          </Moment>
                        </li>

                        <li>
                          Selling Price:{" "}
                          {customerDelivery.sellingPrice &&
                            customerDelivery.sellingPrice}
                        </li>

                        <li>
                          Agreed Pay Date:{" "}
                          {customerDelivery.agreedPayDate && (
                            <Moment format="DD/MM/YYYY">
                              {customerDelivery.agreedPayDate}
                            </Moment>
                          )}
                        </li>

                        <li>
                          Delivered by:{" "}
                          {customerDelivery.deliveredBy &&
                            customerDelivery.deliveredBy}
                        </li>

                        <li>
                          Received by:{" "}
                          {customerDelivery.receivedBy &&
                            customerDelivery.receivedBy}
                        </li>

                        {customerDelivery.description && (
                          <li>Description: {customerDelivery.description}</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="card-body">
                    <Link
                      className="btn btn-warning"
                      to={`/pay-from-del/${customerDelivery._id}`}
                      onClick={() =>
                        setCurrentCustomerDelivery(customerDelivery)
                      }
                    >
                      Copy to Payment
                    </Link>
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

CustomerDelivery.propTypes = {
  getCustomerDeliveries: PropTypes.func.isRequired,
  deleteCustomerDelivery: PropTypes.func.isRequired,
  setCurrentCustomerDelivery: PropTypes.func.isRequired,
  customerDeliveries: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  customerDeliveries: state.customerDelivery.customerDeliveries,
  customerDelivery: state.customerDelivery.customerDelivery,
  filtered: state.customerDelivery.filtered,
  loading: state.customerDelivery.loading,
});
export default connect(mapStateToProps, {
  getCustomerDeliveries,
  deleteCustomerDelivery,
  setCurrentCustomerDelivery,
})(CustomerDelivery);
