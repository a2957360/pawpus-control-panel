import {
  SERVICE_ORDER_GET_SUCCESS,
  SERVICE_ORDER_CHANGE_SUCCESS,
  SERVICE_ORDER_SINGLE_GET_SUCCESS,
  SERVICE_ORDER_STATISTIC_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const changeServiceOrder = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "serviceOrderModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SERVICE_ORDER_CHANGE_SUCCESS, payload: res.data });
    });
  };
};

export const getServiceOrder = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "serviceOrderModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SERVICE_ORDER_GET_SUCCESS, payload: res.data });
    });
  };
};

export const getSingleServiceOrder = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "serviceOrderModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SERVICE_ORDER_SINGLE_GET_SUCCESS, payload: res.data });
    });
  };
};

export const getServiceOrderStatistic = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "serviceOrderModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SERVICE_ORDER_STATISTIC_GET_SUCCESS, payload: res.data });
    });
  };
};