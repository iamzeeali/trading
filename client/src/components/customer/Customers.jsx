import React, { useEffect } from "react";
import {
  getCustomers,
  deleteCustomer,
  setCurrentCustomer,
} from "../../_actions/customerAction";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../ui/Spinner";
import FilterCustomers from "./FilterCustomers";

const Customers = ({
  getCustomers,
  deleteCustomer,
  setCurrentCustomer,
  customers,
  filtered,
  loading,
}) => {
  useEffect(() => {
    getCustomers();
    //eslint-diable-next-line
  }, []);

  const onDeleteHandler = (id) => {
    deleteCustomer(id);
  };

  return (
    <React.Fragment>
      {customers !== null && !loading ? (
        <div>
          <h3 className="lead">
            {" "}
            <Link to="/add-customer" className="pr-4">
              <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
            </Link>{" "}
            Customers
          </h3>
          <FilterCustomers />
          {filtered !== null
            ? filtered.map((customer) => (
                <div class="card promoting-card mb-3">
                  <div class="card-body d-flex flex-row">
                    <div>
                      <h4 class="card-title font-weight-bold mb-2">
                        {customer.name}
                      </h4>

                      <h5>
                        Receivable:{" "}
                        <span className="text-success p-2 font-weight-bold">
                          {customer.receivable}{" "}
                        </span>
                      </h5>
                      <p class="card-text my-3">
                        <i class="fa fa-clock-o"> </i> 07/24/2018
                        <br />
                        <i class="fa fa-phone"> </i> {customer.phone1}
                        <br />
                        <i class="fa fa-phone"> </i> {customer.phone2}
                        <br />
                        <i class="fa fa-envelope" aria-hidden="true">
                          {" "}
                        </i>{" "}
                        {customer.email}
                        <br />
                        <i class="fa fa-map-marker" aria-hidden="true"></i>{" "}
                        {customer.address}
                        <hr />
                        Contact Person: {customer.contactPerson}
                        <br />
                        State: {customer.state}
                        <br />
                        City: {customer.city}
                        <br />
                        Bank: {customer.bank}
                        <br />
                        A/C no: {customer.accountNo}
                        <br />
                        Account Holder: {customer.accountHolder}
                        <br />
                        IFSC Code {customer.ifsc}
                        <br />
                        Branch {customer.bankBranch}
                      </p>
                      <hr />
                      <small>Description: {customer.description}</small>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="collapse-content">
                      <Link
                        to="#!"
                        onClick={() => onDeleteHandler(customer._id)}
                      >
                        <i
                          class="fa fa-trash fa-lg text-danger float-right p-1 my-1"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Share this post"
                        ></i>
                      </Link>

                      <Link
                        data-toggle="tooltip"
                        title="Edit"
                        data-html="true"
                        to={`/edit-customer/${customer._id}`}
                        onClick={() => setCurrentCustomer(customer)}
                      >
                        <i
                          class="fa fa-edit fa-lg text-primary float-right p-1 my-1 mr-3"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="I like it"
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : customers.map((customer) => (
                <div class="card promoting-card mb-3">
                  <div class="card-body d-flex flex-row">
                    <div>
                      <h4 class="card-title font-weight-bold mb-2">
                        {customer.name}
                      </h4>
                      <h5>
                        Receivable:{" "}
                        <span className="text-success p-2 font-weight-bold">
                          {customer.receivable}{" "}
                        </span>
                      </h5>

                      <p class="card-text my-3">
                        <i class="fa fa-clock-o"> </i> 07/24/2018
                        <br />
                        <i class="fa fa-phone"> </i> {customer.phone1}
                        <br />
                        <i class="fa fa-phone"> </i> {customer.phone2}
                        <br />
                        <i class="fa fa-envelope" aria-hidden="true">
                          {" "}
                        </i>{" "}
                        {customer.email}
                        <br />
                        <i class="fa fa-map-marker" aria-hidden="true"></i>{" "}
                        {customer.address}
                        <hr />
                        Contact Person: {customer.contactPerson}
                        <br />
                        State: {customer.state}
                        <br />
                        City: {customer.city}
                        <br />
                        Bank: {customer.bank}
                        <br />
                        A/C no: {customer.accountNo}
                        <br />
                        Account Holder: {customer.accountHolder}
                        <br />
                        IFSC Code {customer.ifsc}
                        <br />
                        Branch {customer.bankBranch}
                      </p>
                      <hr />
                      <small>Description: {customer.description}</small>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="collapse-content">
                      <Link
                        to="#!"
                        onClick={() => onDeleteHandler(customer._id)}
                      >
                        <i
                          class="fa fa-trash fa-lg text-danger float-right p-1 my-1"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Share this post"
                        ></i>
                      </Link>

                      <Link
                        data-toggle="tooltip"
                        title="Edit"
                        data-html="true"
                        to={`/edit-customer/${customer._id}`}
                        onClick={() => setCurrentCustomer(customer)}
                      >
                        <i
                          class="fa fa-edit fa-lg text-primary float-right p-1 my-1 mr-3"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="I like it"
                        ></i>
                      </Link>
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

Customers.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired,
  setCurrentCustomer: PropTypes.func.isRequired,
  customers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  customers: state.customer.customers,
  customer: state.customer.customer,
  filtered: state.customer.filtered,
  loading: state.customer.loading,
});
export default connect(mapStateToProps, {
  getCustomers,
  deleteCustomer,
  setCurrentCustomer,
})(Customers);
