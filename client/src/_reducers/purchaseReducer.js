import * as types from "../_actions/types";

const initialState = {
  purchase: null,
  purchases: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_PURCHASE:
      return {
        ...state,
        purchase: payload.data.data,
        loading: false,
      };
    case types.GET_PURCHASES:
      return {
        ...state,
        purchases: payload.data.data,
        loading: false,
      };
    case types.ADD_PURCHASE:
      return {
        ...state,
        purchase: payload,
        loading: false,
      };
    case types.SET_CURRENT_PURCHASE:
      return {
        ...state,
        purchase: action.payload,
      };
    case types.CLEAR_PURCHASE:
      return {
        ...state,
        purchase: null,
        purchases: [],
        loading: false,
      };

    case types.FILTER_PURCHASE:
      return {
        ...state,
        filtered: state.purchases.filter((purchase) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            purchase.customer.name.match(regex) ||
            purchase.item.name.match(regex)
          );
        }),
      };

    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_PURCHASE:
      return {
        ...state,
        purchases: state.purchases.filter(
          (purchase) => purchase._id !== action.payload
        ),
        loading: false,
      };
    case types.PURCHASE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
