import {
  STATISTICS_GET_SUCCESS,
  CLEAR_MESSAGE,
} from '../constants/ActionType';
import { API_BASE_URL } from 'constants/ApiConstant';
import axios from "axios";

export const getStatistics = (data) => {
  return dispatch => {
    dispatch({ type: CLEAR_MESSAGE });
    console.log(1111111111);
    axios
    .post(API_BASE_URL + "statisticsModule.php", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      dispatch({ type: STATISTICS_GET_SUCCESS, payload: res.data });
    });
  };
};