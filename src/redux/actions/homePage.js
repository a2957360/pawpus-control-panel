import {
  HOMEPAGE_ADMIN_ADD_SUCCESS,
  HOMEPAGE_ADMIN_GET_SUCCESS,
  HOMEPAGE_ADMIN_SINGLE_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const addHomePage = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "pageLayoutModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: HOMEPAGE_ADMIN_ADD_SUCCESS, payload: res.data });
    });
  };
};

export const getHomePage = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "pageLayoutModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: HOMEPAGE_ADMIN_GET_SUCCESS, payload: res.data });
    });
  };
};

export const getSingleHomePage = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "pageLayoutModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: HOMEPAGE_ADMIN_SINGLE_GET_SUCCESS, payload: res.data });
    });
  };
};