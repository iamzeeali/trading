import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current customer-payment
export const getCurrentCustomerPayment = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/customer-payment/${id}`);

    dispatch({
      type: types.GET_CUSTOMER_PAYMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CUSTOMER_PAYMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all customer-payments
export const getCustomerPayments = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/customer-payment");
    dispatch({
      type: types.GET_CUSTOMER_PAYMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CUSTOMER_PAYMENT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add customer-payment
export const addCustomerPayment = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/customer-payment", formData);
    dispatch({
      type: types.ADD_CUSTOMER_PAYMENT,
      payload: res.data,
    });

    dispatch(setAlert("customer-payment Added", "success"));

    history.push("/customer-payment");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CUSTOMER_PAYMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit CustomerPayment
export const editCustomerPayment = (formData, history, id) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(
      `/api/customer-payment/${id}`,
      formData,
      config
    );

    dispatch({
      type: types.GET_CUSTOMER_PAYMENT,
      payload: res.data,
    });

    dispatch(setAlert("customer-payment Updated", "success"));

    history.push("/customer-payment");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CUSTOMER_PAYMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete customer-payment
export const deleteCustomerPayment = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/customer-payment/${id}`);
      dispatch({
        type: types.DELETE_CUSTOMER_PAYMENT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: types.CUSTOMER_PAYMENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current customer-payment
export const setCurrentCustomerPayment = (CustomerPayment) => async (
  dispatch
) => {
  dispatch({
    type: types.SET_CURRENT_CUSTOMER_PAYMENT,
    payload: CustomerPayment,
  });
};

// Clear customer-payment
export const clearCustomerPayment = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_CUSTOMER_PAYMENT });
};

//Filter customer-payment
export const filterCustomerPayment = (text) => async (dispatch) => {
  dispatch({
    type: types.FILTER_CUSTOMER_PAYMENT,
    payload: text,
  });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
