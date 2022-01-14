import {
  SERVICE_ADD_SUCCESS,
  SERVICE_GET_SUCCESS,
  SERVICE_SINGLE_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const addService = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "serviceModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SERVICE_ADD_SUCCESS, payload: res.data });
    });
  };
};

export const getService = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "serviceModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SERVICE_GET_SUCCESS, payload: res.data });
    });
  };
};

export const getSingleService = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "serviceModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SERVICE_SINGLE_GET_SUCCESS, payload: res.data });
    });
  };
};