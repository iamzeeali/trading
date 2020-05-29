import * as types from "../_actions/types";

const initialState = {
  supplier: null,
  suppliers: [],
  payable: null,
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_SUPPLIER:
      return {
        ...state,
        supplier: payload,
        loading: false,
      };
    case types.GET_SUPPLIERS:
      return {
        ...state,
        suppliers: payload.data.data,
        loading: false,
      };
    case types.TOTAL_PAYABLE:
      return {
        ...state,
        payable: payload.data.data,
        loading: false,
      };
    case types.ADD_SUPPLIER:
      return {
        ...state,
        supplier: payload,
        loading: false,
      };
    case types.SET_CURRENT_SUPPLIER:
      return {
        ...state,
        supplier: action.payload,
      };
    case types.CLEAR_SUPPLIER:
      return {
        ...state,
        supplier: null,
        suppliers: [],
        loading: false,
      };

    case types.FILTER_SUPPLIER:
      return {
        ...state,
        filtered: state.suppliers.filter((supplier) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            supplier.name.match(regex) ||
            supplier.state.match(regex) ||
            supplier.city.match(regex) ||
            supplier.address.match(regex) ||
            supplier.bank.match(regex) ||
            supplier.contactPerson.match(regex)
          );
        }),
      };

    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_SUPPLIER:
      return {
        ...state,
        suppliers: state.suppliers.filter(
          (supplier) => supplier._id !== action.payload
        ),
        loading: false,
      };
    case types.SUPPLIER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
