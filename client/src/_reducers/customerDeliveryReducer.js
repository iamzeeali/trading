import * as types from "../_actions/types";

const initialState = {
  customerDelivery: null,
  customerDeliveries: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_CUSTOMER_DELIVERY:
      return {
        ...state,
        customerDelivery: payload.data.data,
        loading: false,
      };
    case types.GET_CUSTOMER_DELIVERIES:
      return {
        ...state,
        customerDeliveries: payload.data.data,
        loading: false,
      };
    case types.ADD_CUSTOMER_DELIVERY:
      return {
        ...state,
        customerDelivery: payload,
        loading: false,
      };
    case types.SET_CURRENT_CUSTOMER_DELIVERY:
      return {
        ...state,
        customerDelivery: action.payload,
      };
    case types.CLEAR_CUSTOMER_DELIVERY:
      return {
        ...state,
        customerDelivery: null,
        customerDeliveries: [],
        loading: false,
      };

    case types.FILTER_CUSTOMER_DELIVERY:
      return {
        ...state,
        filtered: state.customerDeliveries.filter((customerDelivery) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            customerDelivery.customer.name.match(regex) ||
            customerDelivery.item.name.match(regex)
          );
        }),
      };

    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_CUSTOMER_DELIVERY:
      return {
        ...state,
        customerDeliveries: state.customerDeliveries.filter(
          (customerDelivery) => customerDelivery._id !== action.payload
        ),
        loading: false,
      };
    case types.CUSTOMER_DELIVERY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
