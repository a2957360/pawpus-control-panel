import {
  SERVER_VALID_GET_SUCCESS,
  SERVER_WAIT_GET_SUCCESS,
  SERVER_SINGLE_GET_SUCCESS,
  SERVER_ADD_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const addServer = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "serverModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SERVER_ADD_SUCCESS, payload: res.data });
    });
  };
};

export const getValidServer = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "serverModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SERVER_VALID_GET_SUCCESS, payload: res.data });
    });
  };
};

export const getWaitServer = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "serverModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SERVER_WAIT_GET_SUCCESS, payload: res.data });
    });
  };
};

export const getSingleServer = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "serverModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SERVER_SINGLE_GET_SUCCESS, payload: res.data });
    });
  };
};