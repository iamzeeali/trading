import * as types from "../_actions/types";

const initialState = {
  customerEnquiry: null,
  customerEnquiries: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_CUSTOMER_ENQUIRY:
      return {
        ...state,
        customerEnquiry: payload.data.data,
        loading: false,
      };
    case types.GET_CUSTOMER_ENQUIRIES:
      return {
        ...state,
        customerEnquiries: payload.data.data,
        loading: false,
      };
    case types.ADD_CUSTOMER_ENQUIRY:
      return {
        ...state,
        customerEnquiry: payload,
        loading: false,
      };
    case types.SET_CURRENT_CUSTOMER_ENQUIRY:
      return {
        ...state,
        customerEnquiry: action.payload,
      };
    case types.CLEAR_CUSTOMER_ENQUIRY:
      return {
        ...state,
        customerEnquiry: null,
        customerEnquiries: [],
        loading: false,
      };

    case types.FILTER_CUSTOMER_ENQUIRY:
      return {
        ...state,
        filtered: state.customerEnquiries.filter((customerEnquiry) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            customerEnquiry.customer.name.match(regex) ||
            customerEnquiry.item.name.match(regex)
          );
        }),
      };

    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_CUSTOMER_ENQUIRY:
      return {
        ...state,
        customerEnquiries: state.customerEnquiries.filter(
          (customerEnquiry) => customerEnquiry._id !== action.payload
        ),
        loading: false,
      };
    case types.CUSTOMER_ENQUIRY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
