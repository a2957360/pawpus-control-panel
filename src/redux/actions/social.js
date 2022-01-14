import {
  SOCIAL_ADMIN_ADD_SUCCESS,
  SOCIAL_ADMIN_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const addSocial = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "socialModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SOCIAL_ADMIN_ADD_SUCCESS, payload: res.data });
    });
  };
};

export const getSocial = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "socialModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: SOCIAL_ADMIN_GET_SUCCESS, payload: res.data });
    });
  };
};