import {
  ITEM_OPTION_ADD_SUCCESS,
  ITEM_OPTION_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const addItemOption = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "itemOptionModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ITEM_OPTION_ADD_SUCCESS, payload: res.data });
    });
  };
};

export const getItemOption = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "itemOptionModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: ITEM_OPTION_GET_SUCCESS, payload: res.data });
    });
  };
};