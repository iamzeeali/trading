import React, { useState, useEffect } from "react";
import { editItem, getCurrentItem } from "../../_actions/itemActions";
import { getUoms } from "../../_actions/uomAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const EditItem = ({
  editItem,
  getCurrentItem,
  getUoms,
  uoms,
  history,
  match,
  loading,
  item,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    uom: "",
    description: "",
  });

  const { name, uom, description } = formData;

  useEffect(() => {
    getUoms();
    getCurrentItem(match.params.id);
    setFormData({
      name: loading || !item.name ? "" : item.name,
      uom: loading || !item.uom ? "" : item.uom,
      description: loading || !item.description ? "" : item.description,
    });
    //eslint-diable-next-line
  }, []);

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    editItem(formData, history, match.params.id);
  };

  let uomOptions = uoms.map((uom) => (
    <option key={uom._id} value={uom._id}>
      {uom.name}
    </option>
  ));

  return (
    <React.Fragment>
      <h3 className="lead">
        {" "}
        <Link to="/items" className="pr-4">
          <i class="fa fa-arrow-circle-left fa-lg" aria-hidden="true"></i>
        </Link>{" "}
        Add an Item
      </h3>
      <div className="card card-outline-secondary">
        <div className="card-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                placeholder="Item Name"
                required
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <div className="form-label-group">
              <select
                className="form-control"
                name="uom"
                value={uom}
                onChange={(e) => onChangeHandler(e)}
                required
              >
                <option value="" disabled selected hidden>
                  Select UoM
                </option>

                {uomOptions}
              </select>
            </div>

            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                name="description"
                value={description}
                placeholder="Item Description"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>

            <input
              type="submit"
              className="btn btn-success btn-block"
              value="Save"
            />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  uoms: state.uom.uoms,
  item: state.item.item,
  loading: state.item.loading,
});

EditItem.propTypes = {
  editItem: PropTypes.func.isRequired,
  getUoms: PropTypes.func.isRequired,
  getCurrentItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { editItem, getCurrentItem, getUoms })(
  withRouter(EditItem)
);
