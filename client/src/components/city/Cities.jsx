import React, { useEffect } from "react";
import {
  getCities,
  deleteCity,
  setCurrentCity,
} from "../../_actions/cityAction";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../ui/Spinner";

const Cities = ({
  getCities,
  deleteCity,
  setCurrentCity,
  cities,
  filtered,
  loading,
}) => {
  useEffect(() => {
    getCities();
    //eslint-diable-next-line
  }, []);

  const onDeleteHandler = (id) => {
    deleteCity(id);
  };

  return (
    <React.Fragment>
      {cities !== null && !loading ? (
        <div>
          <h3 className="lead">
            {" "}
            <Link to="/add-city" className="pr-4">
              <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>
            </Link>{" "}
            Cities
          </h3>
          {filtered !== null
            ? filtered.map((city) => (
                <div class="card promoting-card mb-3">
                  <div class="card-body d-flex flex-row">
                    <div>
                      <h4 class="card-title font-weight-bold mb-2">
                        {city.name}
                      </h4>
                      <p class="card-text">{city.state}</p>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="collapse-content">
                      <Link to="#!" onClick={() => onDeleteHandler(city._id)}>
                        <i
                          class="fa fa-trash fa-lg text-danger float-right p-1 my-1"
                          data-toggle="tooltip"
                          data-placement="top"
                        ></i>
                      </Link>

                      <Link
                        data-toggle="tooltip"
                        data-html="true"
                        to={`/edit-city/${city._id}`}
                        onClick={() => setCurrentCity(city)}
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
            : cities.map((city) => (
                <div class="card promoting-card mb-3">
                  <div class="card-body d-flex flex-row">
                    <div>
                      <h4 class="card-title font-weight-bold mb-2">
                        {city.name}
                      </h4>
                      <p class="card-text">{city.state}</p>
                    </div>
                  </div>

                  <div class="card-body">
                    <div class="collapse-content">
                      <Link to="#!" onClick={() => onDeleteHandler(city._id)}>
                        <i
                          class="fa fa-trash fa-lg text-danger float-right p-1 my-1"
                          data-toggle="tooltip"
                          data-placement="top"
                        ></i>
                      </Link>

                      <Link
                        data-toggle="tooltip"
                        data-html="true"
                        to={`/edit-city/${city._id}`}
                        onClick={() => setCurrentCity(city)}
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

Cities.propTypes = {
  getCities: PropTypes.func.isRequired,
  deleteCity: PropTypes.func.isRequired,
  setCurrentCity: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  cities: state.city.cities,
  city: state.city.city,
  filtered: state.city.filtered,
  loading: state.city.loading,
});
export default connect(mapStateToProps, {
  getCities,
  deleteCity,
  setCurrentCity,
})(Cities);
