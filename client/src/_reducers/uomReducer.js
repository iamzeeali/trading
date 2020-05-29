import * as types from "../_actions/types";

const initialState = {
  uom: null,
  uoms: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_UOM:
      return {
        ...state,
        uom: payload,
        loading: false,
      };
    case types.GET_UOMS:
      return {
        ...state,
        uoms: payload.data.data,
        loading: false,
      };
    case types.ADD_UOM:
      return {
        ...state,
        uom: payload,
        loading: false,
      };
    case types.SET_CURRENT_UOM:
      return {
        ...state,
        uom: action.payload,
      };
    case types.CLEAR_UOM:
      return {
        ...state,
        uom: null,
        loading: false,
      };

    // case types.FILTER_ACTIVITY:
    //   return {
    //     ...state,
    //     filtered: state.activities.filter(activity => {
    //       const regex = new RegExp(`${action.payload}`, "gi");
    //       return (
    //         staff.firstName.match(regex) ||
    //         staff.lastName.match(regex) ||
    //         staff.email.match(regex) ||
    //         staff.mobile.match(regex) ||
    //         staff.username.match(regex)
    //       );
    //     })
    //   };
    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_UOM:
      return {
        ...state,
        uoms: state.uoms.filter((um) => um._id !== action.payload),
        loading: false,
      };
    case types.UOM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
