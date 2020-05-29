import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current purchase
export const getCurrentPurchase = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/purchase/${id}`);

    dispatch({
      type: types.GET_PURCHASE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.PURCHASE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all purchases
export const getPurchases = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/purchase");
    dispatch({
      type: types.GET_PURCHASES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.PURCHASE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add purchase
export const addPurchase = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/purchase", formData);
    dispatch({
      type: types.ADD_PURCHASE,
      payload: res.data,
    });

    dispatch(setAlert("Purchase Added", "success"));

    history.push("/purchase");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.PURCHASE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit Purchase
export const editPurchase = (formData, history, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(`/api/purchase/${id}`, formData, config);

    dispatch({
      type: types.GET_PURCHASE,
      payload: res.data,
    });

    dispatch(setAlert("Purchase Updated", "success"));

    history.push("/purchase");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.PURCHASE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete purchase
export const deletePurchase = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/purchase/${id}`);
      dispatch({
        type: types.DELETE_PURCHASE,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: types.PURCHASE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current purchase
export const setCurrentPurchase = (purchase) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_PURCHASE,
    payload: purchase,
  });
};

// Clear purchase
export const clearPurchase = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_PURCHASE });
};

//Filter purchase
export const filterPurchase = (text) => async (dispatch) => {
  dispatch({
    type: types.FILTER_PURCHASE,
    payload: text,
  });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
