import {
  SET_INFO,
  REMOVE_INFO,
  SET_ROLE,
  REMOVE_ROLE,
  SET_USER,
  REMOVE_USER,
} from "./types";

//Local Types
export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_FAILED = "AUTH_FAILED";

const setInfo = (res) => ({
  type: SET_INFO,
  payload: res,
});

const removeInfo = () => ({
  type: REMOVE_INFO,
});

const setRole = (res) => ({
  type: SET_ROLE,
  payload: res,
});

const removeRole = () => ({
  type: REMOVE_ROLE,
});

const setUser = (res) => ({
  type: SET_USER,
  payload: res,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export { setInfo, removeInfo, setRole, removeRole, setUser, removeUser };
