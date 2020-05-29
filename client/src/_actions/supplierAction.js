import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current Supplier
export const getCurrentSupplier = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/supplier/${id}`);

    dispatch({
      type: types.GET_SUPPLIER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.SUPPLIER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all suppliers
export const getSuppliers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/supplier");
    dispatch({
      type: types.GET_SUPPLIERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.SUPPLIER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get total payable
export const getTotalPayable = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/supplier/totalPayable");
    dispatch({
      type: types.TOTAL_PAYABLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.SUPPLIER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add supplier
export const addSupplier = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/supplier", formData);
    dispatch({
      type: types.ADD_SUPPLIER,
      payload: res.data,
    });

    dispatch(setAlert("Supplier Added", "success"));

    history.push("/suppliers");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.SUPPLIER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit Supplier
export const editSupplier = (formData, history, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(`/api/supplier/${id}`, formData, config);

    dispatch({
      type: types.GET_SUPPLIER,
      payload: res.data,
    });

    dispatch(setAlert("Supplier Updated", "success"));

    history.push("/suppliers");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.SUPPLIER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// update payable
export const updatePayable = (updatedPayable, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const formData = {
      payable: updatedPayable,
    };
    const res = await axios.patch(
      `/api/supplier/updatePayable/${id}`,
      formData,
      config
    );

    dispatch({
      type: types.GET_SUPPLIER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.SUPPLIER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Supplier
export const deleteSupplier = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/supplier/${id}`);
      dispatch({
        type: types.DELETE_SUPPLIER,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: types.SUPPLIER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current Supplier
export const setCurrentSupplier = (supplier) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_SUPPLIER,
    payload: supplier,
  });
};

// Clear Supplier
export const clearSupplier = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_SUPPLIER });
};

//Filter Supplier
export const filterSupplier = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_SUPPLIER, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
