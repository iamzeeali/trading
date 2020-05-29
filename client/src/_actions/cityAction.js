import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current City
export const getCurrentCity = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/city/${id}`);

    dispatch({
      type: types.GET_CITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all cities
export const getCities = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/city");
    dispatch({
      type: types.GET_CITIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CITY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add City
export const addCity = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/city", formData);
    dispatch({
      type: types.ADD_CITY,
      payload: res.data,
    });

    dispatch(setAlert("City Added", "success"));

    history.push("/cities");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit Supplie
export const editCity = (formData, history, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(`/api/city/${id}`, formData, config);

    dispatch({
      type: types.GET_CITY,
      payload: res.data,
    });

    dispatch(setAlert("City Updated", "success"));

    history.push("/cities");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete City
export const deleteCity = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/city/${id}`);
      dispatch({
        type: types.DELETE_CITY,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: types.CITY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current City
export const setCurrentCity = (city) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_CITY,
    payload: city,
  });
};

// Clear City
export const clearCity = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_CITY });
};

//Filter City
export const filterCity = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_CITY, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};

//  Populate cities
export const populateCities = (state) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/city?state=${state}`);
    dispatch({
      type: types.POPULATE_CITIES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: types.CITY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
