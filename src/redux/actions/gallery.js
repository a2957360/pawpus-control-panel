import {
  GALLERY_ADMIN_ADD_SUCCESS,
  GALLERY_ADMIN_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const addGallery = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "galleryModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GALLERY_ADMIN_ADD_SUCCESS, payload: res.data });
    });
  };
};

export const getGallery = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    axios
    .post(API_BASE_URL + "galleryModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: GALLERY_ADMIN_GET_SUCCESS, payload: res.data });
    });
  };
};