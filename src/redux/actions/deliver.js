import {
  DELIVER_ADD_SUCCESS,
  DELIVER_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const addDeliver = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "deliverModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: DELIVER_ADD_SUCCESS, payload: res.data });
    });
  };
};

export const getDeliver = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "deliverModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: DELIVER_GET_SUCCESS, payload: res.data });
    });
  };
};