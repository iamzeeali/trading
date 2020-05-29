import * as types from "../_actions/types";

const initialState = {
  customerPayment: null,
  customerPayments: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_CUSTOMER_PAYMENT:
      return {
        ...state,
        customerPayment: payload,
        loading: false,
      };
    case types.GET_CUSTOMER_PAYMENTS:
      return {
        ...state,
        customerPayments: payload.data.data,
        loading: false,
      };
    case types.ADD_CUSTOMER_PAYMENT:
      return {
        ...state,
        customerPayment: payload,
        loading: false,
      };
    case types.SET_CURRENT_CUSTOMER_PAYMENT:
      return {
        ...state,
        customerPayment: action.payload,
      };
    case types.CLEAR_CUSTOMER_PAYMENT:
      return {
        ...state,
        customerPayment: null,
        customerPayments: [],
        loading: false,
      };

    case types.FILTER_CUSTOMER_PAYMENT:
      return {
        ...state,
        filtered: state.customerPayments.filter((customerPayment) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            customerPayment.customer.name.match(regex) ||
            customerPayment.item.name.match(regex)
          );
        }),
      };

    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_CUSTOMER_PAYMENT:
      return {
        ...state,
        customerPayments: state.customerPayments.filter(
          (customerPayment) => customerPayment._id !== action.payload
        ),
        loading: false,
      };
    case types.CUSTOMER_PAYMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
