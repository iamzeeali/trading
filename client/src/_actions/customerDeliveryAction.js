import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current customer-delivery
export const getCurrentCustomerDelivery = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/customer-delivery/${id}`);

    dispatch({
      type: types.GET_CUSTOMER_DELIVERY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CUSTOMER_DELIVERY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all customer-deliverys
export const getCustomerDeliveries = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/customer-delivery");
    dispatch({
      type: types.GET_CUSTOMER_DELIVERIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CUSTOMER_DELIVERY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add customer-delivery
export const addCustomerDelivery = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/customer-delivery", formData);
    dispatch({
      type: types.ADD_CUSTOMER_DELIVERY,
      payload: res.data,
    });

    dispatch(setAlert("customer-delivery Added", "success"));

    history.push("/customer-delivery");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CUSTOMER_DELIVERY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit CustomerDelivery
export const editCustomerDelivery = (formData, history, id) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(
      `/api/customer-delivery/${id}`,
      formData,
      config
    );

    dispatch({
      type: types.GET_CUSTOMER_DELIVERY,
      payload: res.data,
    });

    dispatch(setAlert("customer-delivery Updated", "success"));

    history.push("/customer-delivery");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CUSTOMER_DELIVERY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete customer-delivery
export const deleteCustomerDelivery = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/customer-delivery/${id}`);
      dispatch({
        type: types.DELETE_CUSTOMER_DELIVERY,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: types.CUSTOMER_DELIVERY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current customer-delivery
export const setCurrentCustomerDelivery = (CustomerDelivery) => async (
  dispatch
) => {
  dispatch({
    type: types.SET_CURRENT_CUSTOMER_DELIVERY,
    payload: CustomerDelivery,
  });
};

// Clear customer-delivery
export const clearCustomerDelivery = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_CUSTOMER_DELIVERY });
};

//Filter customer-delivery
export const filterCustomerDelivery = (text) => async (dispatch) => {
  dispatch({
    type: types.FILTER_CUSTOMER_DELIVERY,
    payload: text,
  });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
