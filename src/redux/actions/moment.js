import {
  MOMENT_ADD_SUCCESS,
  MOMENT_GET_SUCCESS,
  MOMENT_REPORT_GET_SUCCESS,
  MOMENT_SINGLE_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const addMoment = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "momentModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: MOMENT_ADD_SUCCESS, payload: res.data });
    });
  };
};

export const getMoment = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "momentModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: MOMENT_GET_SUCCESS, payload: res.data });
    });
  };
};

export const getMomentReport = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "momentModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: MOMENT_REPORT_GET_SUCCESS, payload: res.data });
    });
  };
};

export const getSingleMoment = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "momentModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: MOMENT_SINGLE_GET_SUCCESS, payload: res.data });
    });
  };
};