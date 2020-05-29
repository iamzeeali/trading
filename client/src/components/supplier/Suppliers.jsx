import React, { useEffect } from "react";
import {
  getSuppliers,
  deleteSupplier,
  setCurrentSupplier,
} from "../../_actions/supplierAction";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../ui/Spinner";
import Filtersuppliers from "./FilterSuppliers";

const Suppliers = ({
  getSuppliers,
  deleteSupplier,
  setCurrentSupplier,
  suppliers,
  filtered,
  loading,
}) => {
  useEffect(() => {
    getSuppliers();
    //eslint-diable-next-line
  }, []);

  const onDeleteHandler = (id) => {
    deleteSupplier(id);
  };

  return (
    <React.Fragment>
      {suppliers !== null && !loading ? (
        <div>
          <h3 className="lead">
            <Link to="/add-supplier" className="pr-4">
              <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
            </Link>{" "}
            Suppliers
          </h3>
          <Filtersuppliers />
          {filtered !== null
            ? filtered.map((supplier) => (
                <div class="card promoting-card mb-3">
                  <div class="card-body d-flex flex-row">
                    <div>
                      <h4 class="card-title font-weight-bold mb-2">
                        {supplier.name}
                      </h4>
                      <h5>
                        Payable:{" "}
                        <span className="text-danger p-2 font-weight-bold">
                          {supplier.payable}{" "}
                        </span>
                      </h5>
                      <p class="card-text my-3">
                        <i class="fa fa-clock-o"> </i> 07/24/2018
                        <br />
                        <i class="fa fa-phone"> </i> {supplier.phone1}
                        <br />
                        <i class="fa fa-phone"> </i> {supplier.phone2}
                        <br />
                        <i class="fa fa-envelope" aria-hidden="true">
                          {" "}
                        </i>{" "}
                        {supplier.email}
                        <br />
                        <i class="fa fa-map-marker" aria-hidden="true"></i>{" "}
                        {supplier.address}
                        <hr />
                        <br /> {supplier.contactPerson}
                        <br /> {supplier.state}
                        <br /> {supplier.city}
                        <br /> {supplier.bank}
                        <br /> {supplier.accountNo}
                        <br /> {supplier.accountHolder}
                        <br /> {supplier.ifsc}
                        <br /> {supplier.bankBranch}
                        <br /> {supplier.payable}
                      </p>
                      <hr />
                      <small>Description: {supplier.description}</small>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="collapse-content">
                      <Link
                        to="#!"
                        onClick={() => onDeleteHandler(supplier._id)}
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
                        to={`/edit-supplier/${supplier._id}`}
                        onClick={() => setCurrentSupplier(supplier)}
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
            : suppliers.map((supplier) => (
                <div class="card promoting-card mb-3">
                  <div class="card-body d-flex flex-row">
                    <div>
                      <h4 class="card-title font-weight-bold mb-2">
                        {supplier.name}
                      </h4>

                      <h5>
                        Payable:{" "}
                        <span className="text-danger p-2 font-weight-bold">
                          {supplier.payable}{" "}
                        </span>
                      </h5>

                      <p class="card-text my-3">
                        <i class="fa fa-clock-o"> </i> 07/24/2018
                        <br />
                        <i class="fa fa-phone"> </i> {supplier.phone1}
                        <br />
                        <i class="fa fa-phone"> </i> {supplier.phone2}
                        <br />
                        <i class="fa fa-envelope" aria-hidden="true">
                          {" "}
                        </i>{" "}
                        {supplier.email}
                        <br />
                        <i class="fa fa-map-marker" aria-hidden="true"></i>{" "}
                        {supplier.address}
                        <hr />
                        Contact Person: {supplier.contactPerson}
                        <br /> State: {supplier.state}
                        <br /> City {supplier.city}
                        <br />
                        Bank: {supplier.bank}
                        <br />
                        A/C no: {supplier.accountNo}
                        <br />
                        Account Holder: {supplier.accountHolder}
                        <br />
                        IFSC Code: {supplier.ifsc}
                        <br />
                        Branch: {supplier.bankBranch}
                        <br />
                      </p>
                      <hr />

                      <small>Description: {supplier.description}</small>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="collapse-content">
                      <Link
                        to="#!"
                        onClick={() => onDeleteHandler(supplier._id)}
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
                        to={`/edit-supplier/${supplier._id}`}
                        onClick={() => setCurrentSupplier(supplier)}
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

Suppliers.propTypes = {
  getSuppliers: PropTypes.func.isRequired,
  deleteSupplier: PropTypes.func.isRequired,
  setCurrentSupplier: PropTypes.func.isRequired,
  suppliers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  suppliers: state.supplier.suppliers,
  supplier: state.supplier.supplier,
  filtered: state.supplier.filtered,
  loading: state.supplier.loading,
});
export default connect(mapStateToProps, {
  getSuppliers,
  deleteSupplier,
  setCurrentSupplier,
})(Suppliers);
