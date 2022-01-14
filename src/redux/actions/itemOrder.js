import {
  ITEM_ORDER_GET_SUCCESS,
  ITEM_ORDER_CHANGE_SUCCESS,
  ITEM_ORDER_SINGLE_GET_SUCCESS,
  ITEM_ORDER_STATISTIC_GET_SUCCESS,
  ITEM_ORDER_SUMMARY_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const changeItemOrder = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "itemOrderModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ITEM_ORDER_CHANGE_SUCCESS, payload: res.data });
    });
  };
};

export const getItemOrder = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "itemOrderModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ITEM_ORDER_GET_SUCCESS, payload: res.data });
    });
  };
};

export const getSingleItemOrder = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "itemOrderModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ITEM_ORDER_SINGLE_GET_SUCCESS, payload: res.data });
    });
  };
};

export const getStatistic = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "itemOrderModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ITEM_ORDER_STATISTIC_GET_SUCCESS, payload: res.data });
    });
  };
};

export const getSummary = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "itemOrderModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ITEM_ORDER_SUMMARY_GET_SUCCESS, payload: res.data });
    });
  };
};