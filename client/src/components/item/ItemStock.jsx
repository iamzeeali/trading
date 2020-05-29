import React, { useEffect } from "react";
import { getItems } from "../../_actions/itemActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../ui/Spinner";
import FilterItems from "./FilterItems";

const ItemStock = ({ getItems, items, loading }) => {
  useEffect(() => {
    getItems();
    //eslint-diable-next-line
  }, []);

  return (
    <React.Fragment>
      {items !== null && !loading ? (
        <div>
          <h3 className="lead mb-5">
            {" "}
            <Link to="/items" className="pr-4">
              <i class="fa fa-list fa-lg" aria-hidden="true"></i>
            </Link>{" "}
            <Link to="/add-item" className="pr-4">
              <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
            </Link>{" "}
            <br />
            <br />
            Item Stock
          </h3>
          {items.map((item) => (
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                {item.name}
                <span class="badge badge-primary badge-pill p-2">
                  {item.quantity} {item.uom.name}
                </span>
              </li>
            </ul>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

ItemStock.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.item.items,
  loading: state.item.loading,
});
export default connect(mapStateToProps, {
  getItems,
})(ItemStock);
