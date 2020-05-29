import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { filterItem, clearFilter } from "../../_actions/itemActions";

const FilterItems = ({ filterItem, clearFilter, filtered }) => {
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChangeHandler = (e) => {
    if (text.current.value !== null) {
      filterItem(e.target.value);
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
        placeholder="Search Items..."
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
  items: state.item.items,
  filtered: state.item.filtered,
});

export default connect(mapStateToProps, { filterItem, clearFilter })(
  FilterItems
);
