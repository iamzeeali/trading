import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_USERS,
} from "../_actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  role: null,
  loading: true,
  user: {},
  company: {},
  users: [],
  username: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.data,
        username: payload.data.name,
        company: payload.data.company,
        role: payload.data.role,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: {},
        username: null,
        company: {},
        role: null,
      };
    default:
      return state;
  }
}
