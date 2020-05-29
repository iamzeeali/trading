import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current supplier-payment
export const getCurrentSupplierPayment = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/supplier-payment/${id}`);

    dispatch({
      type: types.GET_SUPPLIER_PAYMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.SUPPLIER_PAYMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all supplier-payments
export const getSupplierPayments = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/supplier-payment");
    dispatch({
      type: types.GET_SUPPLIER_PAYMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.SUPPLIER_PAYMENT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add supplier-payment
export const addSupplierPayment = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/supplier-payment", formData);
    dispatch({
      type: types.ADD_SUPPLIER_PAYMENT,
      payload: res.data,
    });

    dispatch(setAlert("Supplier Payment Added", "success"));

    history.push("/supplier-payment");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.SUPPLIER_PAYMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit SupplierPayment
export const editSupplierPayment = (formData, history, id) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(
      `/api/supplier-payment/${id}`,
      formData,
      config
    );

    dispatch({
      type: types.GET_SUPPLIER_PAYMENT,
      payload: res.data,
    });

    dispatch(setAlert("Supplier Payment Updated", "success"));

    history.push("/supplier-payment");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.SUPPLIER_PAYMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete supplier-payment
export const deleteSupplierPayment = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/supplier-payment/${id}`);
      dispatch({
        type: types.DELETE_SUPPLIER_PAYMENT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: types.SUPPLIER_PAYMENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current supplier-payment
export const setCurrentSupplierPayment = (SupplierPayment) => async (
  dispatch
) => {
  dispatch({
    type: types.SET_CURRENT_SUPPLIER_PAYMENT,
    payload: SupplierPayment,
  });
};

// Clear supplier-payment
export const clearSupplierPayment = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_SUPPLIER_PAYMENT });
};

//Filter supplier-payment
export const filterSupplierPayment = (text) => async (dispatch) => {
  dispatch({
    type: types.FILTER_SUPPLIER_PAYMENT,
    payload: text,
  });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
