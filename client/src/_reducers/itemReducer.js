import * as types from "../_actions/types";

const initialState = {
  item: null,
  items: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ITEM:
      return {
        ...state,
        item: payload,
        loading: false,
      };
    case types.GET_ITEMS:
      return {
        ...state,
        items: payload.data.data,
        loading: false,
      };
    case types.ADD_ITEM:
      return {
        ...state,
        item: payload,
        loading: false,
      };
    case types.SET_CURRENT_ITEM:
      return {
        ...state,
        item: action.payload,
      };
    case types.CLEAR_ITEM:
      return {
        ...state,
        item: null,
        loading: false,
      };

    case types.FILTER_ITEM:
      return {
        ...state,
        filtered: state.items.filter((itm) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return itm.name.match(regex);
        }),
      };
    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
        loading: false,
      };
    case types.ITEM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
