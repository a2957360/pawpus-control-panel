import {
  STORE_ADD_SUCCESS,
  STORE_GET_SUCCESS,
  STORE_LOGIN_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const addStore = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "adminLogin.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: STORE_ADD_SUCCESS, payload: res.data });
    });
  };
};

export const getStore = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "storeAdmin.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: STORE_GET_SUCCESS, payload: res.data });
    });
  };
};

export const loginStore = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "adminLogin.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: STORE_LOGIN_SUCCESS, payload: res.data });
    });
  };
};

export const clearStore = () => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
  };
};