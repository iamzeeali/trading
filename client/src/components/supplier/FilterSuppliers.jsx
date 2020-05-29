import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { filterSupplier, clearFilter } from "../../_actions/supplierAction";

const FilterSupplier = ({ filterSupplier, clearFilter, filtered }) => {
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChangeHandler = (e) => {
    if (text.current.value !== null) {
      filterSupplier(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        ref={text}
        type="text"
        className="form-control search-menu"
        placeholder="Search Suppliers..."
        onChange={onChangeHandler}
      />
      <div className="input-group-append">
        <span className="input-group-text">
          <i className="fa fa-search text-dark" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  suppliers: state.supplier.suppliers,
  filtered: state.supplier.filtered,
});

export default connect(mapStateToProps, { filterSupplier, clearFilter })(
  FilterSupplier
);
