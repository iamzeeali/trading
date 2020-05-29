import React, { useEffect } from "react";
import { getUoms, deleteUom, setCurrentUom } from "../../_actions/uomAction";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../ui/Spinner";

const Uoms = ({
  getUoms,
  deleteUom,
  setCurrentUom,
  uoms,
  filtered,
  loading,
}) => {
  useEffect(() => {
    getUoms();
    //eslint-diable-next-line
  }, []);

  const onDeleteHandler = (id) => {
    deleteUom(id);
  };

  return (
    <React.Fragment>
      {uoms !== null && !loading ? (
        <div>
          <h3 className="lead">
            <Link to="/add-uom" className="pr-4">
              <i class="fa fa-plus-circle fa-lg " aria-hidden="true"></i>
            </Link>{" "}
            Unit of Measurements{" "}
          </h3>
          {filtered !== null
            ? filtered.map((uom) => (
                <div class="card promoting-card mb-3">
                  <div class="card-body d-flex flex-row">
                    <div>
                      <h4 class="card-title font-weight-bold mb-2">
                        {uom.name}
                      </h4>
                      <p class="card-text">{uom.size && uom.size}</p>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="collapse-content">
                      <Link to="#!" onClick={() => onDeleteHandler(uom._id)}>
                        <i
                          class="fa fa-trash fa-lg text-danger float-right p-1 my-1"
                          data-toggle="tooltip"
                          data-placement="top"
                        ></i>
                      </Link>

                      <Link
                        data-toggle="tooltip"
                        data-html="true"
                        to={`/edit-uom/${uom._id}`}
                        onClick={() => setCurrentUom(uom)}
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
            : uoms.map((uom) => (
                <div class="card promoting-card mb-3">
                  <div class="card-body d-flex flex-row">
                    <div>
                      <h4 class="card-title font-weight-bold mb-2">
                        {uom.name}
                      </h4>
                      <p class="card-text">{uom.size && uom.size}</p>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="collapse-content">
                      <Link to="#!" onClick={() => onDeleteHandler(uom._id)}>
                        <i
                          class="fa fa-trash fa-lg text-danger float-right p-1 my-1"
                          data-toggle="tooltip"
                          data-placement="top"
                        ></i>
                      </Link>

                      <Link
                        data-toggle="tooltip"
                        data-html="true"
                        to={`/edit-uom/${uom._id}`}
                        onClick={() => setCurrentUom(uom)}
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

Uoms.propTypes = {
  getUoms: PropTypes.func.isRequired,
  deleteUom: PropTypes.func.isRequired,
  setCurrentUom: PropTypes.func.isRequired,
  uoms: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  uoms: state.uom.uoms,
  uom: state.uom.uom,
  filtered: state.uom.filtered,
  loading: state.uom.loading,
});
export default connect(mapStateToProps, {
  getUoms,
  deleteUom,
  setCurrentUom,
})(Uoms);
