import {
  SPOT_ADD_SUCCESS,
  SPOT_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const addSpot = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "spotModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SPOT_ADD_SUCCESS, payload: res.data });
    });
  };
};

export const getSpot = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "spotModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SPOT_GET_SUCCESS, payload: res.data });
    });
  };
};