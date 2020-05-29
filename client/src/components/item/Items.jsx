import React, { useEffect } from "react";
import {
  getItems,
  deleteItem,
  setCurrentItem,
} from "../../_actions/itemActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../ui/Spinner";
import FilterItems from "./FilterItems";

const Items = ({
  getItems,
  deleteItem,
  setCurrentItem,
  items,
  filtered,
  loading,
}) => {
  useEffect(() => {
    getItems();
    //eslint-diable-next-line
  }, []);

  const onDeleteHandler = (id) => {
    deleteItem(id);
  };

  return (
    <React.Fragment>
      {items !== null && !loading ? (
        <div>
          <h3 className="lead">
            {" "}
            <Link to="/add-item" className="pr-4">
              <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
            </Link>{" "}
            Items
          </h3>
          <FilterItems />
          {filtered !== null
            ? filtered.map((item) => (
                <div class="card promoting-card mb-3">
                  <div class="card-body d-flex flex-row">
                    <div>
                      <h4 class="card-title font-weight-bold mb-2">
                        {item.name}
                      </h4>
                      <p class="card-text">
                        UoM: {item.uom.name && item.uom.name}
                      </p>

                      <p class="card-text">
                        Avilable Qty: {item.quantity && item.quantity}
                      </p>
                      <hr />
                      <p>Description: {item.description && item.description}</p>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="collapse-content">
                      <Link to="#!" onClick={() => onDeleteHandler(item._id)}>
                        <i
                          class="fa fa-trash fa-lg text-danger float-right p-1 my-1"
                          data-toggle="tooltip"
                          data-placement="top"
                        ></i>
                      </Link>

                      <Link
                        data-toggle="tooltip"
                        data-html="true"
                        to={`/edit-item/${item._id}`}
                        onClick={() => setCurrentItem(item)}
                      >
                        <i
                          class="fa fa-edit fa-lg text-primary float-right p-1 my-1 mr-3"
                          data-toggle="tooltip"
                          data-placement="top"
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : items.map((item) => (
                <div class="card promoting-card mb-3">
                  <div class="card-body d-flex flex-row">
                    <div>
                      <h4 class="card-title font-weight-bold mb-2">
                        {item.name}
                      </h4>
                      <p class="card-text">
                        UoM: {item.uom.name && item.uom.name}
                      </p>
                      <p class="card-text">
                        Avilable Qty: {item.quantity && item.quantity}{" "}
                        {item.uom.name}
                      </p>
                      <hr />
                      <p>Description: {item.description && item.description}</p>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="collapse-content">
                      <Link to="#!" onClick={() => onDeleteHandler(item._id)}>
                        <i
                          class="fa fa-trash fa-lg text-danger float-right p-1 my-1"
                          data-toggle="tooltip"
                          data-placement="top"
                        ></i>
                      </Link>

                      <Link
                        data-toggle="tooltip"
                        data-html="true"
                        to={`/edit-item/${item._id}`}
                        onClick={() => setCurrentItem(item)}
                      >
                        <i
                          class="fa fa-edit fa-lg text-primary float-right p-1 my-1 mr-3"
                          data-toggle="tooltip"
                          data-placement="top"
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

Items.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  setCurrentItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.item.items,
  item: state.item.item,
  filtered: state.item.filtered,
  loading: state.item.loading,
});
export default connect(mapStateToProps, {
  getItems,
  deleteItem,
  setCurrentItem,
})(Items);
