import {
  MEDIA_ADD_SUCCESS,
  MEDIA_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const addMedia = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "imageModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: MEDIA_ADD_SUCCESS, payload: res.data });
    });
  };
};

export const getMedia = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "imageModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      console.log("into then");
      dispatch({ type: MEDIA_GET_SUCCESS, payload: res.data });
    });
  };
};