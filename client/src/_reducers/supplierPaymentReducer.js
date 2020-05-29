import * as types from "../_actions/types";

const initialState = {
  supplierPayment: null,
  supplierPayments: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_SUPPLIER_PAYMENT:
      return {
        ...state,
        supplierPayment: payload,
        loading: false,
      };
    case types.GET_SUPPLIER_PAYMENTS:
      return {
        ...state,
        supplierPayments: payload.data.data,
        loading: false,
      };
    case types.ADD_SUPPLIER_PAYMENT:
      return {
        ...state,
        supplierPayment: payload,
        loading: false,
      };
    case types.SET_CURRENT_SUPPLIER_PAYMENT:
      return {
        ...state,
        supplierPayment: action.payload,
      };
    case types.CLEAR_SUPPLIER_PAYMENT:
      return {
        ...state,
        supplierPayment: null,
        supplierPayments: [],
        loading: false,
      };

    case types.FILTER_SUPPLIER_PAYMENT:
      return {
        ...state,
        filtered: state.supplierPayments.filter((supplierPayment) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            supplierPayment.customer.name.match(regex) ||
            supplierPayment.item.name.match(regex)
          );
        }),
      };

    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_SUPPLIER_PAYMENT:
      return {
        ...state,
        supplierPayments: state.supplierPayments.filter(
          (supplierPayment) => supplierPayment._id !== action.payload
        ),
        loading: false,
      };
    case types.SUPPLIER_PAYMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
