import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current customer
export const getCurrentCustomer = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/customer/${id}`);

    dispatch({
      type: types.GET_CUSTOMER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all Customers
export const getCustomers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/customer");
    console.log(res);
    dispatch({
      type: types.GET_CUSTOMERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CUSTOMER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

//Get total receivable
export const getTotalReceivable = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/customer/totalReceivable");
    dispatch({
      type: types.TOTAL_RECEIVABLE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CUSTOMER_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add Customer
export const addCustomer = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/customer", formData);
    dispatch({
      type: types.ADD_CUSTOMER,
      payload: res.data,
    });

    dispatch(setAlert("Customer Added", "success"));

    history.push("/customers");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit Customer
export const editCustomer = (formData, history, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(`/api/customer/${id}`, formData, config);
    console.log(res.data);

    dispatch({
      type: types.GET_CUSTOMER,
      payload: res.data,
    });

    dispatch(setAlert("Customer Updated", "success"));

    history.push("/customers");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// update receivable
export const updateReceivable = (updatedReceivable, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const formData = {
      receivable: updatedReceivable,
    };
    const res = await axios.patch(
      `/api/customer/updateReceivable/${id}`,
      formData,
      config
    );

    dispatch({
      type: types.GET_CUSTOMER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Customer
export const deleteCustomer = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/customer/${id}`);
      dispatch({
        type: types.DELETE_CUSTOMER,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: types.CUSTOMER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current Customer
export const setCurrentCustomer = (customer) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_CUSTOMER,
    payload: customer,
  });
};

// Clear Customer
export const clearCustomer = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_CUSTOMER });
};

//Filter Customer
export const filterCustomer = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_CUSTOMER, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
