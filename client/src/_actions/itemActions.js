import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current Item
export const getCurrentItem = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/item/${id}`);

    dispatch({
      type: types.GET_ITEM,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: types.ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all Items
export const getItems = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/item");
    console.log(res.data);
    dispatch({
      type: types.GET_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.ITEM_ERROR,
      payload: { status: err.response },
    });
  }
};

// Add Item
export const addItem = (formData, history) => async (dispatch) => {
  console.log(formData);
  try {
    const res = await axios.post("/api/item", formData);
    dispatch({
      type: types.ADD_ITEM,
      payload: res.data,
    });

    dispatch(setAlert("Item Added", "success"));

    history.push("/items");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit Item
export const editItem = (formData, history, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.patch(`/api/item/${id}`, formData, config);

    dispatch({
      type: types.GET_ITEM,
      payload: res.data,
    });

    dispatch(setAlert("Item Updated", "success"));

    history.push("/items");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// update Item qty
export const updateItemQty = (updatedQty, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const formData = {
      quantity: updatedQty,
    };
    const res = await axios.patch(
      `/api/item/updateItemQty/${id}`,
      formData,
      config
    );

    dispatch({
      type: types.GET_ITEM,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: types.ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Item
export const deleteItem = (id) => async (dispatch) => {
  if (window.confirm("Are you sure?")) {
    try {
      await axios.delete(`/api/item/${id}`);
      dispatch({
        type: types.DELETE_ITEM,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: types.ITEM_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Set Current Item
export const setCurrentItem = (item) => async (dispatch) => {
  dispatch({
    type: types.SET_CURRENT_ITEM,
    payload: item,
  });
};

// Clear Item
export const clearItem = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ITEM });
};

//Filter Item
export const filterItem = (text) => async (dispatch) => {
  dispatch({ type: types.FILTER_ITEM, payload: text });
};

// Clear Filter
export const clearFilter = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILTER });
};
