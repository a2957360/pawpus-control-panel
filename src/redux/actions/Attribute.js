import {
  ATTRIBUTE_ADD_SUCCESS,
  ATTRIBUTE_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const addAttribute = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "attributeModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ATTRIBUTE_ADD_SUCCESS, payload: res.data });
    });
  };
};

export const getAttribute = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "attributeModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ATTRIBUTE_GET_SUCCESS, payload: res.data });
    });
  };
};