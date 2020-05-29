import React, { useEffect } from "react";
import {
  getCustomerEnquiries,
  deleteCustomerEnquiry,
  setCurrentCustomerEnquiry,
} from "../../../_actions/customerEnquiryAction";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../ui/Spinner";
import Moment from "react-moment";

const CustomerEnquiry = ({
  getCustomerEnquiries,
  deleteCustomerEnquiry,
  setCurrentCustomerEnquiry,
  customerEnquiries,
  filtered,
  loading,
  history,
}) => {
  useEffect(() => {
    getCustomerEnquiries();
    //eslint-diable-next-line
  }, []);

  const onDeleteHandler = (id) => {
    deleteCustomerEnquiry(id);
  };

  return (
    <React.Fragment>
      {customerEnquiries !== null && !loading ? (
        <div>
          <h3 className="lead">
            {" "}
            <Link to="/add-customer-enquiry" className="pr-4">
              <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
            </Link>{" "}
            Customer Enquiries
          </h3>
          {filtered !== null
            ? filtered.map((customerEnquiry) => (
                <div className="card promoting-card mb-3">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h4 className="font-weight-bold">
                        {customerEnquiry.customer.name}
                      </h4>
                      <small className="text-muted mb-2">
                        Added on:{" "}
                        <Moment format="DD/MM/YYYY">
                          {customerEnquiry.date}
                        </Moment>{" "}
                      </small>
                      <ul style={{ listStyleType: "none", padding: "0" }}>
                        <li>
                          Item:{" "}
                          {customerEnquiry.item && customerEnquiry.item.name}
                        </li>
                        <li>
                          Quantity:{" "}
                          {customerEnquiry.quantity && customerEnquiry.quantity}{" "}
                          {customerEnquiry.uom.name}
                        </li>
                        <li>
                          Required Date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {customerEnquiry.requiredDate}
                          </Moment>
                        </li>
                        {customerEnquiry.description && (
                          <li>{customerEnquiry.description}</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="card-body">
                    <Link
                      className="btn btn-warning"
                      to={`/del-from-enq/${customerEnquiry._id}`}
                      onClick={() => setCurrentCustomerEnquiry(customerEnquiry)}
                    >
                      Copy to Delivery
                    </Link>

                    <Link
                      to="#!"
                      onClick={() => onDeleteHandler(customerEnquiry._id)}
                    >
                      <i className="fa fa-trash fa-lg text-danger float-right p-1 my-1"></i>
                    </Link>

                    <Link
                      to={`/edit-customer-enquiry/${customerEnquiry._id}`}
                      onClick={() => setCurrentCustomerEnquiry(customerEnquiry)}
                    >
                      <i className="fa fa-edit fa-lg text-primary float-right p-1 my-1 mr-3"></i>
                    </Link>
                  </div>
                </div>
              ))
            : customerEnquiries.map((customerEnquiry) => (
                <div className="card promoting-card mb-3">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h4 className="font-weight-bold">
                        {customerEnquiry.customer.name}
                      </h4>
                      <small className="text-muted mb-2">
                        Added on:{" "}
                        <Moment format="DD/MM/YYYY">
                          {customerEnquiry.date}
                        </Moment>{" "}
                      </small>
                      <ul style={{ listStyleType: "none", padding: "0" }}>
                        <li>
                          Item:{" "}
                          {customerEnquiry.item && customerEnquiry.item.name}
                        </li>
                        <li>
                          Quantity:{" "}
                          {customerEnquiry.quantity && customerEnquiry.quantity}{" "}
                          {customerEnquiry.uom.name}
                        </li>
                        <li>
                          Required Date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {customerEnquiry.requiredDate}
                          </Moment>
                        </li>
                        {customerEnquiry.description && (
                          <li>{customerEnquiry.description}</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="card-body">
                    <Link
                      className="btn btn-warning"
                      to={`/del-from-enq/${customerEnquiry._id}`}
                      onClick={() => setCurrentCustomerEnquiry(customerEnquiry)}
                    >
                      Copy to Delivery
                    </Link>

                    <Link
                      to="#!"
                      onClick={() => onDeleteHandler(customerEnquiry._id)}
                    >
                      <i className="fa fa-trash fa-lg text-danger float-right p-1 my-1"></i>
                    </Link>

                    <Link
                      to={`/edit-customer-enquiry/${customerEnquiry._id}`}
                      onClick={() => setCurrentCustomerEnquiry(customerEnquiry)}
                    >
                      <i className="fa fa-edit fa-lg text-primary float-right p-1 my-1 mr-3"></i>
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

CustomerEnquiry.propTypes = {
  getCustomerEnquiries: PropTypes.func.isRequired,
  deleteCustomerEnquiry: PropTypes.func.isRequired,
  setCurrentCustomerEnquiry: PropTypes.func.isRequired,
  customerEnquiries: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  customerEnquiries: state.customerEnquiry.customerEnquiries,
  customerEnquiry: state.customerEnquiry.customerEnquiry,
  filtered: state.customerEnquiry.filtered,
  loading: state.customerEnquiry.loading,
});
export default connect(mapStateToProps, {
  getCustomerEnquiries,
  deleteCustomerEnquiry,
  setCurrentCustomerEnquiry,
})(CustomerEnquiry);
