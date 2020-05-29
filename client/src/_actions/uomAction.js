import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current UOM
export const getUom = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/uom/${id}`);

    dispatch({
      type: types.GET_UOM,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: types.UOM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all UOMs
export const getUoms = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/uom");
    dispatch({
      type: types.GET_UOMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.UOM_ERROR,
      payload: { status: err.response },
    });
  }
};

// Add Uom
export const addUom = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/uom", formData);
    dispatch({
      type: types.ADD_UOM,
      payload: res.data,
    });

    dispatch(setAlert("UoM Added", "success"));

    history.push("/uoms");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.UOM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit Uom
export const editUom = (formData, id, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(`/api/uom/${id}`, formData, config);

    dispatch({
      type: types.GET_UOM,
      payload: res.data,
    });

    dispatch(setAlert("UoM Updated", "success"));

    history.push("/uoms");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.UOM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Uom
export const deleteUom = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/uom/${id}`);
      dispatch({
        type: types.DELETE_UOM,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: types.UOM_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current Uom
export const setCurrentUom = (uom) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_UOM,
    payload: uom,
  });
};

// Clear uom
export const clearUom = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_UOM });
};

//Filter uom
export const filterUom = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_UOM, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
