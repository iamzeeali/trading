import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current customer-enquiry
export const getCurrentCustomerEnquiry = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/customer-enquiry/${id}`);

    dispatch({
      type: types.GET_CUSTOMER_ENQUIRY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CUSTOMER_ENQUIRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all customer-enquirys
export const getCustomerEnquiries = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/customer-enquiry");
    dispatch({
      type: types.GET_CUSTOMER_ENQUIRIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.CUSTOMER_ENQUIRY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add customer-enquiry
export const addCustomerEnquiry = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/customer-enquiry", formData);
    dispatch({
      type: types.ADD_CUSTOMER_ENQUIRY,
      payload: res.data,
    });

    dispatch(setAlert("customer-enquiry Added", "success"));

    history.push("/customer-enquiry");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CUSTOMER_ENQUIRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit CustomerEnquiry
export const editCustomerEnquiry = (formData, history, id) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(
      `/api/customer-enquiry/${id}`,
      formData,
      config
    );

    dispatch({
      type: types.GET_CUSTOMER_ENQUIRY,
      payload: res.data,
    });

    dispatch(setAlert("customer-enquiry Updated", "success"));

    history.push("/customer-enquiry");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.CUSTOMER_ENQUIRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete customer-enquiry
export const deleteCustomerEnquiry = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/customer-enquiry/${id}`);
      dispatch({
        type: types.DELETE_CUSTOMER_ENQUIRY,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: types.CUSTOMER_ENQUIRY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current customer-enquiry
export const setCurrentCustomerEnquiry = (customerEnquiry) => async (
  dispatch
) => {
  dispatch({
    type: types.SET_CURRENT_CUSTOMER_ENQUIRY,
    payload: customerEnquiry,
  });
};

// Clear customer-enquiry
export const clearCustomerEnquiry = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_CUSTOMER_ENQUIRY });
};

//Filter customer-enquiry
export const filterCustomerEnquiry = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_CUSTOMER_ENQUIRY, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
