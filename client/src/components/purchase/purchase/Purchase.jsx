import React, { useEffect } from "react";
import {
  getPurchases,
  deletePurchase,
  setCurrentPurchase,
} from "../../../_actions/purchaseAction";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../ui/Spinner";
import Moment from "react-moment";

const Purchase = ({
  getPurchases,
  deletePurchase,
  setCurrentPurchase,
  purchases,
  filtered,
  loading,
  history,
}) => {
  useEffect(() => {
    getPurchases();
    //eslint-diable-next-line
  }, []);

  const onDeleteHandler = (id) => {
    deletePurchase(id);
  };

  return (
    <React.Fragment>
      {purchases !== null && !loading ? (
        <div>
          <h3 className="lead mb-5">
            {" "}
            <Link to="/add-purchase" className="pr-4">
              <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
            </Link>{" "}
            Purchases
          </h3>
          {filtered !== null
            ? filtered.map((purchase) => (
                <div class="card promoting-card mb-3">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h4 className="font-weight-bold">
                        {purchase.supplier.name}
                      </h4>
                      <small className="text-muted mb-2">
                        Added on:{" "}
                        <Moment format="DD/MM/YYYY">{purchase.date}</Moment>{" "}
                      </small>
                      <ul style={{ listStyleType: "none", padding: "0" }}>
                        <li>Item: {purchase.item && purchase.item.name}</li>
                        <li>
                          Quantity: {purchase.quantity && purchase.quantity}{" "}
                          {purchase.uom.name}
                        </li>
                        <li>
                          Purchase Date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {purchase.purchaseDate}
                          </Moment>
                        </li>

                        <li>
                          Purchase Price:{" "}
                          {purchase.purchasePrice && purchase.purchasePrice}
                        </li>

                        <li>
                          Freight Charge:{" "}
                          {purchase.freightCharge && purchase.freightCharge}
                        </li>

                        <li>
                          Handling Charge:{" "}
                          {purchase.handlingCharge && purchase.handlingCharge}
                        </li>

                        <li>
                          Purchased by:{" "}
                          {purchase.purchasedBy && purchase.purchasedBy}
                        </li>

                        <li>
                          Total Payable:{" "}
                          {purchase.totalPayable && purchase.totalPayable}
                        </li>

                        <li>
                          Advance Payment:{" "}
                          {purchase.advancePayment && purchase.advancePayment}
                        </li>

                        {purchase.description && (
                          <li>Description: {purchase.description}</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="card-body">
                    <Link
                      className="btn btn-warning"
                      to={`/pay-from-pur/${purchase._id}`}
                      onClick={() => setCurrentPurchase(purchase)}
                    >
                      Copy to Payment
                    </Link>
                  </div>
                </div>
              ))
            : purchases.map((purchase) => (
                <div className="card promoting-card mb-3">
                  <div className="card-body d-flex flex-row">
                    <div>
                      <h4 className="font-weight-bold">
                        {purchase.supplier.name}
                      </h4>
                      <small className="text-muted mb-2">
                        Added on:{" "}
                        <Moment format="DD/MM/YYYY">{purchase.date}</Moment>{" "}
                      </small>
                      <ul style={{ listStyleType: "none", padding: "0" }}>
                        <li>Item: {purchase.item && purchase.item.name}</li>
                        <li className="text-info font-weight-bold">
                          Quantity: {purchase.quantity && purchase.quantity}{" "}
                          {purchase.uom.name}
                        </li>
                        <li>
                          Purchase Date:{" "}
                          <Moment format="DD/MM/YYYY">
                            {purchase.purchaseDate}
                          </Moment>
                        </li>

                        <li>
                          Purchase Price:{" "}
                          {purchase.purchasePrice && purchase.purchasePrice}
                        </li>

                        <li>
                          Freight Charge:{" "}
                          {purchase.freightCharge && purchase.freightCharge}
                        </li>

                        <li>
                          Handling Charge:{" "}
                          {purchase.handlingCharge && purchase.handlingCharge}
                        </li>

                        <li>
                          Purchased by:{" "}
                          {purchase.purchasedBy && purchase.purchasedBy}
                        </li>

                        <li className="text-danger font-weight-bold">
                          Total Payable:{" "}
                          {purchase.totalPayable && purchase.totalPayable}
                        </li>

                        <li className="text-primary font-weight-bold">
                          Advance Payment:{" "}
                          {purchase.advancePayment && purchase.advancePayment}
                        </li>

                        {purchase.description && (
                          <li>Description: {purchase.description}</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="card-body">
                    <Link
                      className="btn btn-warning"
                      to={`/pay-from-pur/${purchase._id}`}
                      onClick={() => setCurrentPurchase(purchase)}
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

Purchase.propTypes = {
  getPurchases: PropTypes.func.isRequired,
  deletePurchase: PropTypes.func.isRequired,
  setCurrentPurchase: PropTypes.func.isRequired,
  purchases: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  purchases: state.purchase.purchases,
  purchase: state.purchase.purchase,
  filtered: state.purchase.filtered,
  loading: state.purchase.loading,
});
export default connect(mapStateToProps, {
  getPurchases,
  deletePurchase,
  setCurrentPurchase,
})(Purchase);
