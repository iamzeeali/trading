import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getTotalPayable } from "../../_actions/supplierAction";
import { getTotalReceivable } from "../../_actions/customerAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../ui/Spinner";

const Dashboard = ({
  getTotalPayable,
  getTotalReceivable,
  payable,
  receivable,
  loading,
}) => {
  useEffect(() => {
    getTotalPayable();
    getTotalReceivable();
    //eslint-diable-next-line
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="dash-top mb-4">
          <h3 className="text-dark mb-3">Dashboard</h3>

          {(payable || receivable) !== null && !loading ? (
            <div className="row">
              <div className="col">
                <div class="card border-success" style={{}}>
                  <div class="card-header">
                    Receivables{" "}
                    <i class="fa fa-get-pocket" aria-hidden="true"></i>{" "}
                  </div>
                  <div class="card-body text-center">
                    {receivable &&
                      receivable.map((rec) => (
                        <p
                          class="card-text lead font-weight-bold"
                          style={{ fontSize: "18px" }}
                        >
                          <i class="fa fa-inr" aria-hidden="true"></i>{" "}
                          {rec.totalReceivable ? rec.totalReceivable : 0}
                        </p>
                      ))}

                    <small className="text-muted">*You will receive</small>
                  </div>
                </div>
              </div>

              <div className="col">
                <div class="card border-danger" style={{}}>
                  <div class="card-header">
                    Paybales{" "}
                    <i class="fa fa-credit-card" aria-hidden="true"></i>
                  </div>
                  <div class="card-body text-center">
                    {payable.map((pay) => (
                      <p
                        class="card-text lead font-weight-bold"
                        style={{ fontSize: "18px" }}
                      >
                        <i class="fa fa-inr" aria-hidden="true"></i>{" "}
                        {pay.totalPayable ? pay.totalPayable : 0}
                      </p>
                    ))}

                    <small className="text-muted">*You will pay</small>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </div>

        <hr />

        <div className="dash-menu my-4">
          <div className="lead text-secondary mb-2">Go to</div>
          <div className="row text-center">
            <div className="col">
              <Link to="/add-purchase">
                <div className="card border-primary pt-3">
                  <i class="fa fa-shopping-cart  fa-lg" aria-hidden="true"></i>
                  <small className="py-2 text-dark">Purchase item</small>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/add-supplier-payment">
                <div className="card border-primary pt-3">
                  <i class="fa fa-credit-card fa-lg" aria-hidden="true"></i>
                  <small className="py-2 text-dark">Supplier payment</small>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/add-customer-delivery">
                <div className="card border-warning pt-3">
                  <i class="fa fa-truck fa-lg" aria-hidden="true"></i>
                  <small className="py-2 text-dark">Deliver an item</small>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/add-customer-payment">
                <div className="card border-warning pt-3">
                  <i class="fa fa-money fa-lg" aria-hidden="true"></i>
                  <small className="py-2 text-dark">Customer Payment</small>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <hr />
        <div className="dash-bottom mt-4">
          <div className="lead text-secondary mb-2">Reports</div>
          <div className="row">
            <div className="col">
              <Link to="/item-stock">
                <div class="card bg-success text-white mb-3" style={{}}>
                  <div class="card-body text-center">
                    <small class="card-text">ITEM STOCKS</small>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Link to="/customer-delivery">
                <div class="card bg-primary text-white mb-3" style={{}}>
                  <div class="card-body text-center">
                    <small class="card-text">CUSTOMER DELIVERIES</small>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/customer-payment">
                <div class="card bg-warning text-white mb-3" style={{}}>
                  <div class="card-body text-center">
                    <small class="card-text">CUSTOMER PAYMENTS</small>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Link to="/purchase">
              <div class="card bg-info text-white mb-3" style={{}}>
                <div class="card-body text-center">
                  <small class="card-text">SUPPLIER PURCHASES</small>
                </div>
              </div>
            </Link>
          </div>

          <div className="col">
            <Link to="/supplier-payment">
              <div class="card bg-info text-white mb-3" style={{}}>
                <div class="card-body text-center">
                  <small class="card-text">SUPPLIER PAYMENTS</small>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  getTotalPayable: PropTypes.func.isRequired,
  getTotalReceivable: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  payable: state.supplier.payable,
  receivable: state.customer.receivable,
  loading: state.supplier.loading,
});
export default connect(mapStateToProps, {
  getTotalPayable,
  getTotalReceivable,
})(Dashboard);
