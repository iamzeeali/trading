import * as types from "../_actions/types";

const initialState = {
  city: null,
  cities: [],
  error: {},
  filtered: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_CITY:
      return {
        ...state,
        city: payload,
        loading: false,
      };
    case types.GET_CITIES:
      return {
        ...state,
        cities: payload.data.data,
        loading: false,
      };
    case types.POPULATE_CITIES:
      return {
        ...state,
        cities: payload.data.data,
        loading: false,
      };
    case types.ADD_CITY:
      return {
        ...state,
        city: payload,
        loading: false,
      };
    case types.SET_CURRENT_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case types.CLEAR_CITY:
      return {
        ...state,
        city: null,
        cities: [],
        loading: false,
      };

    case types.FILTER_CITY:
      return {
        ...state,
        filtered: state.cities.filter((city) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return city.name.match(regex) || city.state.match(regex);
        }),
      };

    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case types.DELETE_CITY:
      return {
        ...state,
        cities: state.cities.filter((city) => city._id !== action.payload),
        loading: false,
      };
    case types.CITY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
