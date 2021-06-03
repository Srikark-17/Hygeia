import { AUTH_LOADING, AUTH_FAILED } from "../actions/auth";
import {
  SET_INFO,
  REMOVE_INFO,
  SET_ROLE,
  REMOVE_ROLE,
  SET_USER,
  REMOVE_USER,
  SET_DOCTOR,
  REMOVE_DOCTOR,
} from "../actions/types";

const initialState = {
  isLoggedIn: false,
  token: "",
  basicInfo: false,
  message: "",
  response: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  errMsg: null,
  reduxUser: "",
  userRole: "No Role",
  doctor: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
        errMsg: null,
      };
    case AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        errMsg: action.payload,
      };
    case SET_INFO:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
        basicInfo: action.payload,
      };
    case REMOVE_INFO:
      return {
        ...state,
        token: "",
        basicInfo: false,
        isLoggedIn: false,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
    case SET_ROLE:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
        userRole: action.payload,
      };
    case REMOVE_ROLE:
      return {
        ...state,
        token: "",
        isLoggedIn: false,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
        userRole: "No Role",
      };
    case SET_USER:
      return {
        ...state,
        reduxUser: action.payload,
      };
    case REMOVE_USER:
      return {
        ...state,
        reduxUser: "",
      };
    case SET_DOCTOR:
      return {
        ...state,
        doctor: action.payload,
      };
    case REMOVE_DOCTOR:
      return {
        ...state,
        doctor: false,
      };
    default:
      return state;
  }
};
